import { useEffect } from "react";
import { OPTION_API, PopularMoviesAPI } from "../../utils/constant";
import { useDispatch } from "react-redux";
import { addPopularMovies } from "../../utils/movieSlice";

const usePopularMovies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const data = await fetch(PopularMoviesAPI, OPTION_API);
        const jsondata = await data.json();
        dispatch(addPopularMovies(jsondata.results));
      } catch (error) {
        console.log("Error fetching popular movies", error);
      }
    };

    fetchPopularMovies();
  }, [dispatch]);
};

export default usePopularMovies;