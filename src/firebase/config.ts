import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
export const firebaseConfig = {
  apiKey: "REMOVED_API_KEY",
  authDomain: "thenamskills.firebaseapp.com",
  projectId: "thenamskills",
  storageBucket: "thenamskills.firebasestorage.app",
  messagingSenderId: "660964432008",
  appId: "1:660964432008:web:4ad5d11ac73915d61ee73d",
  measurementId: "G-MBF7G5QMNK"
};

export const app = initializeApp(firebaseConfig);
// Analytics might not be supported in some environments (like dev without proper config), so it's good to keep it optional or just export it.
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
export const auth = getAuth(app);

export const isFirebaseConfigured = true;
export const googleProvider = new GoogleAuthProvider();
