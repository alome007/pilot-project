import * as admin from 'firebase-admin';
import { HttpsError } from 'firebase-functions/v2/https';
const { Firestore } = require("firebase-admin/firestore");

import { Request, Response } from 'express';
import { sendUpgradeEmail, sendDowngradeEmail } from '../services/emailtemplates.service';
import { DEFAULT_RECIPIENT, EmailService } from '../services/coreprocessor.service';
import { logger } from 'firebase-functions/v1';

interface LemonSqueezyWebhook {
  meta: {
    event_name: string;
    custom_data: {
      userId: string;
    };
  };
  data: {
    attributes: {
      status: string;
      urls: {
        update_payment_method: string;
      };
      product_name: string;
      variant_name: string;
      ends_at: string | null;
    };
  };
}

export async function handleLemonSqueezyWebhook (req: Request, res: Response) {
  try {
    const event = req.body as LemonSqueezyWebhook;
    const { event_name } = event.meta;
    const { userId } = event.meta.custom_data;
    const { status, product_name, variant_name, ends_at } = event.data.attributes;
    const user = await admin.auth().getUser(userId);

    const userRef = admin.firestore().collection('users').doc(userId);

    switch (event_name) {
      case 'subscription_created':
      case 'subscription_updated': {
        const planData = {
          planId: variant_name.toLowerCase(),
          planName: product_name,
          subscriptionStatus: status,
          nextBillingDate: ends_at,
          updatedAt: Firestore.FieldValue.serverTimestamp()
        };

        await userRef.update(planData);
        // await sendUpgradeEmail(user.email!, {
        //   ...planData,
        //   features: ['Feature 1', 'Feature 2'] // Add actual features based on plan
        // });
        break;
      }

      case 'subscription_cancelled': {
        await userRef.update({
          subscriptionStatus: 'cancelled',
          cancellationDate: ends_at,
          updatedAt: Firestore.FieldValue.serverTimestamp()
        });
        await sendDowngradeEmail(user.email!);
        break;
      }

      case 'subscription_expired':
        await userRef.update({
          planId: 'free',
          planName: 'Free',
          subscriptionStatus: 'expired',
          updatedAt: Firestore.FieldValue.serverTimestamp()
        });
        break;

      case 'subscription_payment_failed':
        await userRef.update({
          subscriptionStatus: 'past_due',
          updatedAt: Firestore.FieldValue.serverTimestamp()
        });
        break;
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(400).json({ error: 'Webhook handler failed' });
  }
}


export async function handleParsedEmail (parsedEmail: any) {
  logger.info(`MAPPED EMAIL: ${parsedEmail}`)
  for (const value of parsedEmail.to.value) {
    try {
      const emailMapping = await EmailService.getEmailMapping(value.address);

      if (!emailMapping) {
        continue;
      }

      const toEmail = [{ name: 'Daniel Alome', email: emailMapping.destination }];
      const fromEmail = value.address;

      // Check blacklist before proceeding
      if (await EmailService.isBlacklisted(fromEmail)) {
        await EmailService.logEmailUsage(
          parsedEmail.subject,
          fromEmail,
          parsedEmail.attachments.length > 0,
          true
        );
        continue;
      }

      const message = EmailService.createEmailMessage(parsedEmail, toEmail, fromEmail);

      if (parsedEmail.attachments.length > 0) {
        message.attachments = await EmailService.processAttachments(parsedEmail.attachments);
      }

      if (toEmail.length > 0) {
        await EmailService.sendEmail(message);
      } else {
        // Fallback to default recipient
        const fallbackMessage = EmailService.createEmailMessage(
          parsedEmail,
          [{ name: 'Daniel Alome', email: DEFAULT_RECIPIENT }],
          fromEmail
        );
        await EmailService.sendEmail(fallbackMessage);
      }
    } catch (error) {
      throw error
    }
  }
}