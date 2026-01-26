// src/utils/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUNJOFAs5g3KEzYpqOedAUplp1V3LQwKE",
  authDomain: "netflix-ai-d81ab.firebaseapp.com",
  projectId: "netflix-ai-d81ab",
  storageBucket: "netflix-ai-d81ab.firebasestorage.app",
  messagingSenderId: "227896718504",
  appId: "1:227896718504:web:3826f1db20b6280317be9d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Firebase Auth instance
export const auth = getAuth(app);

// Google Auth provider (for Google Sign-In)
export const googleProvider = new GoogleAuthProvider();

// Firestore database instance
export const db = getFirestore(app);
