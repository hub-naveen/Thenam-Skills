import admin from 'firebase-admin';
import { env } from './env';

const initializeFirebase = () => {
  const { FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } = env;

  if (!FIREBASE_PROJECT_ID || !FIREBASE_CLIENT_EMAIL || !FIREBASE_PRIVATE_KEY) {
    console.error('CRITICAL: Firebase Admin credentials (email, privateKey, projectId) are not fully configured in the environment variables.');
    throw new Error('Firebase Admin Configuration Error: Missing required service account credentials.');
  }

  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: FIREBASE_PROJECT_ID,
        clientEmail: FIREBASE_CLIENT_EMAIL,
        privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      }),
    });
    console.log('Firebase Admin SDK initialized successfully.');
  } catch (error) {
    console.error('Error initializing Firebase Admin SDK:', error);
    throw error;
  }
};

initializeFirebase();

export { admin };
export default admin;
