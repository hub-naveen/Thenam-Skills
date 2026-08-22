import { Request, Response } from 'express';
import { admin } from '../config/firebaseAdmin';
import { sendResponse } from '../utils/apiResponse';
import { asyncHandler } from '../utils/asyncHandler';

// GET /api/activities
export const getActivities = asyncHandler(async (req: Request, res: Response) => {
  const db = admin.firestore();
  
  const snapshot = await db.collection('activities')
    .orderBy('createdAt', 'desc')
    .limit(50)
    .get();

  const activities = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  // Gather unique user UIDs to populate user metadata
  const uids = Array.from(new Set(activities.map((act: any) => act.user).filter(Boolean)));
  
  if (uids.length > 0) {
    const userRefs = uids.map(uid => db.collection('users').doc(uid));
    const userDocs = await db.getAll(...userRefs);
    const userMap: Record<string, any> = {};
    
    userDocs.forEach(doc => {
      if (doc.exists) {
        const d = doc.data() || {};
        userMap[doc.id] = {
          id: doc.id,
          firebaseUid: doc.id,
          name: d.name || 'Google User',
          photoURL: d.photoURL || '',
          department: d.department || '',
          year: d.year || '',
          collegeName: d.collegeName || ''
        };
      }
    });

    // Populate user in each activity
    activities.forEach((act: any) => {
      if (act.user && userMap[act.user]) {
        act.user = userMap[act.user];
      } else {
        act.user = { name: 'Google User', photoURL: '' };
      }
    });
  }

  return sendResponse(res, 200, true, 'Activities feed retrieved successfully.', activities);
});

// POST /api/activities
export const createActivity = asyncHandler(async (req: any, res: Response) => {
  const db = admin.firestore();
  const uid = req.user?.firebaseUid || req.user?.id;
  if (!uid) {
    return sendResponse(res, 401, false, 'Unauthorized');
  }

  const { type, title, description, badgeText, badgeTheme, metadata } = req.body;
  
  const activityData = {
    user: uid,
    type: type || 'student_post',
    title: title || '',
    description: description || '',
    badgeText: badgeText || '💭 Student Post',
    badgeTheme: badgeTheme || 'blue',
    metadata: metadata || {},
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    likesCount: 0,
    commentsCount: 0,
    sharesCount: 0
  };

  const docRef = await db.collection('activities').add(activityData);
  const newActivity = await docRef.get();

  return sendResponse(res, 201, true, 'Activity created successfully.', { id: newActivity.id, ...newActivity.data() });
});

// DELETE /api/activities/:id
export const deleteActivity = asyncHandler(async (req: any, res: Response) => {
  const db = admin.firestore();
  const uid = req.user?.firebaseUid || req.user?.id;
  const activityId = req.params.id;

  if (!uid) {
    return sendResponse(res, 401, false, 'Unauthorized');
  }

  const docRef = db.collection('activities').doc(activityId);
  const doc = await docRef.get();

  if (!doc.exists) {
    return sendResponse(res, 404, false, 'Activity not found');
  }

  const data = doc.data();
  if (data?.user !== uid) {
    return sendResponse(res, 403, false, 'Forbidden: You can only delete your own activities');
  }

  await docRef.delete();

  return sendResponse(res, 200, true, 'Activity deleted successfully.');
});
