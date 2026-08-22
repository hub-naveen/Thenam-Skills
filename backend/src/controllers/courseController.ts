import { Response } from 'express';
import crypto from 'crypto';
import { AuthenticatedRequest } from '../middleware/authMiddleware';
import { admin } from '../config/firebaseAdmin';
import { sendResponse } from '../utils/apiResponse';
import { asyncHandler } from '../utils/asyncHandler';

// Local Helpers for populating skills
async function populateSkills(courses: any[]) {
  const skillIds = Array.from(new Set(
    courses.flatMap((c: any) => c.skills || [])
  )).filter(Boolean);

  if (skillIds.length === 0) return courses;

  const db = admin.firestore();
  const skillRefs = skillIds.map(id => db.collection('skills').doc(id));
  const skillDocs = await db.getAll(...skillRefs);
  const skillMap: Record<string, any> = {};
  skillDocs.forEach(doc => {
    if (doc.exists) {
      skillMap[doc.id] = { id: doc.id, ...doc.data() };
    }
  });

  return courses.map((c: any) => ({
    ...c,
    skills: (c.skills || []).map((id: string) => skillMap[id] || { id, name: id })
  }));
}

// GET /api/courses
export const getCourses = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const user = req.user;
  const db = admin.firestore();
  
  let query: admin.firestore.Query = db.collection('courses');

  // If not admin or faculty, only view published courses
  const isElevated = user && (user.role === 'admin' || user.role === 'faculty');
  if (!isElevated) {
    query = query.where('isPublished', '==', true);
  }

  const snapshot = await query.get();
  const rawCourses = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  const courses = await populateSkills(rawCourses);

  return sendResponse(res, 200, true, 'Courses retrieved successfully.', courses);
});

// GET /api/courses/:id
export const getCourseById = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const db = admin.firestore();

  const doc = await db.collection('courses').doc(id).get();
  if (!doc.exists) {
    return sendResponse(res, 404, false, 'Course not found.');
  }

  const course = { id: doc.id, ...doc.data() };
  const populated = (await populateSkills([course]))[0];

  return sendResponse(res, 200, true, 'Course retrieved successfully.', populated);
});

// POST /api/courses (Admin/Faculty only)
export const createCourse = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { title, description, category, skills, level, duration, thumbnail, instructor, isPublished } = req.body;
  const db = admin.firestore();

  const docRef = db.collection('courses').doc();
  const course = {
    title,
    description,
    category,
    skills: skills || [],
    level,
    duration,
    thumbnail: thumbnail || '',
    instructor: instructor || { name: 'Faculty', role: 'Instructor', organization: 'THENAM', avatar: '' },
    isPublished: isPublished !== undefined ? isPublished : true,
    createdAt: admin.firestore.Timestamp.now(),
    updatedAt: admin.firestore.Timestamp.now()
  };

  await docRef.set(course);
  return sendResponse(res, 201, true, 'Course created successfully.', { id: docRef.id, ...course });
});

// PUT /api/courses/:id (Admin/Faculty only)
export const updateCourse = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const updates = req.body;
  const db = admin.firestore();

  const docRef = db.collection('courses').doc(id);
  const doc = await docRef.get();
  if (!doc.exists) {
    return sendResponse(res, 404, false, 'Course not found.');
  }

  const cleanUpdates = {
    ...updates,
    updatedAt: admin.firestore.Timestamp.now()
  };

  await docRef.update(cleanUpdates);
  return sendResponse(res, 200, true, 'Course updated successfully.', { id, ...doc.data(), ...cleanUpdates });
});

// DELETE /api/courses/:id (Admin/Faculty only)
export const deleteCourse = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const db = admin.firestore();

  const docRef = db.collection('courses').doc(id);
  const doc = await docRef.get();
  if (!doc.exists) {
    return sendResponse(res, 404, false, 'Course not found.');
  }

  const batch = db.batch();
  batch.delete(docRef);

  // Delete all associated enrollments in Firestore
  const enrollmentsSnapshot = await db.collection('enrollments').where('course', '==', id).get();
  enrollmentsSnapshot.docs.forEach(eDoc => {
    batch.delete(eDoc.ref);
  });

  await batch.commit();
  return sendResponse(res, 200, true, 'Course deleted successfully.');
});

// POST /api/courses/:id/enroll
export const enrollInCourse = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { id: courseId } = req.params;
  const user = req.user;

  if (!user || !user.firebaseUid) {
    return sendResponse(res, 401, false, 'User must be authenticated.');
  }

  const db = admin.firestore();
  const courseDoc = await db.collection('courses').doc(courseId).get();
  if (!courseDoc.exists) {
    return sendResponse(res, 404, false, 'Course not found.');
  }

  const course = courseDoc.data() || {};
  const enrollmentId = `${user.firebaseUid}_${courseId}`;
  const enrollmentRef = db.collection('enrollments').doc(enrollmentId);
  const enrollmentDoc = await enrollmentRef.get();

  if (enrollmentDoc.exists) {
    return sendResponse(res, 400, false, 'You are already enrolled in this course.');
  }

  const enrollment = {
    user: user.firebaseUid,
    course: courseId,
    progress: 0,
    status: 'enrolled',
    startedAt: admin.firestore.Timestamp.now(),
    createdAt: admin.firestore.Timestamp.now(),
    updatedAt: admin.firestore.Timestamp.now()
  };

  await enrollmentRef.set(enrollment);

  // Log Activity
  const activityRef = db.collection('activities').doc();
  const activity = {
    user: user.firebaseUid,
    type: 'enrollment',
    title: `Enrolled in ${course.title}`,
    description: `Started learning ${course.title} to master course competencies.`,
    metadata: { courseId },
    createdAt: admin.firestore.Timestamp.now()
  };
  await activityRef.set(activity);

  return sendResponse(res, 201, true, 'Enrolled in course successfully.', { id: enrollmentId, ...enrollment });
});

// GET /api/courses/:id/progress
export const getProgress = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { id: courseId } = req.params;
  const user = req.user;
  const db = admin.firestore();

  const enrollmentId = `${user.firebaseUid}_${courseId}`;
  const enrollmentDoc = await db.collection('enrollments').doc(enrollmentId).get();
  if (!enrollmentDoc.exists) {
    return sendResponse(res, 404, false, 'Enrollment record not found for this course.');
  }

  return sendResponse(res, 200, true, 'Enrollment progress retrieved.', { id: enrollmentDoc.id, ...enrollmentDoc.data() });
});

// PUT /api/courses/:id/progress
export const updateProgress = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { id: courseId } = req.params;
  const { progress } = req.body;
  const user = req.user;
  const db = admin.firestore();

  const enrollmentId = `${user.firebaseUid}_${courseId}`;
  const enrollmentRef = db.collection('enrollments').doc(enrollmentId);
  const enrollmentDoc = await enrollmentRef.get();
  if (!enrollmentDoc.exists) {
    return sendResponse(res, 404, false, 'Enrollment record not found.');
  }

  const finalProgress = Math.min(100, Math.max(0, progress));
  const updates: any = {
    progress: finalProgress,
    updatedAt: admin.firestore.Timestamp.now()
  };

  if (finalProgress === 100 && enrollmentDoc.data()?.status !== 'completed') {
    updates.status = 'completed';
    updates.completedAt = admin.firestore.Timestamp.now();
  } else if (finalProgress > 0 && enrollmentDoc.data()?.status === 'enrolled') {
    updates.status = 'in-progress';
  }

  await enrollmentRef.update(updates);
  const finalDoc = await enrollmentRef.get();

  return sendResponse(res, 200, true, 'Course progress updated successfully.', { id: finalDoc.id, ...finalDoc.data() });
});

// POST /api/courses/:id/complete
export const completeCourse = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { id: courseId } = req.params;
  const user = req.user;

  if (!user || !user.firebaseUid) {
    return sendResponse(res, 401, false, 'User must be authenticated.');
  }

  const db = admin.firestore();
  
  // 1. Fetch course details
  const courseDoc = await db.collection('courses').doc(courseId).get();
  if (!courseDoc.exists) {
    return sendResponse(res, 404, false, 'Course not found.');
  }
  const course = courseDoc.data() || {};

  // 2. Fetch enrollment
  const enrollmentId = `${user.firebaseUid}_${courseId}`;
  const enrollmentRef = db.collection('enrollments').doc(enrollmentId);
  const enrollmentDoc = await enrollmentRef.get();

  if (enrollmentDoc.exists && enrollmentDoc.data()?.status === 'completed') {
    // Find existing certificate to prevent duplicate issues
    const certSnapshot = await db.collection('certificates')
      .where('user', '==', user.firebaseUid)
      .where('course', '==', courseId)
      .limit(1)
      .get();
    const cert = certSnapshot.empty ? null : { id: certSnapshot.docs[0].id, ...certSnapshot.docs[0].data() };
    return sendResponse(res, 200, true, 'Course already completed.', { enrollment: { id: enrollmentId, ...enrollmentDoc.data() }, certificate: cert });
  }

  try {
    const certData = await db.runTransaction(async (transaction) => {
      // Fetch User document inside transaction
      const userRef = db.collection('users').doc(user.firebaseUid);
      const uDoc = await transaction.get(userRef);
      if (!uDoc.exists) {
        throw new Error('User record not found during transaction.');
      }
      const userData = uDoc.data() || {};

      // Save/Update Enrollment
      const finalEnrollment = {
        user: user.firebaseUid,
        course: courseId,
        progress: 100,
        status: 'completed',
        startedAt: enrollmentDoc.exists ? (enrollmentDoc.data()?.startedAt || admin.firestore.Timestamp.now()) : admin.firestore.Timestamp.now(),
        completedAt: admin.firestore.Timestamp.now(),
        updatedAt: admin.firestore.Timestamp.now()
      };
      transaction.set(enrollmentRef, finalEnrollment);

      // Calculate XP Rewards
      const xpReward = 150; // 100 Base + 50 Completion Bonus
      
      // Add skills to student profile
      const existingSkills = userData.skills || [];
      const newSkills = course.skills || [];
      const mergedSkillsSet = new Set([...existingSkills, ...newSkills]);

      // Update User counters
      const updatedUser = {
        xp: (userData.xp || 0) + xpReward,
        coursesCompleted: (userData.coursesCompleted || 0) + 1,
        certificatesCount: (userData.certificatesCount || 0) + 1,
        skills: Array.from(mergedSkillsSet),
        streak: (userData.streak || 0) + 1,
        updatedAt: admin.firestore.Timestamp.now()
      };
      transaction.update(userRef, updatedUser);

      // Issue Verified Certificate Record
      const certId = db.collection('certificates').doc().id;
      const certRef = db.collection('certificates').doc(certId);
      const certificateNumber = `CERT-${crypto.randomInt(100000, 999999)}`;
      const verificationCode = crypto.randomBytes(6).toString('hex').toUpperCase();
      const certificateURL = `https://thenamskills.web.app/verify/${verificationCode}`;

      const certificate = {
        user: user.firebaseUid,
        course: courseId,
        certificateNumber,
        title: `${course.title} Competency Certificate`,
        issuedAt: admin.firestore.Timestamp.now(),
        verificationCode,
        certificateURL,
        createdAt: admin.firestore.Timestamp.now()
      };
      transaction.set(certRef, certificate);

      // Grant Achievement Badge
      const achievementId = db.collection('achievements').doc().id;
      const achievementRef = db.collection('achievements').doc(achievementId);
      const achievement = {
        user: user.firebaseUid,
        title: `${course.title} Graduate`,
        description: `Successfully completed the course: ${course.title}`,
        type: 'course_completion',
        icon: 'award',
        xp: xpReward,
        earnedAt: admin.firestore.Timestamp.now()
      };
      transaction.set(achievementRef, achievement);

      // Create Feed Activity Log
      const activityId = db.collection('activities').doc().id;
      const activityRef = db.collection('activities').doc(activityId);
      const activity = {
        user: user.firebaseUid,
        type: 'course_completion',
        title: `Earned Certificate in ${course.title}`,
        description: `Graduated from ${course.title} and mastered key curriculum competencies.`,
        metadata: {
          courseId,
          certificateId: certId,
          xpPoints: xpReward
        },
        createdAt: admin.firestore.Timestamp.now()
      };
      transaction.set(activityRef, activity);

      // Issue In-app Notification
      const notificationId = db.collection('notifications').doc().id;
      const notificationRef = db.collection('notifications').doc(notificationId);
      const notification = {
        user: user.firebaseUid,
        title: 'Course Completed! 🎉',
        message: `Congratulations! You completed ${course.title} and earned +${xpReward} XP.`,
        type: 'achievement',
        read: false,
        createdAt: admin.firestore.Timestamp.now()
      };
      transaction.set(notificationRef, notification);

      return {
        enrollment: finalEnrollment,
        certificate: { id: certId, ...certificate },
        xpGained: xpReward,
        skillsAdded: course.skills
      };
    });

    console.log(`Course completion automation completed for student ${user.firebaseUid} on course ${courseId}`);

    return sendResponse(res, 201, true, 'Course completed and rewards issued successfully.', certData);
  } catch (error: any) {
    console.error('Course completion transaction failed:', error);
    return res.status(500).json({ success: false, message: error.message || 'Course completion failed.' });
  }
});
