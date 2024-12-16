import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyABPmn9WcViCEG5e-bPCqGGc45xoeSNjC8",
  authDomain: "pilot-87003.firebaseapp.com",
  projectId: "pilot-87003",
  storageBucket: "pilot-87003.firebasestorage.app",
  messagingSenderId: "915637353552",
  appId: "1:915637353552:web:6bb3bbb6eb547ccc30e555",
  measurementId: "G-GXCFGQE7XT"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
