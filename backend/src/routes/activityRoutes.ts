import { Router } from 'express';
import { getActivities } from '../controllers/activityController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.get('/', authMiddleware, getActivities);

export default router;
