import * as admin from 'firebase-admin';
admin.initializeApp();
import * as functions from 'firebase-functions';
import express from 'express';
import { apiRoutes } from './routes/api.routes';
import { webhook } from './routes/webhook.routes';
import { swagger } from './swagger';
import { onUserCreated } from './auth/user.auth';


const app = express();
app.use(express.json());
app.use('/api', apiRoutes);

export const api = functions.https.onRequest(app);

export { swagger, webhook, onUserCreated };