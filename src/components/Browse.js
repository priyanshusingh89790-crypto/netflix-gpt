

import MainContainer from "./maincontainer";
import SecondaryContainer from "./secondarycontainer";
import usePopularMovies from "./Hooks/usepopularmovie";
import useTopRatedMovies from "./Hooks/usetop-ratedmovie";
import UpcomingMovies from "./Hooks/useupcomingmovie";
import Nowplayingmovie from "./Hooks/useNowplayingmovie";
const Browse = () => {
   Nowplayingmovie();
   usePopularMovies();
   useTopRatedMovies();
   UpcomingMovies();
    return (
        <div className="flex flex-col ">
            <MainContainer/>
            <SecondaryContainer/>
        </div>
    );
};      
export default Browse;
