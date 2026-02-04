
import { AI_BACKGROUND_URL } from "../utils/constant";
import { AI_API } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addAiMovie } from "../utils/movieSlice";
const AiMovie = () => {
    const dispatch = useDispatch();
    const getMovieSuggestion = async (prompt) => {
  const response = await fetch(
    AI_API,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: prompt,
      }),
    }
  );

  const data = await response.json();
  return data;
};

    return (
        <div>
            <div className="w-screen h-screen fixed">
                    <img className="w-full h-full object-cover" src={AI_BACKGROUND_URL} alt="background" />
                  </div>
                        <div className="absolute bg-black/40 w-full h-full flex justify-center items-center">
                        </div>
                        <div className="absolute top-60 w-[50%] left-1/2 h-28 items-center gap-5 transform -translate-x-1/2 -translate-y-1/2 flex bg-black rounded-lg p-5">
                            <input type="text" placeholder="What would you like to watch?"
                             className="w-full placeholder-gray-800 h-12 bg-gray-100 outline-gray-500 focus:outline-gray-500 focus:ring-2 focus:ring-gray-500 rounded-lg p-2"/>
                            <button className="w-24 h-12 bg-red-600 px-1 py-2 text-white cursor-pointer hover:bg-red-700 rounded-lg">Get Movie</button>
                        </div>
        </div>
    );
};

export default AiMovie;