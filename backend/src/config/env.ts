import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

export const env = {
  PORT: parseInt(process.env.PORT || '5000', 10),
  NODE_ENV: process.env.NODE_ENV || 'development',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:3001',
  FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID || 'thenamskills',
  FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL || '',
  FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY || '',
  MONGODB_URI: process.env.MONGODB_URI || '',
};
