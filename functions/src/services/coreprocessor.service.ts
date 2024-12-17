import * as admin from 'firebase-admin';
import sgMail from '@sendgrid/mail';
import { EmailAttachment, EmailMessage, ParsedEmailValue } from '../types/email';
import { logger } from 'firebase-functions';

export const DEFAULT_RECIPIENT = 'daniel@astrocoder.me';
require("dotenv").config();
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;


const db = admin.firestore();

export class EmailService {

    static async processAttachments (attachments: any[]): Promise<EmailAttachment[]> {
        return attachments.map(file => ({
            content: file.content.toString('base64'),
            filename: file.filename,
            type: file.type,
            disposition: file.contentDisposition,
            content_id: file.contentId,
        }));
    }

    static async getEmailMapping (address: string) {
        const emailMap = await db
            .collection('aliases')
            .where('alias', '==', address)
            .get();

        if (emailMap.empty) {
            logger.info(`No email mapping found for address: ${address}`);
            return null;
        }

        return emailMap.docs[0].data();
    }

    static async isBlacklisted (email: string): Promise<boolean> {
        const blacklist = await db
            .collection('email-blacklists')
            .where('name', '==', email)
            .get();

        return !blacklist.empty;
    }

    static async logEmailUsage (subject: string, from: string, hasAttachments: boolean, isBlacklisted: boolean) {
        const collection = isBlacklisted ? 'blacklist-email-usage' : 'email-usage';
        await db.collection(collection).add({
            date: new Date(),
            subject,
            hasAttachment: hasAttachments,
            from,
        });
    }

    static async sendEmail (message: EmailMessage): Promise<void> {
        logger.info(`Sending email with API Key ${SENDGRID_API_KEY}`)
        sgMail.setApiKey(SENDGRID_API_KEY ?? '');

        try {
            await sgMail.send(message);
            await this.logEmailUsage(
                message.subject,
                message.from,
                !!message.attachments?.length,
                false
            );

            // todo: Keep track of email if alias is not strict
        } catch (error) {
            throw error;
        }
    }

    static createEmailMessage (parsedEmail: any, toEmail: any[], fromEmail: string): EmailMessage {
        return {
            to: toEmail,
            from: fromEmail,
            subject: parsedEmail.subject,
            text: parsedEmail.text,
            html: parsedEmail.html,
        };
    }
}
