 
 import { useEffect } from "react";
import { OPTION_API } from "../../utils/constant";
import { NowPlayingMoviesAPI } from "../../utils/constant";
import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../../utils/movieSlice";
 
 const Nowplayingmovies=()=>{
 const dispatch = useDispatch();
    const fetchNowPlayingMovies = async() => 
        { try{
      const data=await fetch(NowPlayingMoviesAPI, OPTION_API)
      const jsondata=await data.json();
      dispatch(addNowPlayingMovies(jsondata.results));

        }      
        catch(error)
    {
     console.log("Error fetching now playing movies", error);
    } 
    }
    useEffect(() => {
      fetchNowPlayingMovies();
    }, []);
}
export default Nowplayingmovies;