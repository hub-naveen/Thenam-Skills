import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../middleware/authMiddleware';
import { admin } from '../config/firebaseAdmin';
import { sendResponse } from '../utils/apiResponse';
import { asyncHandler } from '../utils/asyncHandler';

// Local Helpers for populating courses
async function populateCourse(certificates: any[]) {
  const courseIds = Array.from(new Set(
    certificates.map((c: any) => c.course).filter(Boolean)
  ));
  if (courseIds.length === 0) return certificates;

  const db = admin.firestore();
  const courseRefs = courseIds.map(id => db.collection('courses').doc(id));
  const courseDocs = await db.getAll(...courseRefs);
  const courseMap: Record<string, any> = {};
  courseDocs.forEach(doc => {
    if (doc.exists) {
      courseMap[doc.id] = { id: doc.id, ...doc.data() };
    }
  });

  return certificates.map((c: any) => ({
    ...c,
    course: courseMap[c.course] || { id: c.course, title: c.course }
  }));
}

// GET /api/certificates/me
export const getOwnCertificates = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const user = req.user;
  const db = admin.firestore();

  const snapshot = await db.collection('certificates').where('user', '==', user.firebaseUid).get();
  const rawCertificates = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  const certificates = await populateCourse(rawCertificates);

  return sendResponse(res, 200, true, 'User certificates retrieved successfully.', certificates);
});

// GET /api/certificates/:id
export const getCertificateById = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const db = admin.firestore();

  const doc = await db.collection('certificates').doc(id).get();
  if (!doc.exists) {
    return sendResponse(res, 404, false, 'Certificate not found.');
  }

  const certificate = { id: doc.id, ...doc.data() };
  const populated = (await populateCourse([certificate]))[0];

  return sendResponse(res, 200, true, 'Certificate retrieved successfully.', populated);
});

// GET /api/certificates/verify/:verificationCode
export const verifyCertificate = asyncHandler(async (req: Request, res: Response) => {
  const { verificationCode } = req.params;
  const db = admin.firestore();

  const snapshot = await db.collection('certificates')
    .where('verificationCode', '==', verificationCode)
    .limit(1)
    .get();

  if (snapshot.empty) {
    return sendResponse(res, 404, false, 'Certificate verification failed. Code is invalid or matching record was not found.', {
      status: 'invalid'
    });
  }

  const certDoc = snapshot.docs[0];
  const certificate: any = { id: certDoc.id, ...certDoc.data() };

  // Fetch student user and course in parallel
  const [studentDoc, courseDoc] = await Promise.all([
    db.collection('users').doc(certificate.user).get(),
    db.collection('courses').doc(certificate.course).get()
  ]);

  const student = studentDoc.exists ? studentDoc.data() : null;
  const course = courseDoc.exists ? courseDoc.data() : null;

  // Format public-safe verification details (excluding DOB/phone)
  const verificationReport = {
    status: 'verified',
    certificateTitle: certificate.title,
    certificateNumber: certificate.certificateNumber,
    studentName: student ? student.name : 'Unknown Student',
    college: student ? student.collegeName : 'DMI College of Engineering',
    courseName: course ? course.title : 'Official Program',
    issueDate: certificate.issuedAt?.toDate ? certificate.issuedAt.toDate() : certificate.issuedAt,
    verificationCode: certificate.verificationCode
  };

  return sendResponse(res, 200, true, 'Certificate verified successfully.', verificationReport);
});
