import * as admin from 'firebase-admin';
import { HttpsError } from 'firebase-functions/v2/https';
import { v4 as uuidv4 } from 'uuid';
const { Firestore } = require("firebase-admin/firestore");


export async function createAlias (userId: string, alias: string, destination: string) {
  try {
    // Check if alias is available
    const existingAlias = await admin.firestore()
      .collection('aliases')
      .where('alias', '==', alias)
      .get();

    if (!existingAlias.empty) {
      throw new Error('Alias already taken');
    }

    const aliasData = {
      id: uuidv4(),
      userId,
      alias,
      destination,
      createdAt: Firestore.FieldValue.serverTimestamp(),
      active: true
    };

    await admin.firestore()
      .collection('aliases')
      .doc(aliasData.id)
      .set(aliasData);

    return aliasData;
  } catch (error) {
    throw error;
  }
}

export async function getUserInbox (userId: string) {
  try {
    const emailsSnapshot = await admin.firestore()
      .collection('emails')
      .where('userId', '==', userId)
      .orderBy('receivedAt', 'desc')
      .limit(50)
      .get();

    return emailsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    throw error;
  }
}

/**
 * Generates a random alias with @thesnocks.us domain
 * @param prefix Optional prefix for the alias
 * @returns A randomly generated email alias
 */
export function generateRandomAlias (prefix?: string): string {
  // Array of random adjectives and nouns to create interesting aliases
  const adjectives = [
    'clever', 'quick', 'silly', 'smart', 'brave', 'cool',
    'wild', 'funky', 'smooth', 'zen', 'epic', 'ninja'
  ];

  const nouns = [
    'fox', 'wolf', 'eagle', 'shark', 'tiger', 'hawk',
    'lion', 'bear', 'dragon', 'phoenix', 'cobra', 'raven'
  ];

  // Generate a random string
  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  const randomNumber = Math.floor(Math.random() * 9999).toString().padStart(4, '0');

  // Combine parts
  const alias = prefix
    ? `${prefix}_${randomAdjective}_${randomNoun}_${randomNumber}`
    : `${randomAdjective}_${randomNoun}_${randomNumber}`;

  // Append domain
  return `${alias.toLowerCase()}@thesnocks.us`;
}
