import * as functions from 'firebase-functions';
import { createAlias, getUserInbox } from '../controllers/alias.controller';
import { validateAuth } from '../middleware/auth';

export const aliasRoutes = {
  createAlias: functions.https.onCall(async (data, context) => {
    validateAuth(context);
    const { alias, destination } = data;
    return createAlias(context.auth!.uid, alias, destination);
  }),

  getUserInbox: functions.https.onCall(async (data, context) => {
    validateAuth(context);
    return getUserInbox(context.auth!.uid);
  })
};