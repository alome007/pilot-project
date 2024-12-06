import * as admin from 'firebase-admin';
import { HttpsError } from 'firebase-functions/v2/https';
import { v4 as uuidv4 } from 'uuid';
import { Message, MessageThread, Attachment } from '../types/message.types';

export async function getUserInboxes(userId: string, aliasId?: string) {
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
    throw new HttpsError('internal', 'Error fetching inboxes');
  }
}

async function getLastMessage(threadId: string): Promise<Message | null> {
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

export async function getMessageThread(userId: string, threadId: string) {
  try {
    const threadDoc = await admin.firestore()
      .collection('messageThreads')
      .doc(threadId)
      .get();

    if (!threadDoc.exists) {
      throw new HttpsError('not-found', 'Thread not found');
    }

    const thread = threadDoc.data() as MessageThread;
    
    // Verify user has access to this thread
    if (!thread.participants.includes(userId)) {
      throw new HttpsError('permission-denied', 'Access denied to this thread');
    }

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
    throw new HttpsError('internal', 'Error fetching message thread');
  }
}

export async function sendReply(
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

    const thread = threadDoc.data() as MessageThread;
    
    if (!thread.participants.includes(userId)) {
      throw new HttpsError('permission-denied', 'Access denied to this thread');
    }

    const messageData: Message = {
      id: uuidv4(),
      threadId,
      content,
      senderId: userId,
      sentAt: admin.firestore.FieldValue.serverTimestamp(),
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
          lastMessageAt: admin.firestore.FieldValue.serverTimestamp()
        })
    ]);

    return messageData;
  } catch (error) {
    throw new HttpsError('internal', 'Error sending reply');
  }
}

export async function markAsRead(userId: string, messageIds: string[]) {
  try {
    const batch = admin.firestore().batch();

    messageIds.forEach(messageId => {
      const messageRef = admin.firestore().collection('messages').doc(messageId);
      batch.update(messageRef, { read: true });
    });

    await batch.commit();
    return { success: true };
  } catch (error) {
    throw new HttpsError('internal', 'Error marking messages as read');
  }
}

export async function archiveMessage(userId: string, messageId: string) {
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
      throw new HttpsError('permission-denied', 'Access denied to this message');
    }

    await messageRef.update({
      archived: true,
      archivedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    return { success: true };
  } catch (error) {
    throw new HttpsError('internal', 'Error archiving message');
  }
}

export async function deleteMessage(userId: string, messageId: string) {
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
      throw new HttpsError('permission-denied', 'Access denied to this message');
    }

    await messageRef.delete();
    return { success: true };
  } catch (error) {
    throw new HttpsError('internal', 'Error deleting message');
  }
}