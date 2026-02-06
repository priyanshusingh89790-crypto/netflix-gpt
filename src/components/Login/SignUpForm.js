import { useRef, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../../utils/firebase";
import { useNavigate } from "react-router-dom";

const SignUpForm = ({ switchToSignIn }) => {
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // 🔴 EMAIL / PASSWORD SIGNUP
  const handleEmailSignUp = async () => {
    try {
      if (!email.current.value || !password.current.value) {
        setError("Email and password are required");
        return;
      }

      const userCred = await createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      );

      await setDoc(doc(db, "users", userCred.user.uid), {
        name: name.current.value,
        email: userCred.user.email,
        createdAt: new Date(),
      });

      navigate("/browse");
    } catch (err) {
      console.error(err);
      setError(
        err.code === "auth/operation-not-allowed"
          ? "Email/Password login is disabled in Firebase"
          : err.message
      );
    }
  };

  // 🟢 GOOGLE SIGNUP
  const handleGoogleSignUp = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userRef = doc(db, "users", user.uid);
      const snap = await getDoc(userRef);

      if (!snap.exists()) {
        await setDoc(userRef, {
          name: name.current?.value || user.displayName,
          email: user.email,
          createdAt: new Date(),
        });
      }

      navigate("/browse");
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <form className="flex flex-col gap-4 w-[350px] md:w-[450px] lg:w-[450px] bg-black bg-opacity-80 lg:p-10 p-5 md:p-10 lg:pt-[90px] lg:pb-[90px] pt-[60px] pb-[60px] rounded-xl text-white">
      <h1 className="text-3xl font-bold mb-4">Sign Up</h1>

      <input
        ref={name}
        type="text"
        placeholder="Name"
        className="h-12 rounded-lg mb-8 border border-gray-600 bg-gray-700 px-2"
      />

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

      {/* Email signup */}
      <button
        type="button"
        className="bg-red-600 h-12 rounded-lg mt-2"
        onClick={handleEmailSignUp}
      >
        Sign Up
      </button>

      {/* Google signup */}
      <button
        type="button"
        className="hover:bg-white bg-white/20 hover:text-black h-12 rounded-lg mt-2"
        onClick={handleGoogleSignUp}
      >
        Sign Up with Google
      </button>

      <p className="text-sm mt-2">
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
};

export default SignUpForm;