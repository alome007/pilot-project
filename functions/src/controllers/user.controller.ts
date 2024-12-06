import * as admin from 'firebase-admin';
import { HttpsError } from 'firebase-functions/v2/https';

export async function getUserInfo(userId: string) {
  try {
    const userDoc = await admin.firestore()
      .collection('users')
      .doc(userId)
      .get();

    if (!userDoc.exists) {
      throw new HttpsError('not-found', 'User not found');
    }

    return userDoc.data();
  } catch (error) {
    throw new HttpsError('internal', 'Error fetching user info');
  }
}

export async function getDashboardStats(userId: string) {
  try {
    const [aliasCount, inboxCount, blockedCount] = await Promise.all([
      admin.firestore().collection('aliases').where('userId', '==', userId).count().get(),
      admin.firestore().collection('emails').where('userId', '==', userId).count().get(),
      admin.firestore().collection('blockedSenders').where('userId', '==', userId).count().get()
    ]);

    return {
      totalAliases: aliasCount.data().count,
      totalEmails: inboxCount.data().count,
      blockedSenders: blockedCount.data().count,
      lastUpdated: new Date().toISOString()
    };
  } catch (error) {
    throw new HttpsError('internal', 'Error fetching dashboard stats');
  }
}