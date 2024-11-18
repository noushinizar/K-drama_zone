import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import bgimg from "/src/assets/bg_image.jpg";
import { fetchDramas } from "../redux/DramaSlice";

export function Drama() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    list: dramas,
    genreFilter,
    loading,
  } = useSelector((state) => state.dramas);

  // Predefined genres list
  const genres = [
    { id: 35, name: "Comedy" },
    { id: 18, name: "Drama" },
    { id: 10749, name: "Romance" },
    { id: 80, name: "Crime" },
    { id: 10765, name: "Sci-Fi & Fantasy" },
    { id: 10768, name: "War & Politics" },
    { id: 36, name: "Historical" },
    { id: 10751, name: "Family & Revenge" },
  ];

  const selectedGenre =
    genres.find((genre) => genre.id === genreFilter)?.name || "Trending";

  // Fetch dramas when the component loads or the genre filter changes
  useEffect(() => {
    dispatch(fetchDramas(genreFilter));
  }, [dispatch, genreFilter]);

  const handleDramaClick = (id) => {
    navigate(`/drama/${id}`); // Navigate to the drama details page
  };

  return (
    <div
      className="p-4 overflow-x-hidden"
      style={{ backgroundImage: `url(${bgimg})` }}
    >
      <Typography variant="h4" color="white" className="mb-4">
        {`${selectedGenre} Dramas`}
      </Typography>

      {/* Trending Dramas Horizontal Scroll */}
      {!genreFilter && (
        <div className="mt-28">
          {loading ? (
            <p className="text-gray-400">Loading trending dramas...</p>
          ) : dramas.length > 0 ? (
            <div className="flex overflow-x-scroll gap-5 scrollbar-hide">
              {dramas.map((drama) => (
                <div
                  key={drama.id}
                  onClick={() => handleDramaClick(drama.id)}
                  className="min-w-[150px] sm:min-w-[200px] relative group cursor-pointer"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500${drama.poster_path}`}
                    alt={drama.name || drama.title}
                    className="rounded-lg w-full h-full object-cover group-hover:opacity-75"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-lg transition duration-300">
                    <p className="text-white font-bold text-center text-sm">
                      {drama.name || drama.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No trending dramas available.</p>
          )}
        </div>
      )}

      {/* Selected Genre Dramas in Grid */}
      {genreFilter && (
        <div className="mt-4">
          {loading ? (
            <p className="text-gray-400">
              Loading {selectedGenre.toLowerCase()} dramas...
            </p>
          ) : dramas.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-2 ">
              {dramas.map((drama) => (
                <div
                  key={drama.id}
                  onClick={() => handleDramaClick(drama.id)}
                  className="relative group cursor-pointer"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w400${drama.poster_path}`}
                    alt={drama.name || drama.title}
                    className="rounded-lg w-full h-full object-cover group-hover:opacity-75"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-lg transition duration-300">
                    <p className="text-white font-bold text-center">
                      {drama.name || drama.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <img className="h-full w-full object-fill" src={bgimg} alt="" />
          )}
        </div>
      )}
    </div>
  );
}

export default Drama;
