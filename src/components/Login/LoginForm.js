import { useRef, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ switchToSignUp }) => {
  const email = useRef(null);
  const password = useRef(null);

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // 🔴 EMAIL / PASSWORD LOGIN
  const handleEmailLogin = async () => {
    try {
      if (!email.current.value || !password.current.value) {
        setError("Email and password are required");
        return;
      }

      await signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      );

      navigate("/browse");
    } catch (err) {
      console.error(err);
      setError(
        err.code === "auth/operation-not-allowed"
          ? "Email/Password login is disabled"
          : "Invalid email or password"
      );
    }
  };

  // 🟢 GOOGLE LOGIN
  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/browse");
    } catch (err) {
      console.error("Google sign-in error:", err);
      setError(err.message);
    }
  };

  return (
    <form className="flex pt-[90px] pb-[90px] flex-col gap-4 w-[440px] bg-black bg-opacity-80 p-10 rounded-xl text-white">
      <h1 className="text-3xl font-bold mb-4">Sign In</h1>

      <input
        ref={email}
        type="email"
        placeholder="Email"
        className="h-12 rounded-lg mb-8 border border-gray-600 bg-gray-700 px-2"
      />

      <input
        ref={password}
        type="password"
        placeholder="Password"
        className="h-12 rounded-lg mb-8 border border-gray-600 bg-gray-700 px-2"
      />

      {error && <p className="text-red-600 font-bold">{error}</p>}

      {/* Email login */}
      <button
        type="button"
        className="bg-red-600 h-12 rounded-lg mt-2"
        onClick={handleEmailLogin}
      >
        Sign In
      </button>

      {/* Google login */}
      <button
        type="button"
        className="hover:bg-white bg-white/20 hover:text-black h-12 rounded-lg mt-2"
        onClick={handleGoogleSignIn}
      >
        Sign In with Google
      </button>

      <p className="text-sm text-start mt-2">
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
};

export default LoginForm;