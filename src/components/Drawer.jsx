import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, List, ListItem } from "@material-tailwind/react";
import { setGenreFilter } from "../redux/DramaSlice"; // Adjust the path as needed
import { useNavigate } from "react-router-dom";



export function DrawerDefault({ closeDrawer }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { genreFilter } = useSelector((state) => state.dramas);

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

  const handleGenreSelect = (id) => {
    dispatch(setGenreFilter(id)); // Update Redux state with selected genre
    closeDrawer(); // Close the drawer
    navigate("/genre"); // Navigate to the genre page
  };

  return (
    <div className="p-4">
      <div className="mb-2 flex items-center justify-between">
        <Typography variant="h4" color="white">
          GENRES
        </Typography>
      </div>

      {/* Genre List */}
      <List className="text-gray-100 font-bold text-lg">
        {genres.map((genre) => (
          <ListItem
            key={genre.id}
            onClick={() => handleGenreSelect(genre.id)} // Handle genre selection
            className={`cursor-pointer hover:text-white ${
              genreFilter === genre.id ? "text-white font-bold" : ""
            }`}
          >
            {genre.name}
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default DrawerDefault;
