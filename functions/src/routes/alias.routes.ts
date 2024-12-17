import express from 'express';
import { createAlias, getUserInbox } from '../controllers/alias.controller';

const router = express.Router();

router.post('/create', async (req, res) => {
  try {
    const { alias, destination } = req.body;
    const result = await createAlias(req.user!.uid, alias, destination);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create alias' });
  }
});

router.get('/inbox', async (req, res) => {
  try {
    const inbox = await getUserInbox(req.user!.uid);
    res.json(inbox);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to fetch inbox' });
  }
});

export const aliasRoutes = router;