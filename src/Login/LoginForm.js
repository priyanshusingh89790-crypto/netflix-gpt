// src/components/LoginForm.js
import { useRef, useState } from "react";
import { auth, googleProvider } from "../utils/firebase";
import {
  signInWithPopup,
  signInWithEmailAndPassword
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function LoginForm({ switchToSignUp }) {
  const email = useRef(null);
  const password = useRef(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // ✅ EMAIL / PASSWORD LOGIN
  const handleEmailLogin = async () => {
    try {
      const emailVal = email.current.value;
      const passVal = password.current.value;

      await signInWithEmailAndPassword(auth, emailVal, passVal);

      console.log("User signed in:", emailVal);
      navigate("/browse"); // ✅ redirect after success
    } catch (err) {
      console.error("Email login error:", err.code);
      setError("Invalid email or password");
    }
  };

  // ✅ GOOGLE LOGIN
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Google user:", result.user.email);
      navigate("/browse"); // ✅ redirect after success
    } catch (err) {
      console.log("Google sign-in error:", err);
      setError("Google sign-in failed");
    }
  };

  return (
    <form className="flex pt-[90px] pb-[90px] flex-col gap-4 w-96 bg-black bg-opacity-80 p-10 rounded-xl text-white">
      <h1 className="text-3xl font-bold mb-4">Sign In</h1>

      <input
        ref={email}
        type="email"
        placeholder="Email"
        className="h-12 rounded-lg border border-gray-600 bg-gray-700 px-2"
      />

      <input
        ref={password}
        type="password"
        placeholder="Password"
        className="h-12 rounded-lg border border-gray-600 bg-gray-700 px-2"
      />

      {error && <p className="text-red-600 font-bold">{error}</p>}

      <button
        type="button"
        className="bg-red-600 h-12 rounded-lg mt-2"
        onClick={handleEmailLogin}
      >
        Sign In
      </button>

      <button
        type="button"
        className="bg-blue-600 h-12 rounded-lg mt-6"
        onClick={handleGoogleSignIn}
      >
        Sign In with Google
      </button>

      <p className="text-sm text-center mt-2">
        New user?{" "}
        <span
          className="underline cursor-pointer"
          onClick={switchToSignUp}
        >
          Sign Up
        </span>
      </p>
    </form>
  );
}
