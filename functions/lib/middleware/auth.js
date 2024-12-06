"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAuth = validateAuth;
const https_1 = require("firebase-functions/v2/https");
function validateAuth(context) {
    if (!context.auth) {
        throw new https_1.HttpsError('unauthenticated', 'User must be authenticated');
    }
}
