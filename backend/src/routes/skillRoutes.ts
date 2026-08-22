import { Router } from 'express';
import { getSkills, getSkillById, createSkill, updateSkill, deleteSkill } from '../controllers/skillController';
import { authMiddleware } from '../middleware/authMiddleware';
import { requireRole } from '../middleware/roleMiddleware';

const router = Router();

// Student read access
router.get('/', authMiddleware, getSkills);
router.get('/:id', authMiddleware, getSkillById);

// Administrative modification endpoints
router.post('/', authMiddleware, requireRole('admin'), createSkill);
router.put('/:id', authMiddleware, requireRole('admin'), updateSkill);
router.delete('/:id', authMiddleware, requireRole('admin'), deleteSkill);

export default router;
