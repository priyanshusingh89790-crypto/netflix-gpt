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
<div className="text-white lg:w-[90%] lg:mt-[46.5%] md:mt-[80%] mt-[193%] z-10 lg:ml-[5%]">
<MovieRow title="Upcoming Movies" movies={upcomingMovies} />
<MovieRow title="Now Playing Movies" movies={nowPlayingMovies} />
<MovieRow title="Popular Movies" movies={popularMovies} />
<MovieRow title="Top Rated Movies" movies={topRatedMovies} />
</div>
);
};


export default SecondaryContainer;