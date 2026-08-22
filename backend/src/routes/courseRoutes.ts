import { Router } from 'express';
import {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  enrollInCourse,
  getProgress,
  updateProgress,
  completeCourse
} from '../controllers/courseController';
import { authMiddleware } from '../middleware/authMiddleware';
import { requireRole } from '../middleware/roleMiddleware';
import { validateRequest } from '../middleware/validateMiddleware';
import { courseCreateSchema, courseUpdateSchema } from '../validations/courseValidation';

const router = Router();

// Student access endpoints
router.get('/', authMiddleware, getCourses);
router.get('/:id', authMiddleware, getCourseById);
router.post('/:id/enroll', authMiddleware, enrollInCourse);
router.get('/:id/progress', authMiddleware, getProgress);
router.put('/:id/progress', authMiddleware, updateProgress);
router.post('/:id/complete', authMiddleware, completeCourse);

// Admin/Faculty administrative endpoints
router.post('/', authMiddleware, requireRole('admin', 'faculty'), validateRequest(courseCreateSchema), createCourse);
router.put('/:id', authMiddleware, requireRole('admin', 'faculty'), validateRequest(courseUpdateSchema), updateCourse);
router.delete('/:id', authMiddleware, requireRole('admin', 'faculty'), deleteCourse);

export default router;
