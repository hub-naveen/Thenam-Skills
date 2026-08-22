import { Router } from 'express';
import { getNotifications, markRead, markAllRead, deleteNotification } from '../controllers/notificationController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.get('/', authMiddleware, getNotifications);
router.patch('/read-all', authMiddleware, markAllRead);
router.patch('/:id/read', authMiddleware, markRead);
router.delete('/:id', authMiddleware, deleteNotification);

export default router;
