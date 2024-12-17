"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.aliasRoutes = void 0;
const express_1 = __importDefault(require("express"));
const alias_controller_1 = require("../controllers/alias.controller");
const router = express_1.default.Router();
router.post('/create', async (req, res) => {
    try {
        const { alias, destination } = req.body;
        const result = await (0, alias_controller_1.createAlias)(req.user.uid, alias, destination);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create alias' });
    }
});
router.get('/inbox', async (req, res) => {
    try {
        const inbox = await (0, alias_controller_1.getUserInbox)(req.user.uid);
        res.json(inbox);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to fetch inbox' });
    }
});
exports.aliasRoutes = router;
