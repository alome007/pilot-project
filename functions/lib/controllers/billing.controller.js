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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBillingHistory = getBillingHistory;
exports.getUserPlan = getUserPlan;
exports.upgradePlan = upgradePlan;
const admin = __importStar(require("firebase-admin"));
const https_1 = require("firebase-functions/v2/https");
const lemonsqueezy_js_1 = __importDefault(require("@lemonsqueezy/lemonsqueezy.js"));
const lemonSqueezy = new lemonsqueezy_js_1.default(process.env.LEMON_SQUEEZY_API_KEY);
async function getBillingHistory(userId) {
    try {
        const invoicesSnapshot = await admin.firestore()
            .collection('invoices')
            .where('userId', '==', userId)
            .orderBy('createdAt', 'desc')
            .get();
        return invoicesSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    }
    catch (error) {
        throw new https_1.HttpsError('internal', 'Error fetching billing history');
    }
}
async function getUserPlan(userId) {
    try {
        const userDoc = await admin.firestore()
            .collection('users')
            .doc(userId)
            .get();
        if (!userDoc.exists) {
            throw new Error('User not found');
        }
        const userData = userDoc.data();
        return {
            planId: userData?.planId || 'free',
            planName: userData?.planName || 'Free',
            features: userData?.features || [],
            nextBillingDate: userData?.nextBillingDate,
            status: userData?.subscriptionStatus || 'active'
        };
    }
    catch (error) {
        throw error;
    }
}
async function upgradePlan(userId, planId) {
    try {
        // Create checkout session with LemonSqueezy
        // const checkoutOptions: CheckoutOptions = {
        //   storeId: parseInt(process.env.LEMON_SQUEEZY_STORE_ID!, 10),
        //   variantId: parseInt(planId, 10),
        //   checkoutOptions: {
        //     customData: {
        //       userId
        //     },
        //     email: (await admin.auth().getUser(userId)).email || ''
        //   },
        // };
        // const checkout = await lemonSqueezy.createCheckout(checkoutOptions);
        return {
            checkoutUrl: "checkout.data.attributes.url"
        };
    }
    catch (error) {
        throw error;
    }
}
