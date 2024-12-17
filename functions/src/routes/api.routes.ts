import express from 'express';
import { validateBearerAuth } from '../middleware/auth';
import { userRoutes } from './user.routes';
import { aliasRoutes } from './alias.routes';
import { billingRoutes } from './billing.routes';
import { messageRoutes } from './message.routes';

const router = express.Router();

// Apply auth middleware to all routes
router.use(validateBearerAuth);


// Mount route modules
router.use('/user', userRoutes);
router.use('/alias', aliasRoutes);
router.use('/billing', billingRoutes);
router.use('/messages', messageRoutes);

export const apiRoutes = router;