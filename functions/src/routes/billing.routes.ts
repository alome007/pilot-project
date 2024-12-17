import express from 'express';
import { getBillingHistory, getUserPlan, upgradePlan } from '../controllers/billing.controller';

const router = express.Router();

router.get('/history', async (req, res) => {
  try {
    const history = await getBillingHistory(req.user!.uid);
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch billing history' });
  }
});

router.get('/plan', async (req, res) => {
  try {
    const plan = await getUserPlan(req.user!.uid);
    res.json(plan);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user plan' });
  }
});

router.post('/upgrade', async (req, res) => {
  try {
    const { planId } = req.body;
    const result = await upgradePlan(req.user!.uid, planId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to upgrade plan' });
  }
});

export const billingRoutes = router;