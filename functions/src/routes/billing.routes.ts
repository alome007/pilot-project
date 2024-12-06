import * as functions from 'firebase-functions';
import { getBillingHistory, getUserPlan, upgradePlan } from '../controllers/billing.controller';
import { validateAuth } from '../middleware/auth';

export const billingRoutes = {
  getBillingHistory: functions.https.onCall(async (data, context) => {
    validateAuth(context);
    return getBillingHistory(context.auth!.uid);
  }),

  getUserPlan: functions.https.onCall(async (data, context) => {
    validateAuth(context);
    return getUserPlan(context.auth!.uid);
  }),

  upgradePlan: functions.https.onCall(async (data, context) => {
    validateAuth(context);
    const { planId } = data;
    return upgradePlan(context.auth!.uid, planId);
  })
};