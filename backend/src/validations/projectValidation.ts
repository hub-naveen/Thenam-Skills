import { z } from 'zod';

const objectIdRegex = /^[0-9a-fA-F]{24}$/;
const githubRegex = /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+\/?$/i;

export const projectCreateSchema = z.object({
  title: z.string().min(2, 'Project title must be at least 2 characters'),
  description: z.string().min(5, 'Project description must be at least 5 characters'),
  technologies: z.array(z.string().regex(objectIdRegex, 'Invalid technology Skill ID')).min(1, 'Select at least one technology'),
  githubURL: z.string().url('Invalid GitHub URL').regex(githubRegex, 'Must be a valid GitHub repository URL').optional().or(z.literal('')),
  liveURL: z.string().url('Invalid Live Demo URL').optional().or(z.literal('')),
  imageURL: z.string().optional().or(z.literal('')),
  status: z.string().default('In Progress')
});

export const projectUpdateSchema = projectCreateSchema.partial();
