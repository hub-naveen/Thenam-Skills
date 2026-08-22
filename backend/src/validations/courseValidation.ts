import { z } from 'zod';

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const courseCreateSchema = z.object({
  title: z.string().min(3, 'Course title must be at least 3 characters'),
  description: z.string().min(10, 'Course description must be at least 10 characters'),
  category: z.string().min(2, 'Category is required'),
  skills: z.array(z.string().regex(objectIdRegex, 'Invalid Skill ID in catalog')).min(1, 'Select at least one skill to teach'),
  level: z.enum(['Beginner', 'Intermediate', 'Advanced']),
  duration: z.string().min(2, 'Duration is required (e.g. "4 weeks", "12 hours")'),
  thumbnail: z.string().optional().or(z.literal('')),
  instructor: z.string().min(2, 'Instructor name is required'),
  isPublished: z.boolean().default(true)
});

export const courseUpdateSchema = courseCreateSchema.partial();
