import { useSelector } from "react-redux";
import MovieRow from "./moviesrow";
import { useEffect, useState } from "react";


const ShowAIMovie = ({ loading }) => {
  const { moviename, movieresult } = useSelector(
    (store) => store.movies.aiMovie
  );
  const [cardCount, setCardCount] = useState(
  window.innerWidth < 768 ? 2 : 10
);

useEffect(() => {
  const handleResize = () => {
    setCardCount(window.innerWidth < 768 ? 2 : 10);
  };

  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);


  if (loading) {
    return (
      <div className="px-4 w-full mb-12 mt-8">
        {Array.from({ length: 3 }).map((_, rowIndex) => (
          <div key={rowIndex} className="mb-6">
            <div className="lg:w-48 h-6 bg-gray-700 rounded mb-4 animate-pulse" />

            <div className="flex w-full gap-2 lg:gap-8">
              {Array.from({ length: cardCount }).map((_, i) => (
                <div
                  key={i}
                  className="w-44 h-60 bg-gray-700 rounded-lg animate-pulse"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!moviename?.length || !movieresult?.length) return null;

  return (
    <div className="px-4 mb-12">
      {moviename.map((name, index) => (
        <MovieRow
          key={index}                 
          movies={movieresult[index]} 
        />
      ))}
    </div>
  );
};

export default ShowAIMovie;
