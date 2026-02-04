import { useSelector } from "react-redux";
import { play } from "../utils/svgs";
const MainContainer = () => {
  const nowPlayingMovies = useSelector(
    (store) => store.movies.nowPlayingMovies,
  );
  if (!nowPlayingMovies) {
    return null;
  }
  return (
    <div className="w-full h-full ">
      <div className="absolute w-screen h-screen bg-black/50 z-10"></div>
      {nowPlayingMovies.slice(2, 3).map((movie, index) => (
        <div
          key={index}
          className="w-[90%] pl-[4.5%] gap-5 absolute z-10  min-h-screen mx-auto flex flex-col items-start justify-center"
        >
          <h1 className="text-4xl text-white font-bold">
            {movie.original_title}
          </h1>
          <h2 className="w-[50%] text-white text-[18px]">{movie.overview}</h2>
          <div className="flex gap-5">
            <button className="bg-white flex items-center gap-2  text-[20px] text-black px-4 py-2 hover:bg-gray-400  cursor-pointer rounded-md">
              {play} Play
            </button>
            <button className="bg-gray-500 flex items-center gap-2 text-[20px] hover:bg-gray-400 hover:text-black text-white px-4 py-2 cursor-pointer rounded-md">
              {" "}
              ⓘ More info
            </button>
          </div>
        </div>
      ))}
      <div className="inset-0 overflow-hidden bg-black">
        <iframe
          className="absolute top-1/2 left-1/2 w-[120vw] h-[55.75vw] min-h-screen min-w-screen -translate-x-1/2 -translate-y-1/2"
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
