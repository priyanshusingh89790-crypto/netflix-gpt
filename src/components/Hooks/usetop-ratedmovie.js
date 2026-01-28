import { useEffect } from "react";
import { OPTION_API, TopRatedMoviesAPI } from "../../utils/constant";
import { useDispatch } from "react-redux";
import { addTopRatedMovies } from "../../utils/movieSlice";

const useTopRatedMovies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      try {
        const data = await fetch(TopRatedMoviesAPI, OPTION_API);
        const jsondata = await data.json();
        dispatch(addTopRatedMovies(jsondata.results));
        console.log(jsondata.results);
      } catch (error) {
        console.log("Error fetching popular movies", error);
      }
    };

    fetchTopRatedMovies();
  }, [dispatch]);
};

export default useTopRatedMovies;
