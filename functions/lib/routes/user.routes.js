"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const router = express_1.default.Router();
router.get('/info', async (req, res) => {
    try {
        const userInfo = await (0, user_controller_1.getUserInfo)(req.user.uid);
        res.json(userInfo);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch user info' });
    }
});
router.get('/stats', async (req, res) => {
    try {
        const stats = await (0, user_controller_1.getDashboardStats)(req.user.uid);
        res.json(stats);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch dashboard stats' });
    }
});
exports.userRoutes = router;
