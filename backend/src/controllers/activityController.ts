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
