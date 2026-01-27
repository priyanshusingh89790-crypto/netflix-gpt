// src/components/AuthPage.js
import { useState } from "react";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
import { BACKGROUND_URL } from "../../utils/constant";

export default function AuthPage() {
  const [showSignUp, setShowSignUp] = useState(true);

  return (
    <div className="relative h-screen w-screen">
      {/* Background Image */}
      <div className="w-screen h-screen fixed">
        <img className="w-full h-full object-cover" src={BACKGROUND_URL} alt="background" />
      </div>
      <div className="absolute bg-black/40 w-full h-full flex justify-center items-center">
        {showSignUp ? (
          <SignUpForm switchToSignIn={() => setShowSignUp(false)} />
        ) : (
          <LoginForm switchToSignUp={() => setShowSignUp(true)} />
        )}
      </div>
    </div>
  );
}
