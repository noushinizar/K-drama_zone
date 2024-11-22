import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import bgimg from "/src/assets/bg_image.jpg";
import { fetchDramas } from "../redux/DramaSlice";

export function Drama() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list: dramas, loading } = useSelector((state) => state.dramas);

  useEffect(() => {
    dispatch(fetchDramas()); // Fetch trending dramas (no genre filter)
  }, [dispatch]);

  const handleDramaClick = (id) => {
    navigate(`/drama/${id}`); // Navigate to drama details page
  };

  return (
    <div
      className="p-4 overflow-x-hidden h-full"
      style={{ backgroundImage: `url(${bgimg})` }}
    >
      <div className="bg-black/60 fixed top-0 left-0 w-full h-screen"></div>
      <Typography variant="h4" color="white" className="mb-4">
        Trending Dramas
      </Typography>

      {/* Trending Dramas Horizontal Scroll */}
      <div className="mt-28">
        {loading ? (
          <p className="text-gray-400 h-[100vh] w-[100vw]">Loading trending dramas...</p>
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
          <p className="text-gray-400 h-[100vh] w-[100vw]">No trending dramas available.</p>
        )}
      </div>
    </div>
  );
}

export default Drama;
