"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.billingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const billing_controller_1 = require("../controllers/billing.controller");
const router = express_1.default.Router();
router.get('/history', async (req, res) => {
    try {
        const history = await (0, billing_controller_1.getBillingHistory)(req.user.uid);
        res.json(history);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch billing history' });
    }
});
router.get('/plan', async (req, res) => {
    try {
        const plan = await (0, billing_controller_1.getUserPlan)(req.user.uid);
        res.json(plan);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch user plan' });
    }
});
router.post('/upgrade', async (req, res) => {
    try {
        const { planId } = req.body;
        const result = await (0, billing_controller_1.upgradePlan)(req.user.uid, planId);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to upgrade plan' });
    }
});
exports.billingRoutes = router;
