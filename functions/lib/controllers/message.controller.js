"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserInboxes = getUserInboxes;
exports.getMessageThread = getMessageThread;
exports.sendReply = sendReply;
exports.markAsRead = markAsRead;
exports.archiveMessage = archiveMessage;
exports.deleteMessage = deleteMessage;
exports.createMessageThread = createMessageThread;
exports.createWelcomeThread = createWelcomeThread;
const admin = __importStar(require("firebase-admin"));
const https_1 = require("firebase-functions/v2/https");
const { Firestore } = require("firebase-admin/firestore");
const uuid_1 = require("uuid");
async function getUserInboxes(userId, aliasId) {
    try {
        let query = admin.firestore()
            .collection('messageThreads')
            .where('participants', 'array-contains', userId)
            .orderBy('lastMessageAt', 'desc');
        if (aliasId) {
            query = query.where('aliasId', '==', aliasId);
        }
        const threadsSnapshot = await query.limit(50).get();
        const threads = await Promise.all(threadsSnapshot.docs.map(async (doc) => {
            const thread = doc.data();
            const lastMessage = await getLastMessage(doc.id);
            return {
                ...thread,
                id: doc.id,
                lastMessage
            };
        }));
        return threads;
    }
    catch (error) {
        throw error;
    }
}
async function getLastMessage(threadId) {
    const messagesSnapshot = await admin.firestore()
        .collection('messages')
        .where('threadId', '==', threadId)
        .orderBy('sentAt', 'desc')
        .limit(1)
        .get();
    if (messagesSnapshot.empty)
        return null;
    const message = messagesSnapshot.docs[0].data();
    return {
        ...message,
        id: messagesSnapshot.docs[0].id
    };
}
async function getMessageThread(userId, threadId) {
    try {
        const threadDoc = await admin.firestore()
            .collection('messageThreads')
            .doc(threadId)
            .get();
        if (!threadDoc.exists) {
            throw new Error('Thread not found');
        }
        const thread = threadDoc.data();
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
    }
    catch (error) {
        throw error;
    }
}
async function sendReply(userId, threadId, content, attachments = []) {
    try {
        const threadDoc = await admin.firestore()
            .collection('messageThreads')
            .doc(threadId)
            .get();
        if (!threadDoc.exists) {
            throw new https_1.HttpsError('not-found', 'Thread not found');
        }
        const messageData = {
            id: (0, uuid_1.v4)(),
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
    }
    catch (error) {
        throw error;
    }
}
async function markAsRead(userId, messageIds) {
    try {
        const batch = admin.firestore().batch();
        messageIds.forEach(messageId => {
            const messageRef = admin.firestore().collection('messages').doc(messageId);
            batch.update(messageRef, { read: true });
        });
        await batch.commit();
        return { success: true };
    }
    catch (error) {
        throw error;
    }
}
async function archiveMessage(userId, messageId) {
    try {
        const messageRef = admin.firestore().collection('messages').doc(messageId);
        const messageDoc = await messageRef.get();
        if (!messageDoc.exists) {
            throw new https_1.HttpsError('not-found', 'Message not found');
        }
        const message = messageDoc.data();
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
    }
    catch (error) {
        throw error;
    }
}
async function deleteMessage(userId, messageId) {
    try {
        const messageRef = admin.firestore().collection('messages').doc(messageId);
        const messageDoc = await messageRef.get();
        if (!messageDoc.exists) {
            throw new https_1.HttpsError('not-found', 'Message not found');
        }
        const message = messageDoc.data();
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
    }
    catch (error) {
        throw error;
    }
}
/**
 * Creates a new message thread document in Firestore using Firebase Admin SDK
 * @param messageThread - The message thread data to be added
 * @returns Promise resolving to the created document ID
 */
async function createMessageThread(messageThread) {
    try {
        // Add the document to the message_threads collection
        const docRef = await admin.firestore().collection('message_threads').add({
            ...messageThread,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });
        return docRef.id; // Return the ID of the newly created document
    }
    catch (error) {
        console.error('Error creating message thread:', error);
        throw error; // Re-throw to allow caller to handle the error
    }
}
async function createWelcomeThread(alias) {
    const messageThread = {
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
    await createMessageThread(messageThread);
}
