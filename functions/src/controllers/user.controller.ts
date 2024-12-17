import * as admin from 'firebase-admin';
import { sendWelcomeEmail } from '../services/emailtemplates.service';
import { createAlias, generateRandomAlias } from './alias.controller';
import { createWelcomeThread } from './message.controller';
const { Firestore } = require("firebase-admin/firestore");

export async function createUser (userId: string, email: string, name: string) {
  try {
    const userData = {
      email,
      name,
      planId: 'free',
      planName: 'Free',
      createdAt: Firestore.FieldValue.serverTimestamp(),
      features: ['Basic Alias Management', 'Email Forwarding']
    };

    const alias = generateRandomAlias()
    await Promise.all([
      admin.firestore()
        .collection('users')
        .doc(userId)
        .set(userData),
      sendWelcomeEmail(email, name),
      createWelcomeThread(alias),
      createAlias(userId, alias, email)
    ]);

    return userData;
  } catch (error) {
    throw error
  }
}

export async function getUserInfo (userId: string) {
  try {
    const userDoc = await admin.firestore()
      .collection('users')
      .doc(userId)
      .get();

    if (!userDoc.exists) {
      throw new Error('User not found');
    }

    return userDoc.data();
  } catch (error) {
    throw error;
  }
}

export async function getDashboardStats (userId: string) {
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
    throw error;
  }
}