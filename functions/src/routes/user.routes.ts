import * as functions from 'firebase-functions';
import { getUserInfo, getDashboardStats } from '../controllers/user.controller';
import { validateAuth } from '../middleware/auth';

export const userRoutes = {
  getUserInfo: functions.https.onCall(async (data, context) => {
    validateAuth(context);
    return getUserInfo(context.auth!.uid);
  }),

  getDashboardStats: functions.https.onCall(async (data, context) => {
    validateAuth(context);
    return getDashboardStats(context.auth!.uid);
  })
};