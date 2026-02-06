import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBUNJOFAs5g3KEzYpqOedAUplp1V3LQwKE",
  authDomain: "netflix-ai-d81ab.firebaseapp.com",
  projectId: "netflix-ai-d81ab",
  storageBucket: "netflix-ai-d81ab.firebasestorage.app",
  messagingSenderId: "227896718504",
  appId: "1:227896718504:web:3826f1db20b6280317be9d"
};

const app = initializeApp(firebaseConfig);

isSupported().then((supported) => {
  if (supported) getAnalytics(app);
});

export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
