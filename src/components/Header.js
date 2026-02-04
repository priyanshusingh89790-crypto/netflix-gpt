import { LOGO_URL } from "../utils/constant";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/UserSlice";
import { Bell, Search,Pencil, Settings, HelpCircle, LogOut } from "lucide-react";
import { useLocation } from "react-router-dom";
import { language } from "../utils/constant";



const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
 const isAI = location.pathname === "/aimovie";

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

  return (
    <header className="absolute z-50 bg-gradient-to-b from-black via-black/50 to-transparent h-28 w-full">
      <div className="w-[96%] flex justify-between items-center px-16 pt-4">
        {/* LOGO */}
        <img className="w-44" src={LOGO_URL} alt="logo" />

        {user && (
          <div className="flex items-center gap-6">

            <select className="bg-black text-white p-2 scrollbar-hide rounded-lg cursor-pointer"onchange={handelang}>
              {language.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
            
              <button onClick={() => navigate(isAI ? "/browse" : "/aimovie")}
               className= {isAI ? "text-black text-[15px] hover:bg-white/80 bg-white cursor-pointer px-2 py-1 rounded-lg" : "text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 cursor-pointer text-[15px] px-2 py-1 rounded-lg"}>
            {isAI ?"Back to Home" : "AI Picks"}</button>
            
            <Search className="text-white cursor-pointer hover:text-gray-300" />
            <Bell className="text-white cursor-pointer hover:text-gray-300" />

            {/* PROFILE DROPDOWN */}
            <div className="relative group">
              <img
                src={avatar}
                alt="avatar"
                className="w-10 object-cover h-10 rounded cursor-pointer"
              />

              {/* DROPDOWN */}
              <div
                className="absolute right-0 mt-3 w-56 bg-[#141414]/95 backdrop-blur border border-white/10 rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                {/* PROFILE INFO */}
                <div className="px-4 py-3 border-b border-white/10">
                  <p className="text-sm text-white font-semibold">
                    {user.displayName || "Profile"}
                  </p>
                  <p className="text-xs text-gray-400">{user.email}</p>
                </div>

                {/* MENU */}
                <div className="flex flex-col py-2">
                  <MenuItem label="Manage Profiles" icon={<Pencil />} />
                  <MenuItem label="Account" icon={<Settings />} />
                  <MenuItem label="Help Center" icon={<HelpCircle />} />
                </div>

                {/* SIGN OUT */}
                <div className="border-t border-white/10">
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left flex items-center gap-2 px-5 py-3 text-sm text-white hover:bg-white/10"
                  >
                    <LogOut className="w-6 h-6" /> Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

const MenuItem = ({ label, icon }) => (
  <div className="px-4 py-2 text-sm text-white hover:bg-white/10 cursor-pointer flex items-center gap-2">
    {icon}
    {label}
  </div>
);

export default Header;