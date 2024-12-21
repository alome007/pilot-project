import * as admin from 'firebase-admin';
admin.initializeApp();
import * as functions from 'firebase-functions';
import express from 'express';
import { apiRoutes } from './routes/api.routes';
import { webhook } from './routes/webhook.routes';
import { swagger } from './swagger';
import { onUserCreated } from './auth/user.auth';
import cors from 'cors';



const app = express();


const corsOptions = {
    origin: '*', // Allows all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api', apiRoutes);

export const api = functions.https.onRequest(app);

export { swagger, webhook, onUserCreated };
