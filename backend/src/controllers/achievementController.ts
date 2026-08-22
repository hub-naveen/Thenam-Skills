import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../middleware/authMiddleware';
import { admin } from '../config/firebaseAdmin';
import { sendResponse } from '../utils/apiResponse';
import { asyncHandler } from '../utils/asyncHandler';

// GET /api/achievements/me
export const getOwnAchievements = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const user = req.user;
  const db = admin.firestore();

  const snapshot = await db.collection('achievements')
    .where('user', '==', user.firebaseUid)
    .get();

  const achievements = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return sendResponse(res, 200, true, 'User achievements retrieved successfully.', achievements);
});

// POST /api/achievements (Admin/System only)
export const createAchievement = asyncHandler(async (req: Request, res: Response) => {
  const { user, title, description, type, icon, xp } = req.body;
  const db = admin.firestore();

  const docRef = db.collection('achievements').doc();
  const achievement = {
    user,
    title,
    description: description || '',
    type,
    icon: icon || 'award',
    xp: xp || 0,
    earnedAt: admin.firestore.Timestamp.now()
  };

  await docRef.set(achievement);
  return sendResponse(res, 201, true, 'Achievement created successfully.', { id: docRef.id, ...achievement });
});
