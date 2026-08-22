import { Request, Response } from 'express';
import { admin } from '../config/firebaseAdmin';
import { sendResponse } from '../utils/apiResponse';
import { asyncHandler } from '../utils/asyncHandler';

// GET /api/admin/users
export const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const db = admin.firestore();
  const snapshot = await db.collection('users').get();
  const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  return sendResponse(res, 200, true, 'User records retrieved successfully.', users);
});

// GET /api/admin/users/:id
export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const db = admin.firestore();

  const doc = await db.collection('users').doc(id).get();
  if (!doc.exists) {
    return sendResponse(res, 404, false, 'User not found.');
  }

  return sendResponse(res, 200, true, 'User record retrieved successfully.', { id: doc.id, ...doc.data() });
});

// PATCH /api/admin/users/:id/role
export const updateUserRole = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { role } = req.body;
  const db = admin.firestore();

  if (!['student', 'faculty', 'admin', 'recruiter'].includes(role)) {
    return sendResponse(res, 400, false, 'Invalid role. Allowed roles: student, faculty, admin, recruiter');
  }

  const docRef = db.collection('users').doc(id);
  const doc = await docRef.get();
  if (!doc.exists) {
    return sendResponse(res, 404, false, 'User not found.');
  }

  await docRef.update({ 
    role,
    updatedAt: admin.firestore.Timestamp.now()
  });

  const updatedDoc = await docRef.get();
  return sendResponse(res, 200, true, `User role updated to ${role} successfully.`, { id: updatedDoc.id, ...updatedDoc.data() });
});

// DELETE /api/admin/users/:id
export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const db = admin.firestore();

  const docRef = db.collection('users').doc(id);
  const doc = await docRef.get();
  if (!doc.exists) {
    return sendResponse(res, 404, false, 'User not found.');
  }

  const batch = db.batch();
  batch.delete(docRef);

  // Delete all user related data in Firestore
  const deleteFromCollection = async (collName: string, fieldName: string) => {
    const snapshot = await db.collection(collName).where(fieldName, '==', id).get();
    snapshot.docs.forEach(eDoc => {
      batch.delete(eDoc.ref);
    });
  };

  await Promise.all([
    deleteFromCollection('enrollments', 'user'),
    deleteFromCollection('certificates', 'user'),
    deleteFromCollection('projects', 'user'),
    deleteFromCollection('achievements', 'user'),
    deleteFromCollection('activities', 'user'),
    deleteFromCollection('notifications', 'user')
  ]);

  await batch.commit();
  return sendResponse(res, 200, true, 'User and all associated profile documents deleted successfully.');
});

// GET /api/admin/statistics
export const getStatistics = asyncHandler(async (req: Request, res: Response) => {
  const db = admin.firestore();

  const [
    totalUsers,
    totalCourses,
    totalCertificates,
    totalProjects,
    studentsCount,
    facultyCount,
    adminsCount
  ] = await Promise.all([
    db.collection('users').count().get().then(s => s.data().count),
    db.collection('courses').count().get().then(s => s.data().count),
    db.collection('certificates').count().get().then(s => s.data().count),
    db.collection('projects').count().get().then(s => s.data().count),
    db.collection('users').where('role', '==', 'student').count().get().then(s => s.data().count),
    db.collection('users').where('role', '==', 'faculty').count().get().then(s => s.data().count),
    db.collection('users').where('role', '==', 'admin').count().get().then(s => s.data().count),
  ]);

  // Aggregate user counts by department
  const usersSnapshot = await db.collection('users').where('profileCompleted', '==', true).get();
  const distribution: Record<string, number> = {};
  
  usersSnapshot.forEach(uDoc => {
    const dept = uDoc.data().department || 'Unassigned';
    distribution[dept] = (distribution[dept] || 0) + 1;
  });

  const departmentDistribution = Object.entries(distribution).map(([_id, count]) => ({ _id, count }));

  return sendResponse(res, 200, true, 'Global system statistics aggregated successfully.', {
    summary: {
      totalUsers,
      totalCourses,
      totalCertificates,
      totalProjects,
      roles: {
        students: studentsCount,
        faculty: facultyCount,
        admins: adminsCount
      }
    },
    departmentDistribution
  });
});
