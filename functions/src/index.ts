import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { userRoutes } from './routes/user.routes';
import { aliasRoutes } from './routes/alias.routes';
import { billingRoutes } from './routes/billing.routes';
import { messageRoutes } from './routes/message.routes';
import { swagger } from './swagger';

admin.initializeApp();

export const api = {
  ...userRoutes,
  ...aliasRoutes,
  ...billingRoutes,
  ...messageRoutes
};

export { swagger };