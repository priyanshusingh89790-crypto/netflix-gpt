import { LOGO_URL } from "../utils/constant";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import {Bell,Search,Pencil,Settings,HelpCircle,LogOut,} from "lucide-react";
import { language } from "../utils/constant";
import { changelanguage } from "../utils/langslice";
import useUserauth from "./Hooks/useUserauth";
import { useSelector } from "react-redux";

const Header = () => {
  const { user, avatar, handleSignOut } = useUserauth();
  const langkey = useSelector((store) => store.config.language);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const isAI = location.pathname === "/aimovie";

  const handleLanguageChange = (e) => {
    dispatch(changelanguage(e.target.value));
  };

  return (
    <header className="absolute z-50 bg-gradient-to-b from-black via-black/50 to-transparent h-28 w-full">
      <div className="w-full flex justify-between px-0 items-center lg:px-16 pt-4">
        <img className="lg:w-44 w-36" src={LOGO_URL} alt="logo" />

        {user && (
          <div className="flex items-center lg:pr-0 pr-5 gap-2 lg:gap-6 justify-end w-full">
            <select value={langkey} className="bg-black lg:w-[150px] w-[90px] lg:text-[15px] text-[13px] text-white p-2 scrollbar-hide border border-white/10 rounded-lg cursor-pointer" onChange={handleLanguageChange}>
  {language.map((lang) => ( <option key={lang.code} value={lang.code}>   {lang.name}
    </option>
  ))}</select>
           <div className="sm:block hidden">
            <button
              onClick={() => navigate(isAI ? "/browse" : "/aimovie")}
              className={
                isAI
                  ? "text-black lg:text-[15px] text-[13px] hover:bg-white/80 bg-white cursor-pointer px-2 py-1 rounded-lg"
                  : "text-white lg:text-[15px] text-[13px] bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 cursor-pointer px-2 py-1 rounded-lg"
              }
            >
              {isAI ? "Back to Home" : "AI Picks"}
            </button>
            </div>
            <Search className="text-white cursor-pointer hover:text-gray-300" />
            <Bell className="text-white cursor-pointer hover:text-gray-300" />

            <div className="relative group">
              <img
                src={avatar}
                alt="avatar"
                className="w-10 object-cover h-10 rounded cursor-pointer"
              />

              <div className="absolute right-0 mt-3 w-56 bg-[#141414]/95 backdrop-blur border border-white/10 rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                {/* Profile Info */}
                <div className="px-4 py-3 border-b border-white/10">
                  <p className="text-sm text-white font-semibold">
                    {user.displayName || "Profile"}
                  </p>
                  <p className="text-xs text-gray-400">{user.email}</p>
                </div>

                {/* Menu */}
                <div className="flex flex-col py-2">
                  <MenuItem label="Manage Profiles" icon={<Pencil />} />
                  <MenuItem label="Account" icon={<Settings />} />
                  <MenuItem label="Help Center" icon={<HelpCircle />} />
                </div>

                {/* Sign Out */}
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
