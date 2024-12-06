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
exports.messageRoutes = void 0;
const functions = __importStar(require("firebase-functions"));
const auth_1 = require("../middleware/auth");
const message_controller_1 = require("../controllers/message.controller");
exports.messageRoutes = {
    getUserInboxes: functions.https.onCall(async (data, context) => {
        (0, auth_1.validateAuth)(context);
        const { aliasId } = data;
        return (0, message_controller_1.getUserInboxes)(context.auth.uid, aliasId);
    }),
    getMessageThread: functions.https.onCall(async (data, context) => {
        (0, auth_1.validateAuth)(context);
        const { threadId } = data;
        return (0, message_controller_1.getMessageThread)(context.auth.uid, threadId);
    }),
    sendReply: functions.https.onCall(async (data, context) => {
        (0, auth_1.validateAuth)(context);
        const { threadId, content, attachments } = data;
        return (0, message_controller_1.sendReply)(context.auth.uid, threadId, content, attachments);
    }),
    markAsRead: functions.https.onCall(async (data, context) => {
        (0, auth_1.validateAuth)(context);
        const { messageIds } = data;
        return (0, message_controller_1.markAsRead)(context.auth.uid, messageIds);
    }),
    archiveMessage: functions.https.onCall(async (data, context) => {
        (0, auth_1.validateAuth)(context);
        const { messageId } = data;
        return (0, message_controller_1.archiveMessage)(context.auth.uid, messageId);
    }),
    deleteMessage: functions.https.onCall(async (data, context) => {
        (0, auth_1.validateAuth)(context);
        const { messageId } = data;
        return (0, message_controller_1.deleteMessage)(context.auth.uid, messageId);
    })
};
