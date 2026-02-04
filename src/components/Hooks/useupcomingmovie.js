 
 import { useEffect } from "react";
import { OPTION_API } from "../../utils/constant";
import { UpcomingMoviesAPI } from "../../utils/constant";
import { useDispatch } from "react-redux";
import { addUpcomingMovies } from "../../utils/movieSlice";
 
 const UpcomingMovies=()=>{
 const dispatch = useDispatch();
    const fetchUpcomingMovies = async() => 
        { try{
      const data=await fetch(UpcomingMoviesAPI, OPTION_API)
      const jsondata=await data.json();
      dispatch(addUpcomingMovies(jsondata.results));

        }      
        catch(error)
    {
     console.log("Error fetching upcoming movies", error);
    } 
    }
    useEffect(() => {
      fetchUpcomingMovies();
    }, []);
}
export default UpcomingMovies;