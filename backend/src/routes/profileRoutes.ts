import { Router } from 'express';
import { createProfile, updateProfile, getPublicProfile } from '../controllers/profileController';
import { authMiddleware } from '../middleware/authMiddleware';
import { validateRequest } from '../middleware/validateMiddleware';
import { profileCreateSchema, profileUpdateSchema } from '../validations/profileValidation';

const router = Router();

router.post('/', authMiddleware, validateRequest(profileCreateSchema), createProfile);
router.put('/me', authMiddleware, validateRequest(profileUpdateSchema), updateProfile);
router.get('/:firebaseUid', authMiddleware, getPublicProfile);

export default router;
