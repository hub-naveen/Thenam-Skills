import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/authMiddleware';
import { admin } from '../config/firebaseAdmin';
import { sendResponse } from '../utils/apiResponse';
import { asyncHandler } from '../utils/asyncHandler';

// GET /api/notifications
export const getNotifications = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const user = req.user;
  const db = admin.firestore();

  const snapshot = await db.collection('notifications')
    .where('user', '==', user.firebaseUid)
    .orderBy('createdAt', 'desc')
    .get();

  const notifications = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return sendResponse(res, 200, true, 'Notifications retrieved successfully.', notifications);
});

// PATCH /api/notifications/:id/read
export const markRead = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const user = req.user;
  const db = admin.firestore();

  const docRef = db.collection('notifications').doc(id);
  const doc = await docRef.get();
  if (!doc.exists || doc.data()?.user !== user.firebaseUid) {
    return sendResponse(res, 404, false, 'Notification not found.');
  }

  await docRef.update({ read: true });
  const updatedDoc = await docRef.get();

  return sendResponse(res, 200, true, 'Notification marked as read successfully.', { id: updatedDoc.id, ...updatedDoc.data() });
});

// PATCH /api/notifications/read-all
export const markAllRead = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const user = req.user;
  const db = admin.firestore();

  const snapshot = await db.collection('notifications')
    .where('user', '==', user.firebaseUid)
    .where('read', '==', false)
    .get();

  const batch = db.batch();
  snapshot.docs.forEach(doc => {
    batch.update(doc.ref, { read: true });
  });
  await batch.commit();

  const updatedSnapshot = await db.collection('notifications')
    .where('user', '==', user.firebaseUid)
    .orderBy('createdAt', 'desc')
    .get();
  const updated = updatedSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  return sendResponse(res, 200, true, 'All notifications marked as read successfully.', updated);
});

// DELETE /api/notifications/:id
export const deleteNotification = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const user = req.user;
  const db = admin.firestore();

  const docRef = db.collection('notifications').doc(id);
  const doc = await docRef.get();
  if (!doc.exists || doc.data()?.user !== user.firebaseUid) {
    return sendResponse(res, 404, false, 'Notification not found.');
  }

  await docRef.delete();
  return sendResponse(res, 200, true, 'Notification deleted successfully.');
});
