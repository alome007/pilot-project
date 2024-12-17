import express from 'express';
import { getUserInfo, getDashboardStats } from '../controllers/user.controller';

const router = express.Router();

router.get('/info', async (req, res) => {
  try {
    const userInfo = await getUserInfo(req.user!.uid);
    res.json(userInfo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user info' });
  }
});

router.get('/stats', async (req, res) => {
  try {
    const stats = await getDashboardStats(req.user!.uid);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
});

export const userRoutes = router;