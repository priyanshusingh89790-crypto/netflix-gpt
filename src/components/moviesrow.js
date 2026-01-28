import { MOVIES_CARD_CDN_URL } from "../utils/constant";
import { play } from "../utils/svgs";

const MovieRow = ({ title, movies }) => {
  if (!movies?.length) return null;

  return (
    <div className="px-8 mb-12">
      <h1 className="text-2xl font-bold text-white mb-4">{title}</h1>

      <div className="flex gap-5 overflow-x-scroll overflow-y-visible scrollbar-hide">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="
              relative group w-[220px] h-[340px] flex-shrink-0
              transition-all duration-300
              hover:scale-150 hover:z-50 cursor-pointer
            "
          >
            {/* Poster */}
            <img
              className="w-full h-[270px] object-cover rounded-lg"
              src={MOVIES_CARD_CDN_URL + movie.poster_path}
              alt={movie.title}
            />

            {/* Hover Overlay */}
            <div
              className="
                absolute inset-0 bg-black opacity-0
                group-hover:opacity-100
                transition-opacity duration-300
                rounded-lg flex flex-col justify-between
              "
            >
              <img
                src={MOVIES_CARD_CDN_URL + movie.backdrop_path}
                alt={movie.title}
                className="w-full h-[180px] object-cover rounded-t-lg"
              />

              <div className="p-2 flex flex-col gap-2">
                <h2 className="text-sm font-bold">
                  {movie.original_title}
                </h2>

                <div className="flex gap-2">
                  <button className="bg-white text-black px-3 py-1 rounded text-xs font-semibold">
                    {play}
                  </button>
                  <button className="border border-white px-2 py-1 rounded text-xs">
                    ➕
                  </button>
                </div>

                <p className="text-xs text-gray-300 line-clamp-3">
                  {movie.overview}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieRow;