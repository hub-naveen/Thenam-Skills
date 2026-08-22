import { Router } from 'express';
import { getOwnProjects, getProjectById, createProject, updateProject, deleteProject } from '../controllers/projectController';
import { authMiddleware } from '../middleware/authMiddleware';
import { validateRequest } from '../middleware/validateMiddleware';
import { projectCreateSchema, projectUpdateSchema } from '../validations/projectValidation';

const router = Router();

router.get('/me', authMiddleware, getOwnProjects);
router.get('/:id', authMiddleware, getProjectById);
router.post('/', authMiddleware, validateRequest(projectCreateSchema), createProject);
router.put('/:id', authMiddleware, validateRequest(projectUpdateSchema), updateProject);
router.delete('/:id', authMiddleware, deleteProject);

export default router;
