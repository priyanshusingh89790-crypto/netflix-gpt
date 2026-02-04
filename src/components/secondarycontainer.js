import { useSelector } from "react-redux";
import MovieRow from "./moviesrow";


const SecondaryContainer = () => {
const {
nowPlayingMovies,
popularMovies,
topRatedMovies,
upcomingMovies,
} = useSelector((store) => store.movies);


return (
<div className="text-white w-[90%] mt-[46.5%] z-10 ml-[5%]">
<MovieRow title="Upcoming Movies" movies={upcomingMovies} />
<MovieRow title="Now Playing Movies" movies={nowPlayingMovies} />
<MovieRow title="Popular Movies" movies={popularMovies} />
<MovieRow title="Top Rated Movies" movies={topRatedMovies} />
</div>
);
};


export default SecondaryContainer;