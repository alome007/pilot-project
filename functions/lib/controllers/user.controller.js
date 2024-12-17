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
exports.createUser = createUser;
exports.getUserInfo = getUserInfo;
exports.getDashboardStats = getDashboardStats;
const admin = __importStar(require("firebase-admin"));
const emailtemplates_service_1 = require("../services/emailtemplates.service");
const alias_controller_1 = require("./alias.controller");
const message_controller_1 = require("./message.controller");
const { Firestore } = require("firebase-admin/firestore");
async function createUser(userId, email, name) {
    try {
        const userData = {
            email,
            name,
            planId: 'free',
            planName: 'Free',
            createdAt: Firestore.FieldValue.serverTimestamp(),
            features: ['Basic Alias Management', 'Email Forwarding']
        };
        const alias = (0, alias_controller_1.generateRandomAlias)();
        await Promise.all([
            admin.firestore()
                .collection('users')
                .doc(userId)
                .set(userData),
            (0, emailtemplates_service_1.sendWelcomeEmail)(email, name),
            (0, message_controller_1.createWelcomeThread)(alias),
            (0, alias_controller_1.createAlias)(userId, alias, email)
        ]);
        return userData;
    }
    catch (error) {
        throw error;
    }
}
async function getUserInfo(userId) {
    try {
        const userDoc = await admin.firestore()
            .collection('users')
            .doc(userId)
            .get();
        if (!userDoc.exists) {
            throw new Error('User not found');
        }
        return userDoc.data();
    }
    catch (error) {
        throw error;
    }
}
async function getDashboardStats(userId) {
    try {
        const [aliasCount, inboxCount, blockedCount] = await Promise.all([
            admin.firestore().collection('aliases').where('userId', '==', userId).count().get(),
            admin.firestore().collection('emails').where('userId', '==', userId).count().get(),
            admin.firestore().collection('blockedSenders').where('userId', '==', userId).count().get()
        ]);
        return {
            totalAliases: aliasCount.data().count,
            totalEmails: inboxCount.data().count,
            blockedSenders: blockedCount.data().count,
            lastUpdated: new Date().toISOString()
        };
    }
    catch (error) {
        throw error;
    }
}
