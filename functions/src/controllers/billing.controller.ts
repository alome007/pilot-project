import * as admin from 'firebase-admin';
import { HttpsError } from 'firebase-functions/v2/https';
import { LemonSqueezy } from 'lemonsqueezy.ts';

const lemonSqueezy = new LemonSqueezy(process.env.LEMON_SQUEEZY_API_KEY!);

export async function getBillingHistory(userId: string) {
  try {
    const invoicesSnapshot = await admin.firestore()
      .collection('invoices')
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .get();

    return invoicesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    throw new HttpsError('internal', 'Error fetching billing history');
  }
}

export async function getUserPlan(userId: string) {
  try {
    const userDoc = await admin.firestore()
      .collection('users')
      .doc(userId)
      .get();

    if (!userDoc.exists) {
      throw new HttpsError('not-found', 'User not found');
    }

    const userData = userDoc.data();
    return {
      planId: userData?.planId || 'free',
      planName: userData?.planName || 'Free',
      features: userData?.features || [],
      nextBillingDate: userData?.nextBillingDate,
      status: userData?.subscriptionStatus || 'active'
    };
  } catch (error) {
    throw new HttpsError('internal', 'Error fetching user plan');
  }
}

export async function upgradePlan(userId: string, planId: string) {
  try {
    // Create checkout session with LemonSqueezy
    const checkout = await lemonSqueezy.createCheckout({
      storeId: process.env.LEMON_SQUEEZY_STORE_ID!,
      variantId: planId,
      customData: {
        userId
      },
      checkoutData: {
        email: (await admin.auth().getUser(userId)).email
      }
    });

    return {
      checkoutUrl: checkout.data.attributes.url
    };
  } catch (error) {
    throw new HttpsError('internal', 'Error creating checkout session');
  }
}