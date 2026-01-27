import { LOGO_URL } from "../utils/constant";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/UserSlice";
import { signOut } from "firebase/auth";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
const avatar = user?.photoURL || "/netfliximage.png";

  const handleSignOut = () => {
    signOut(auth).then(() => {
      dispatch(removeUser());
      navigate("/");
    }).catch((error) => {
      console.log(error);
    });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        dispatch(
          addUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [dispatch, navigate]);

  return (
    <header className="absolute z-50 bg-gradient-to-b from-black  via-black/50 to-transparent h-28 w-full">
      <div className="w-[96%] flex justify-between">
        <img
          className="w-80 ml-20"
          src={LOGO_URL}
          alt="logo"
        />
        {user && (
          <div className="flex flex-col pt-5 items-center">
            <img src={avatar} alt="avatar" className="w-12 h-12 rounded-lg" />
            <button onClick={handleSignOut} className="text-white px-4 py-2 rounded-md">
              Sign Out
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;