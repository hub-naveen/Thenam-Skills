import { Request, Response } from 'express';
import { admin } from '../config/firebaseAdmin';
import { sendResponse } from '../utils/apiResponse';
import { asyncHandler } from '../utils/asyncHandler';

// GET /api/skills
export const getSkills = asyncHandler(async (req: Request, res: Response) => {
  const { category, search } = req.query;
  const db = admin.firestore();
  
  let query: admin.firestore.Query = db.collection('skills').where('isActive', '==', true);

  if (category) {
    query = query.where('category', '==', category);
  }

  const snapshot = await query.get();
  let skills = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  if (search) {
    const searchLower = (search as string).toLowerCase();
    skills = skills.filter((s: any) => s.name?.toLowerCase().includes(searchLower));
  }

  return sendResponse(res, 200, true, 'Skills retrieved successfully.', skills);
});

// GET /api/skills/:id
export const getSkillById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const db = admin.firestore();

  const doc = await db.collection('skills').doc(id).get();
  if (!doc.exists) {
    return sendResponse(res, 404, false, 'Skill not found.');
  }

  return sendResponse(res, 200, true, 'Skill retrieved successfully.', { id: doc.id, ...doc.data() });
});

// POST /api/skills (Admin only)
export const createSkill = asyncHandler(async (req: Request, res: Response) => {
  const { name, slug, category, description, icon } = req.body;
  const db = admin.firestore();

  const docRef = db.collection('skills').doc(slug);
  const doc = await docRef.get();
  if (doc.exists) {
    return sendResponse(res, 400, false, `Skill with slug "${slug}" already exists.`);
  }

  const skill = {
    name,
    slug,
    category,
    description: description || '',
    icon: icon || '',
    isActive: true,
    createdAt: admin.firestore.Timestamp.now(),
    updatedAt: admin.firestore.Timestamp.now()
  };

  await docRef.set(skill);
  return sendResponse(res, 201, true, 'Skill created successfully.', { id: docRef.id, ...skill });
});

// PUT /api/skills/:id (Admin only)
export const updateSkill = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, slug, category, description, icon, isActive } = req.body;
  const db = admin.firestore();

  const docRef = db.collection('skills').doc(id);
  const doc = await docRef.get();
  if (!doc.exists) {
    return sendResponse(res, 404, false, 'Skill not found.');
  }

  const updates: any = {
    updatedAt: admin.firestore.Timestamp.now()
  };

  if (name) updates.name = name;
  if (slug) updates.slug = slug;
  if (category) updates.category = category;
  if (description !== undefined) updates.description = description;
  if (icon !== undefined) updates.icon = icon;
  if (isActive !== undefined) updates.isActive = isActive;

  await docRef.update(updates);
  return sendResponse(res, 200, true, 'Skill updated successfully.', { id, ...doc.data(), ...updates });
});

// DELETE /api/skills/:id (Admin only)
export const deleteSkill = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const db = admin.firestore();

  const docRef = db.collection('skills').doc(id);
  const doc = await docRef.get();
  if (!doc.exists) {
    return sendResponse(res, 404, false, 'Skill not found.');
  }

  // Soft delete
  await docRef.update({ 
    isActive: false,
    updatedAt: admin.firestore.Timestamp.now()
  });

  return sendResponse(res, 200, true, 'Skill deactivated successfully.');
});
