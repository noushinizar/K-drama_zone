import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import bgimg from "/src/assets/bg_image.jpg";
import { fetchDramas } from "../redux/DramaSlice";
import Navbar from "../components/Navbar";
import { CircularPagination } from "../components/CircularPagination"; // Import the component

export function GenrePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list: dramas, genreFilter, loading } = useSelector(
    (state) => state.dramas
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDramas, setFilteredDramas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 21; // Number of dramas per page

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

  useEffect(() => {
    if (genreFilter) {
      dispatch(fetchDramas(genreFilter));
    }
  }, [dispatch, genreFilter]);

  useEffect(() => {
    const results = dramas.filter((drama) =>
      (drama.name || drama.title || "").toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredDramas(results);
  }, [dramas, searchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDramaClick = (id) => {
    navigate(`/drama/${id}`);
  };

  // Calculate the dramas to display on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedDramas = filteredDramas.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <Navbar />
      <div
        className="p-4 overflow-x-hidden h-full fixed"
        style={{ backgroundImage: `url(${bgimg})` }}
      >
        <Typography variant="h4" color="white" className="mb-4 mt-20">
          {`${selectedGenre} Dramas`}
        </Typography>

        <div className="sm:flex flex-1 justify-center mx-4">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search K-Dramas"
            className="w-full max-w-md px-4 py-2 text-sm text-white bg-gray-900 rounded-md shadow-inner focus:outline-none focus:ring-2 focus:ring-pink-600"
          />
        </div>

        <div className="mt-4">
          {loading ? (
            <p className="text-gray-400">
              Loading {selectedGenre.toLowerCase()} dramas...
            </p>
          ) : paginatedDramas.length > 0 ? (
            <div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-4">
                {paginatedDramas.map((drama) => (
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

              {/* Circular Pagination */}
              <div className="flex justify-center mt-6">
                <CircularPagination
                  active={currentPage}
                  totalPages={Math.ceil(filteredDramas.length / itemsPerPage)}
                  onChange={(page) => setCurrentPage(page)}
                />
              </div>
            </div>
          ) : (
            <p className="text-gray-400">No dramas found for "{searchQuery}"</p>
          )}
        </div>
      </div>
    </>
  );
}

export default GenrePage;
