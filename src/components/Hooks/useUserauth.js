import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { addUser, removeUser } from "../../utils/UserSlice";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const useUserauth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const location = useLocation();
 
 const user = useSelector((store) => store.user);
const isValidPhoto =
user?.photoURL && !user.photoURL.includes("googleusercontent");


const avatar = isValidPhoto
? user.photoURL
: "/netfliximage.png";

  const handleSignOut = () => {
    signOut(auth).then(() => {
      dispatch(removeUser());
      navigate("/");
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        dispatch(
          addUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
          })
        );
        if (location.pathname === "/") {
        navigate("/browse");
        }
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [dispatch, navigate]);

  return { user, avatar, handleSignOut };
};

export default useUserauth;
