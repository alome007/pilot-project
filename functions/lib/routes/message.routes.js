"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageRoutes = void 0;
const express_1 = __importDefault(require("express"));
const message_controller_1 = require("../controllers/message.controller");
const router = express_1.default.Router();
router.get('/inboxes', async (req, res) => {
    try {
        const { aliasId } = req.query;
        const inboxes = await (0, message_controller_1.getUserInboxes)(req.user.uid, aliasId);
        res.json(inboxes);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch inboxes' });
    }
});
router.get('/thread/:threadId', async (req, res) => {
    try {
        const { threadId } = req.params;
        const thread = await (0, message_controller_1.getMessageThread)(req.user.uid, threadId);
        res.json(thread);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch message thread' });
    }
});
router.post('/reply', async (req, res) => {
    try {
        const { threadId, content, attachments } = req.body;
        const reply = await (0, message_controller_1.sendReply)(req.user.uid, threadId, content, attachments);
        res.json(reply);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to send reply' });
    }
});
router.post('/mark-read', async (req, res) => {
    try {
        const { messageIds } = req.body;
        const result = await (0, message_controller_1.markAsRead)(req.user.uid, messageIds);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to mark messages as read' });
    }
});
router.post('/archive/:messageId', async (req, res) => {
    try {
        const { messageId } = req.params;
        const result = await (0, message_controller_1.archiveMessage)(req.user.uid, messageId);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to archive message' });
    }
});
router.delete('/:messageId', async (req, res) => {
    try {
        const { messageId } = req.params;
        const result = await (0, message_controller_1.deleteMessage)(req.user.uid, messageId);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete message' });
    }
});
exports.messageRoutes = router;
