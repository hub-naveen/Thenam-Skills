import { Router } from 'express';
import { getTalents } from '../controllers/talentController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.get('/', authMiddleware, getTalents);

export default router;
