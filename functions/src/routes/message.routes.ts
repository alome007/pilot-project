import * as functions from 'firebase-functions';
import { validateAuth } from '../middleware/auth';
import { 
  getUserInboxes, 
  getMessageThread, 
  sendReply,
  markAsRead,
  archiveMessage,
  deleteMessage
} from '../controllers/message.controller';

export const messageRoutes = {
  getUserInboxes: functions.https.onCall(async (data, context) => {
    validateAuth(context);
    const { aliasId } = data;
    return getUserInboxes(context.auth!.uid, aliasId);
  }),

  getMessageThread: functions.https.onCall(async (data, context) => {
    validateAuth(context);
    const { threadId } = data;
    return getMessageThread(context.auth!.uid, threadId);
  }),

  sendReply: functions.https.onCall(async (data, context) => {
    validateAuth(context);
    const { threadId, content, attachments } = data;
    return sendReply(context.auth!.uid, threadId, content, attachments);
  }),

  markAsRead: functions.https.onCall(async (data, context) => {
    validateAuth(context);
    const { messageIds } = data;
    return markAsRead(context.auth!.uid, messageIds);
  }),

  archiveMessage: functions.https.onCall(async (data, context) => {
    validateAuth(context);
    const { messageId } = data;
    return archiveMessage(context.auth!.uid, messageId);
  }),

  deleteMessage: functions.https.onCall(async (data, context) => {
    validateAuth(context);
    const { messageId } = data;
    return deleteMessage(context.auth!.uid, messageId);
  })
};