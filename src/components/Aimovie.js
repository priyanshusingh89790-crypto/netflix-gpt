import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AI_BACKGROUND_URL, OPTION_API } from "../utils/constant";
import { language } from "../utils/languageconstant";
import { addAiMovie } from "../utils/movieSlice";
import ShowaiMovie from "./showaimovie";
import {useNavigate } from "react-router-dom";

const AiMovie = () => {
  const langkey = useSelector((store) => store.language.language);
    const dispatch = useDispatch();
    const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [prompt, setPrompt] = useState("");

  const Searchmovietmdb = async (movie) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
        movie
      )}&include_adult=false&language=en-US&page=1`,
      OPTION_API
    );      
    const res = await data.json();
    return res.results;
  };

    const getMovieSuggestion = async (prompt) => {
    if (!prompt) return;
    setLoading(true);
    try {
      const response = await fetch("https://netflix-gpt-59p6.onrender.com/api/ai", {
      method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

  const data = await response.json();
      const datafromai = data?.text || "";
      
      const movies = datafromai
        .split(/\n|,/)
        .map((m) => m.trim())
        .filter(Boolean);
      const promiseArray = movies.map((movie) => Searchmovietmdb(movie));
const movieData = await Promise.all(promiseArray);
      dispatch(addAiMovie({ moviename: movies, movieresult: movieData }));
    } catch (error) {
      console.error("AI Error:", error);
    } finally {
      setLoading(false);
    }
};

    return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Background image */}
     <div className="relative w-screen h-screen">
  <img
    src={AI_BACKGROUND_URL}
    alt="background"
    className="w-full h-full object-cover"
  />
  <div className="absolute inset-0 bg-black/60 pointer-events-none"></div>
   </div>
       <div className="absolute lg:hidden md:hidden block right-5 top-20 z-50">
    <button onClick={() => navigate("/browse")} className="text-black text-[13px] hover:bg-white/80 bg-white cursor-pointer px-2 py-1 rounded-lg">
        Back to home </button>
   </div>
      {/* Content */}
      <div className="absolute top-0 left-0 lg:w-full w-[103vw] lg:mr-0 mr-5 h-full z-20 flex flex-col items-center">
        {/* Search Box */}
        <div className="lg:mt-60 mt-40 lg:w-[30%] md:w-[60%] gap-4 w-[90%] flex flex-col items-center rounded-lg p-5">
          <h1 className="text-white text-[24px] md:text-[28px] lg:text-[32px] text-center mt-10 lg:mt-0 font-bold">We’ll Pick the <b className="text-red-600">Movie</b> for you</h1>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={language[langkey].gptSearch}
            className="w-full md:h-12 lg:h-12 h-10 bg-white placeholder:text-black text-[14px] placeholder:text-[14px] md:text-[16px] md:placeholder:text-[16px] lg:text-[16px] lg:placeholder:text-[16px] text-black rounded-full p-3 outline-none"
          />
          <button
            onClick={() => getMovieSuggestion(prompt)}
            className="w-36 lg:h-10 h-8 lg:text-[16px] md:text-[16px] text-[14px] cursor-pointer bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            {language[langkey].search}
          </button>
        </div>

        {/* AI Movies */}
        <div className="sm:w-[112vw] md:w-[105vw] md:mr-12 lg:w-full h-auto lg:px-4 lg:mr-0 mr-8 overflow-y-auto scrollbar-hide">
          
          <ShowaiMovie loading={loading}/>
          
        </div>
      </div>
    </div>
    );
};

export default AiMovie;