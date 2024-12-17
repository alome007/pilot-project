import express from 'express';
import {
  getUserInboxes,
  getMessageThread,
  sendReply,
  markAsRead,
  archiveMessage,
  deleteMessage
} from '../controllers/message.controller';

const router = express.Router();

router.get('/inboxes', async (req, res) => {
  try {
    const { aliasId } = req.query;
    const inboxes = await getUserInboxes(req.user!.uid, aliasId as string);
    res.json(inboxes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch inboxes' });
  }
});

router.get('/thread/:threadId', async (req, res) => {
  try {
    const { threadId } = req.params;
    const thread = await getMessageThread(req.user!.uid, threadId);
    res.json(thread);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch message thread' });
  }
});

router.post('/reply', async (req, res) => {
  try {
    const { threadId, content, attachments } = req.body;
    const reply = await sendReply(req.user!.uid, threadId, content, attachments);
    res.json(reply);
  } catch (error) {
    res.status(500).json({ error: 'Failed to send reply' });
  }
});

router.post('/mark-read', async (req, res) => {
  try {
    const { messageIds } = req.body;
    const result = await markAsRead(req.user!.uid, messageIds);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to mark messages as read' });
  }
});

router.post('/archive/:messageId', async (req, res) => {
  try {
    const { messageId } = req.params;
    const result = await archiveMessage(req.user!.uid, messageId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to archive message' });
  }
});

router.delete('/:messageId', async (req, res) => {
  try {
    const { messageId } = req.params;
    const result = await deleteMessage(req.user!.uid, messageId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete message' });
  }
});

export const messageRoutes = router;