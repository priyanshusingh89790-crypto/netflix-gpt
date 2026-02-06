import { useSelector } from "react-redux";
import { play } from "../utils/svgs";
import { MOVIES_CARD_CDN_URL } from "../utils/constant";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const MainContainer = () => {
    const location = useLocation();
    const isAI = location.pathname === "/aimovie";
    const navigate = useNavigate();
  const nowPlayingMovies = useSelector(
    (store) => store.movies.nowPlayingMovies,
  );
  if (!nowPlayingMovies) {
    return null;
  }
  return (
    <div className="w-full h-full">
      <div className="absolute z-50 top-20 lg:hidden md:hidden block right-5">
      <button
              onClick={() => navigate(isAI ? "/browse" : "/aimovie")}
              className={
                isAI
                  ? "text-black text-[13px] hover:bg-white/80 bg-white cursor-pointer px-2 py-1 rounded-lg"
                  : "text-white text-[13px] bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 cursor-pointer px-2 py-1 rounded-lg" } >
              {isAI ? "Back to Home" : "AI Picks"}
            </button>
            </div>
      <div className="absolute w-screen h-screen bg-black/50 z-10"></div>
      {nowPlayingMovies.slice(8, 9).map((movie, index) => (
        <div
          key={index}
          className="lg:w-[90%] w-full lg:pl-[4.5%] lg:gap-5 gap-3 absolute z-10  min-h-screen mx-auto flex flex-col items-start justify-center">
          <div className="w-full p-4 lg:hidden md:hidden h-[63vh]">
            <img src={ MOVIES_CARD_CDN_URL + movie.poster_path} alt="poster" className="w-full rounded-lg object-cover h-full" />
             </div>
          <h1 className="lg:text-4xl text-2xl pl-20 md:pl-[35%] lg:pl-0 text-center lg:text-left text-white font-bold">
            {movie.original_title}
          </h1>
          <h2 className="w-[50%] sm:block hidden md:hidden lg:block text-white text-[18px]">{movie.overview}</h2>
          <div className="flex gap-7 lg:gap-4 pl-16 md:pl-[33%] lg:pl-0 justify-center lg:justify-start">
            <button className="bg-white flex items-center gap-2 w-28 lg:text-[20px] text-[15px] text-black px-4 py-2 hover:bg-gray-400  cursor-pointer rounded-md">
              {play} Play
            </button>
            <button className="bg-gray-500 flex items-center gap-2 lg:text-[20px] text-[15px] hover:bg-gray-400 hover:text-black text-white px-4 py-2 cursor-pointer rounded-md">
              {" "}
              ⓘ More info
            </button>
          </div>
        </div>
      ))}
      <div className="inset-0 sm:block hidden overflow-hidden bg-black">
        <iframe
          className="absolute lg:top-1/2 top-0 lg:left-1/2 left-0 w-[120vw] lg:h-[55.75vw] md:h-[70vw] lg:min-h-screen min-w-screen lg:-translate-x-1/2 lg:-translate-y-1/2"
          src="https://www.youtube.com/embed/nb_fFj_0rq8?autoplay=1&mute=1&controls=0&loop=1&playlist=nb_fFj_0rq8&modestbranding=1"
          title="Background video"
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
        />
      </div>
    </div>
  );
};
export default MainContainer;
