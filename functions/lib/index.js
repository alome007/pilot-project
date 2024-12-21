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
exports.onUserCreated = exports.webhook = exports.swagger = exports.api = void 0;
const admin = __importStar(require("firebase-admin"));
admin.initializeApp();
const functions = __importStar(require("firebase-functions"));
const express_1 = __importDefault(require("express"));
const api_routes_1 = require("./routes/api.routes");
const webhook_routes_1 = require("./routes/webhook.routes");
Object.defineProperty(exports, "webhook", { enumerable: true, get: function () { return webhook_routes_1.webhook; } });
const swagger_1 = require("./swagger");
Object.defineProperty(exports, "swagger", { enumerable: true, get: function () { return swagger_1.swagger; } });
const user_auth_1 = require("./auth/user.auth");
Object.defineProperty(exports, "onUserCreated", { enumerable: true, get: function () { return user_auth_1.onUserCreated; } });
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const corsOptions = {
    origin: '*', // Allows all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use('/api', api_routes_1.apiRoutes);
exports.api = functions.https.onRequest(app);
