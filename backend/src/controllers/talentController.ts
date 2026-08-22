import { Request, Response } from 'express';
import { admin } from '../config/firebaseAdmin';
import { sendResponse } from '../utils/apiResponse';
import { asyncHandler } from '../utils/asyncHandler';

// GET /api/talent
export const getTalents = asyncHandler(async (req: Request, res: Response) => {
  const { skill, department, year, college, city, search } = req.query;
  const db = admin.firestore();

  let query: admin.firestore.Query = db.collection('users').where('profileCompleted', '==', true);

  if (department && department !== 'all') {
    query = query.where('department', '==', department);
  }
  if (year && year !== 'all') {
    query = query.where('year', '==', year);
  }
  if (college && college !== 'all') {
    query = query.where('collegeName', '==', college);
  }
  if (city && city !== 'all') {
    query = query.where('collegeLocation.city', '==', city);
  }

  const snapshot = await query.get();
  let talents = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  // In-memory filters for search queries
  if (search) {
    const searchLower = (search as string).toLowerCase();
    talents = talents.filter((student: any) => 
      (student.name || '').toLowerCase().includes(searchLower) ||
      (student.collegeName || '').toLowerCase().includes(searchLower) ||
      (student.department || '').toLowerCase().includes(searchLower)
    );
  }

  // Filter by skill ID or name if provided
  if (skill && skill !== 'all' && skill !== 'All Skills') {
    const skillLower = (skill as string).toLowerCase();
    talents = talents.filter((student: any) =>
      (student.skills || []).some((s: any) => 
        (s.name || s || '').toLowerCase() === skillLower ||
        (s.id || s || '') === skillLower
      )
    );
  }

  // Format public profile data (do NOT return dateOfBirth or phoneNumber)
  const publicTalents = talents.map((student: any) => ({
    id: student.firebaseUid,
    name: student.name,
    photoURL: student.photoURL || '',
    avatar: student.photoURL || '',
    headline: `${student.year || 'Student'} - ${student.department || 'Engineering'}`,
    collegeName: student.collegeName || '',
    college: student.collegeName || '',
    department: student.department || '',
    year: student.year || '',
    yearOfStudy: student.year || '',
    skills: student.skills || [],
    location: student.collegeLocation?.city 
      ? `${student.collegeLocation.city}, ${student.collegeLocation.state}` 
      : 'Chennai, India',
    collegeLocation: student.collegeLocation,
    xp: student.xp || 0,
    metrics: {
      coursesCompleted: student.coursesCompleted || 0,
      certificatesCount: student.certificatesCount || 0,
      projectsCount: student.projectsCount || 0,
      xpPoints: student.xp || 0,
      streakDays: student.streak || 0
    }
  }));

  return sendResponse(res, 200, true, 'Talent candidate listings retrieved successfully.', publicTalents);
});
export default getTalents;
