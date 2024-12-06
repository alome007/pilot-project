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
const admin = __importStar(require("firebase-admin"));
const https_1 = require("firebase-functions/v2/https");
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
        throw new https_1.HttpsError('internal', 'Error fetching inboxes');
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
            throw new https_1.HttpsError('not-found', 'Thread not found');
        }
        const thread = threadDoc.data();
        // Verify user has access to this thread
        if (!thread.participants.includes(userId)) {
            throw new https_1.HttpsError('permission-denied', 'Access denied to this thread');
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
    }
    catch (error) {
        throw new https_1.HttpsError('internal', 'Error fetching message thread');
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
        const thread = threadDoc.data();
        if (!thread.participants.includes(userId)) {
            throw new https_1.HttpsError('permission-denied', 'Access denied to this thread');
        }
        const messageData = {
            id: (0, uuid_1.v4)(),
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
    }
    catch (error) {
        throw new https_1.HttpsError('internal', 'Error sending reply');
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
        throw new https_1.HttpsError('internal', 'Error marking messages as read');
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
            throw new https_1.HttpsError('permission-denied', 'Access denied to this message');
        }
        await messageRef.update({
            archived: true,
            archivedAt: admin.firestore.FieldValue.serverTimestamp()
        });
        return { success: true };
    }
    catch (error) {
        throw new https_1.HttpsError('internal', 'Error archiving message');
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
            throw new https_1.HttpsError('permission-denied', 'Access denied to this message');
        }
        await messageRef.delete();
        return { success: true };
    }
    catch (error) {
        throw new https_1.HttpsError('internal', 'Error deleting message');
    }
}
