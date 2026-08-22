import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/authMiddleware';
import { admin } from '../config/firebaseAdmin';
import { sendResponse } from '../utils/apiResponse';
import { asyncHandler } from '../utils/asyncHandler';

// Local Helpers for populating technologies
async function populateTechnologies(projects: any[]) {
  const skillIds = Array.from(new Set(
    projects.flatMap((p: any) => p.technologies || [])
  )).filter(Boolean);

  if (skillIds.length === 0) return projects;

  const db = admin.firestore();
  const skillRefs = skillIds.map(id => db.collection('skills').doc(id));
  const skillDocs = await db.getAll(...skillRefs);
  const skillMap: Record<string, any> = {};
  skillDocs.forEach(doc => {
    if (doc.exists) {
      skillMap[doc.id] = { id: doc.id, ...doc.data() };
    }
  });

  return projects.map((p: any) => ({
    ...p,
    technologies: (p.technologies || []).map((id: string) => skillMap[id] || { id, name: id })
  }));
}

// GET /api/projects/me
export const getOwnProjects = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const user = req.user;
  const db = admin.firestore();

  const snapshot = await db.collection('projects').where('user', '==', user.firebaseUid).get();
  const rawProjects = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  const projects = await populateTechnologies(rawProjects);

  return sendResponse(res, 200, true, 'User projects retrieved successfully.', projects);
});

// GET /api/projects/:id
export const getProjectById = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const db = admin.firestore();

  const doc = await db.collection('projects').doc(id).get();
  if (!doc.exists) {
    return sendResponse(res, 404, false, 'Project not found.');
  }

  const project = { id: doc.id, ...doc.data() };
  const populated = (await populateTechnologies([project]))[0];

  return sendResponse(res, 200, true, 'Project retrieved successfully.', populated);
});

// POST /api/projects
export const createProject = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const user = req.user;
  const { title, description, technologies, githubURL, liveURL, imageURL, status } = req.body;
  const db = admin.firestore();

  const projectRef = db.collection('projects').doc();
  const project = {
    user: user.firebaseUid,
    title,
    description: description || '',
    technologies: technologies || [],
    githubURL: githubURL || '',
    liveURL: liveURL || '',
    imageURL: imageURL || '',
    status: status || 'In Progress',
    createdAt: admin.firestore.Timestamp.now(),
    updatedAt: admin.firestore.Timestamp.now()
  };

  await projectRef.set(project);

  // Increment projectsCount in User profile
  const userRef = db.collection('users').doc(user.firebaseUid);
  await db.runTransaction(async (transaction) => {
    const uDoc = await transaction.get(userRef);
    if (uDoc.exists) {
      const pCount = uDoc.data()?.projectsCount || 0;
      transaction.update(userRef, { projectsCount: pCount + 1 });
    }
  });

  // Log activity feed
  const activityRef = db.collection('activities').doc();
  const activity = {
    user: user.firebaseUid,
    type: 'project_publish',
    title: `Published project: ${title}`,
    description: `Added a new project to portfolio showing skills in building real-world software.`,
    metadata: { projectId: projectRef.id },
    createdAt: admin.firestore.Timestamp.now()
  };
  await activityRef.set(activity);

  return sendResponse(res, 201, true, 'Project created successfully.', { id: projectRef.id, ...project });
});

// PUT /api/projects/:id
export const updateProject = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const user = req.user;
  const updates = req.body;
  const db = admin.firestore();

  const docRef = db.collection('projects').doc(id);
  const doc = await docRef.get();
  if (!doc.exists) {
    return sendResponse(res, 404, false, 'Project not found.');
  }

  const projectData = doc.data() || {};

  // Ensure user owns this project record
  if (projectData.user !== user.firebaseUid) {
    return sendResponse(res, 403, false, 'Access Denied. You do not own this project.');
  }

  const cleanUpdates: any = {
    updatedAt: admin.firestore.Timestamp.now()
  };

  if (updates.title) cleanUpdates.title = updates.title;
  if (updates.description) cleanUpdates.description = updates.description;
  if (updates.technologies) cleanUpdates.technologies = updates.technologies;
  if (updates.githubURL !== undefined) cleanUpdates.githubURL = updates.githubURL;
  if (updates.liveURL !== undefined) cleanUpdates.liveURL = updates.liveURL;
  if (updates.imageURL !== undefined) cleanUpdates.imageURL = updates.imageURL;
  if (updates.status) cleanUpdates.status = updates.status;

  await docRef.update(cleanUpdates);
  const finalDoc = await docRef.get();

  const finalProject = { id: finalDoc.id, ...finalDoc.data() };
  const populated = (await populateTechnologies([finalProject]))[0];

  return sendResponse(res, 200, true, 'Project updated successfully.', populated);
});

// DELETE /api/projects/:id
export const deleteProject = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const user = req.user;
  const db = admin.firestore();

  const docRef = db.collection('projects').doc(id);
  const doc = await docRef.get();
  if (!doc.exists) {
    return sendResponse(res, 404, false, 'Project not found.');
  }

  const projectData = doc.data() || {};

  // Ensure user owns this project record
  if (projectData.user !== user.firebaseUid) {
    return sendResponse(res, 403, false, 'Access Denied. You do not own this project.');
  }

  await docRef.delete();

  // Decrement projectsCount in User profile
  const userRef = db.collection('users').doc(user.firebaseUid);
  await db.runTransaction(async (transaction) => {
    const uDoc = await transaction.get(userRef);
    if (uDoc.exists) {
      const pCount = uDoc.data()?.projectsCount || 0;
      transaction.update(userRef, { projectsCount: Math.max(0, pCount - 1) });
    }
  });

  return sendResponse(res, 200, true, 'Project deleted successfully.');
});
