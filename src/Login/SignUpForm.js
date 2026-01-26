// src/components/SignUpForm.js
import { useRef, useState } from "react";
import { db } from "../utils/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import checkdata from "../utils/validData";
import { useNavigate } from "react-router-dom";

export default function SignUpForm({ switchToSignIn }) {
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignUp = async () => {
    const emailVal = email.current.value;
    const passVal = password.current.value;
    const nameVal = name.current.value;

    const message = checkdata(emailVal, passVal);
    if (message) {
      setError(message);
      return;
    }

    try {
      // 🔥 Save user to Firestore
      await addDoc(collection(db, "users"), {
        name: nameVal,
        email: emailVal,
        createdAt: serverTimestamp(),
      });

      console.log("User saved successfully");

      // ✅ Navigate ONLY after success
      navigate("/browse");
    } catch (err) {
      console.error("Firestore save error:", err);
      setError("Failed to save user data");
    }
  };

  return (
    <form className="flex flex-col gap-4 w-[450px] bg-black bg-opacity-80 p-10 pt-[90px] pb-[90px] rounded-xl text-white">
      <h1 className="text-3xl font-bold mb-4">Sign Up</h1>

      <input
        ref={name}
        type="text"
        placeholder="Name"
        className="h-12 rounded-lg border border-gray-600 mb-10 bg-gray-700 px-2"
      />

      <input
        ref={email}
        type="email"
        placeholder="Email"
        className="h-12 rounded-lg border border-gray-600 mb-10 bg-gray-700 px-2"
      />

      <input
        ref={password}
        type="password"
        placeholder="Password"
        className="h-12 rounded-lg border border-gray-600 mb-10 bg-gray-700 px-2"
      />

      {error && <p className="text-red-600 font-bold">{error}</p>}

      <button
        type="button"
        className="bg-red-600 h-12 rounded-lg mt-2"
        onClick={handleSignUp}
      >
        Sign Up
      </button>

      <p className="text-sm">
        Already have an account?{" "}
        <span
          className="underline cursor-pointer"
          onClick={switchToSignIn}
        >
          Sign In
        </span>
      </p>
    </form>
  );
}
