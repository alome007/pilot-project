import * as admin from 'firebase-admin';
import { HttpsError } from 'firebase-functions/v2/https';
const { Firestore } = require("firebase-admin/firestore");

import { v4 as uuidv4 } from 'uuid';
import { Message, MessageThread, Attachment } from '../types/message.types';


export async function getUserInboxes (userId: string, aliasId?: string) {
  try {
    let query = admin.firestore()
      .collection('messageThreads')
      .where('participants', 'array-contains', userId)
      .orderBy('lastMessageAt', 'desc');

    if (aliasId) {
      query = query.where('aliasId', '==', aliasId);
    }

    const threadsSnapshot = await query.limit(50).get();

    const threads = await Promise.all(threadsSnapshot.docs.map(async doc => {
      const thread = doc.data() as MessageThread;
      const lastMessage = await getLastMessage(doc.id);
      return {
        ...thread,
        id: doc.id,
        lastMessage
      };
    }));

    return threads;
  } catch (error) {
    throw error;
  }
}

async function getLastMessage (threadId: string): Promise<Message | null> {
  const messagesSnapshot = await admin.firestore()
    .collection('messages')
    .where('threadId', '==', threadId)
    .orderBy('sentAt', 'desc')
    .limit(1)
    .get();

  if (messagesSnapshot.empty) return null;

  const message = messagesSnapshot.docs[0].data() as Message;
  return {
    ...message,
    id: messagesSnapshot.docs[0].id
  };
}

export async function getMessageThread (userId: string, threadId: string) {
  try {
    const threadDoc = await admin.firestore()
      .collection('messageThreads')
      .doc(threadId)
      .get();

    if (!threadDoc.exists) {
      throw new Error('Thread not found');
    }

    const thread = threadDoc.data() as MessageThread;

    const messagesSnapshot = await admin.firestore()
      .collection('messages')
      .where('threadId', '==', threadId)
      .orderBy('sentAt', 'asc')
      .get();

    const messages = messagesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return {
      ...thread,
      id: threadId,
      messages
    };
  } catch (error) {
    throw error;
  }
}

export async function sendReply (
  userId: string,
  threadId: string,
  content: string,
  attachments: Attachment[] = []
) {
  try {
    const threadDoc = await admin.firestore()
      .collection('messageThreads')
      .doc(threadId)
      .get();

    if (!threadDoc.exists) {
      throw new HttpsError('not-found', 'Thread not found');
    }

    const messageData: Message = {
      id: uuidv4(),
      threadId,
      content,
      senderId: userId,
      sentAt: admin.firestore.Timestamp.now(),
      attachments,
      read: false
    };

    await Promise.all([
      // Add new message
      admin.firestore()
        .collection('messages')
        .doc(messageData.id)
        .set(messageData),

      // Update thread's last message timestamp
      admin.firestore()
        .collection('messageThreads')
        .doc(threadId)
        .update({
          lastMessageAt: Firestore.FieldValue.serverTimestamp()
        })
    ]);

    return messageData;
  } catch (error) {
    throw error;
  }
}

export async function markAsRead (userId: string, messageIds: string[]) {
  try {
    const batch = admin.firestore().batch();

    messageIds.forEach(messageId => {
      const messageRef = admin.firestore().collection('messages').doc(messageId);
      batch.update(messageRef, { read: true });
    });

    await batch.commit();
    return { success: true };
  } catch (error) {
    throw error;
  }
}

export async function archiveMessage (userId: string, messageId: string) {
  try {
    const messageRef = admin.firestore().collection('messages').doc(messageId);
    const messageDoc = await messageRef.get();

    if (!messageDoc.exists) {
      throw new HttpsError('not-found', 'Message not found');
    }

    const message = messageDoc.data() as Message;

    // Verify user has access to this message
    const threadDoc = await admin.firestore()
      .collection('messageThreads')
      .doc(message.threadId)
      .get();

    if (!threadDoc.exists || !threadDoc.data()?.participants.includes(userId)) {
      throw new Error('Access denied to this message');
    }

    await messageRef.update({
      archived: true,
      archivedAt: Firestore.FieldValue.serverTimestamp()
    });

    return { success: true };
  } catch (error) {
    throw error;
  }
}

export async function deleteMessage (userId: string, messageId: string) {
  try {
    const messageRef = admin.firestore().collection('messages').doc(messageId);
    const messageDoc = await messageRef.get();

    if (!messageDoc.exists) {
      throw new HttpsError('not-found', 'Message not found');
    }

    const message = messageDoc.data() as Message;

    // Verify user has access to this message
    const threadDoc = await admin.firestore()
      .collection('messageThreads')
      .doc(message.threadId)
      .get();

    if (!threadDoc.exists || !threadDoc.data()?.participants.includes(userId)) {
      throw new Error('Access denied to this message');
    }

    await messageRef.delete();
    return { success: true };
  } catch (error) {
    throw error;
  }
}
/**
 * Creates a new message thread document in Firestore using Firebase Admin SDK
 * @param messageThread - The message thread data to be added
 * @returns Promise resolving to the created document ID
 */
export async function createMessageThread (
  messageThread: MessageThread
): Promise<string> {
  try {
    // Add the document to the message_threads collection
    const docRef = await admin.firestore().collection('message_threads').add({
      ...messageThread,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    return docRef.id; // Return the ID of the newly created document
  } catch (error) {
    console.error('Error creating message thread:', error);
    throw error; // Re-throw to allow caller to handle the error
  }
}

export async function createWelcomeThread (alias: string) {
  const messageThread: MessageThread = {
    alias: alias, // Generate a random alias
    sender: 'RelayBox',
    subject: 'Welcome to RelayBox!',
    preview: '...',
    time: new Date().toDateString(),
    isStarred: true,
    isRead: false,
    hasAttachment: false,
    canReply: false,
    messages: [
      {
        content: "Welcome to the future of email security and privacy",
        timestamp: new Date().toDateString(),
        fromMe: false
      }
    ]
  };

  await createMessageThread(messageThread)
}