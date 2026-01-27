import { useSelector } from "react-redux";
import { MOVIES_CARD_CDN_URL } from "../utils/constant";
const SecondaryContainer = () => {
    const movies = useSelector((store) => store.movies);
    return (
        <div className="text-white text-2xl z-10 absolute top-[90%] flex flex-col ">
            <h1> Now Playing Movies </h1>
           <div className="flex gap-5 overflow-x-scroll">
            {movies.nowPlayingMovies && movies.nowPlayingMovies.map((movie,index) => (
                <div key={index} className=" flex-shrink-0">
                    <img className="w-[220px] h-[270px] object-cover" src={MOVIES_CARD_CDN_URL + movie.poster_path} alt={movie.title} />
                    <h1 className="text-white text-center w-[220px] text-xl">{movie.title}</h1>
                </div>
            ))}
           </div>
        </div>
    );
};
export default SecondaryContainer;