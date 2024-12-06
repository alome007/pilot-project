import * as admin from 'firebase-admin';
import { HttpsError } from 'firebase-functions/v2/https';
import { v4 as uuidv4 } from 'uuid';

export async function createAlias(userId: string, alias: string, destination: string) {
  try {
    // Check if alias is available
    const existingAlias = await admin.firestore()
      .collection('aliases')
      .where('alias', '==', alias)
      .get();

    if (!existingAlias.empty) {
      throw new HttpsError('already-exists', 'Alias already taken');
    }

    const aliasData = {
      id: uuidv4(),
      userId,
      alias,
      destination,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      active: true
    };

    await admin.firestore()
      .collection('aliases')
      .doc(aliasData.id)
      .set(aliasData);

    return aliasData;
  } catch (error) {
    throw new HttpsError('internal', 'Error creating alias');
  }
}

export async function getUserInbox(userId: string) {
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
    throw new HttpsError('internal', 'Error fetching inbox');
  }
}