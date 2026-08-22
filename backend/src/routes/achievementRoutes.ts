import { Router } from 'express';
import { getOwnAchievements, createAchievement } from '../controllers/achievementController';
import { authMiddleware } from '../middleware/authMiddleware';
import { requireRole } from '../middleware/roleMiddleware';

const router = Router();

router.get('/me', authMiddleware, getOwnAchievements);
router.post('/', authMiddleware, requireRole('admin'), createAchievement);

export default router;
