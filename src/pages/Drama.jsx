import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@material-tailwind/react";
import bgimg from '/src/assets/bg_image.jpg'
import { fetchDramas } from "../redux/DramaSlice"; // Update with the correct path

export function Drama() {
  const dispatch = useDispatch();
  const { list: dramas, genreFilter, loading } = useSelector((state) => state.dramas);

  // Predefined genres list with IDs and names
  const genres = [
    { id: 28, name: "Action" },
    { id: 35, name: "Comedy" },
    { id: 18, name: "Drama" },
    { id: 10749, name: "Romance" },
    { id: 27, name: "Horror" },
    // Add more genres as needed
  ];

  // Find the genre name from the genreFilter ID
  const selectedGenre = genres.find((genre) => genre.id === genreFilter)?.name || "Popular";

  // Fetch dramas whenever genre filter changes
  useEffect(() => {
    if (genreFilter) {
      dispatch(fetchDramas(genreFilter));
    }
  }, [dispatch, genreFilter]);

  return (
    <div className="p-4 overflow-x-hidden">
      <Typography variant="h4" color="white" className="mb-4">
        {`${selectedGenre} Dramas`}
      </Typography>

      {/* Display Dramas in Gallery Layout */}
      <div className="mt-4">
        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : dramas.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-2">
            {dramas.map((drama) => (
              <div key={drama.id} className="relative group">
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
          <img className='h-full w-full object-fill' src={bgimg} alt=""  />
          // <p className="text-gray-400">No dramas available for the selected genre.</p>
        )}
      </div>
    </div>
  );
}

export default Drama;
