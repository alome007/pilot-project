import * as functions from 'firebase-functions';
import express from 'express';
import { simpleParser } from 'mailparser';
import { handleLemonSqueezyWebhook, handleParsedEmail } from '../controllers/webhook.controller';
import { logger } from 'firebase-functions';
const fileParser = require('express-multipart-file-parser')

const app = express();
app.use(express.json());
app.use(fileParser)

app.post('/lemonsqueezy', handleLemonSqueezyWebhook);



app.post('/sendgrid', async (req, res) => {
    logger.info(`Email received: ${req.body.email}`);
    try {
        const parsedEmail = await simpleParser(req.body.email);
        await handleParsedEmail(parsedEmail);
        res.sendStatus(200);
    } catch (error) {
        logger.error(`Error received: ${error}`);

        res.sendStatus(500);
    }
});


export const webhook = functions.https.onRequest(app);