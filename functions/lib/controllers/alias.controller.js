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
exports.createAlias = createAlias;
exports.getUserInbox = getUserInbox;
const admin = __importStar(require("firebase-admin"));
const https_1 = require("firebase-functions/v2/https");
const uuid_1 = require("uuid");
async function createAlias(userId, alias, destination) {
    try {
        // Check if alias is available
        const existingAlias = await admin.firestore()
            .collection('aliases')
            .where('alias', '==', alias)
            .get();
        if (!existingAlias.empty) {
            throw new https_1.HttpsError('already-exists', 'Alias already taken');
        }
        const aliasData = {
            id: (0, uuid_1.v4)(),
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
    }
    catch (error) {
        throw new https_1.HttpsError('internal', 'Error creating alias');
    }
}
async function getUserInbox(userId) {
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
    }
    catch (error) {
        throw new https_1.HttpsError('internal', 'Error fetching inbox');
    }
}
