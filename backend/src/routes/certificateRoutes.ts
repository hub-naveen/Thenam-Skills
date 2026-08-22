import { Router } from 'express';
import { getOwnCertificates, getCertificateById, verifyCertificate } from '../controllers/certificateController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.get('/me', authMiddleware, getOwnCertificates);
router.get('/verify/:verificationCode', verifyCertificate); // PUBLIC VERIFICATION
router.get('/:id', authMiddleware, getCertificateById);

export default router;
