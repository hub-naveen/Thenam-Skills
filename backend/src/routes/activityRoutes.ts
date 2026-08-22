import { Router } from 'express';
import { getActivities, createActivity, deleteActivity } from '../controllers/activityController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.get('/', authMiddleware, getActivities);
router.post('/', authMiddleware, createActivity);
router.delete('/:id', authMiddleware, deleteActivity);

export default router;
