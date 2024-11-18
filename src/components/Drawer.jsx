// import React from "react";
// import {
//   Drawer,
//   Button,
//   Typography,
//   IconButton,
//   List,
//   ListItem,
//   ListItemPrefix,
//   ListItemSuffix,
//   Chip,
// } from "@material-tailwind/react";

// export function DrawerDefault() {
//   const [open, setOpen] = React.useState(false);

//   const closeDrawer = () => setOpen(false);

//   return (
//     <>
//         <div className="mb-2 flex items-center justify-between p-4 ">
//           <Typography variant="h4" color="white">
//             GENERS
//           </Typography>
//         </div>
//         <List className="text-gray-400 font-bold text-lg">
//           <ListItem >
//             Action
//           </ListItem>
//           <ListItem>
//             Rom-com
//           </ListItem>
//           <ListItem>
//             Medical
//           </ListItem>
//           <ListItem>
//             Historical
//           </ListItem>
//           <ListItem>
//            Horror
//           </ListItem>
//           <ListItem>
//           Thriller
//           </ListItem>
//           <ListItem>
//            Comedy
//           </ListItem>
//           <ListItem>
//            Revenge
//           </ListItem>
//           <ListItem>
//             Crime
//           </ListItem>
//           <ListItem>
//           Legal
//           </ListItem>
//           <ListItem>
//            Fantasy
//           </ListItem>
//         </List>

//     </>
//   );
// }
// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Typography, List, ListItem } from "@material-tailwind/react";
// import { fetchDramas, setGenreFilter } from "../redux/DramaSlice"; // Update with the correct path to the dramaSlice

// export function DrawerDefault() {
//   const dispatch = useDispatch();

//   // Select dramas and genre filter from the Redux store
//   const { list: dramas, genreFilter, loading } = useSelector((state) => state.dramas);
//   const genres = [
//     { id: 28, name: "Action" },
//     { id: 35, name: "Comedy" },
//     { id: 18, name: "Drama" },
//     { id: 10749, name: "Romance" },
//     { id: 27, name: "Horror" },
//     // Add more genres as needed based on your API
//   ];

//   // Fetch dramas whenever the genre filter changes
//   useEffect(() => {
//     dispatch(fetchDramas(genreFilter));
//   }, [dispatch, genreFilter]);

//   return (
//     <div className="p-4">
//       <div className="mb-2 flex items-center justify-between">
//         <Typography variant="h4" color="white">
//           GENRES
//         </Typography>
//       </div>

//       {/* Genre List */}
//       <List className="text-gray-400 font-bold text-lg">
//         {genres.map((genre) => (
//           <ListItem
//             key={genre.id}
//             onClick={() => dispatch(setGenreFilter(genre.id))}
//             className={`cursor-pointer hover:text-white ${
//               genreFilter === genre.id ? "text-white font-bold" : ""
//             }`}
//           >
//             {genre.name}
//           </ListItem>
//         ))}
//       </List>

//       {/* Display Dramas in Gallery Layout */}
//       <div className="mt-4">
//         {loading ? (
//           <p className="text-gray-400">Loading...</p>
//         ) : dramas.length > 0 ? (
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//             {dramas.map((drama) => (
//               <div key={drama.id} className="relative group">
//                 <img
//                   src={`https://image.tmdb.org/t/p/w500${drama.poster_path}`}
//                   alt={drama.name || drama.title}
//                   className="rounded-lg w-full h-full object-cover group-hover:opacity-75"
//                 />
//                 <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-lg transition duration-300">
//                   <p className="text-white font-bold text-center">
//                     {drama.name || drama.title}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-400">No dramas available for the selected genre.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// DrawerDefault.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, List, ListItem } from "@material-tailwind/react";
import { setGenreFilter } from "../redux/DramaSlice"; // Update with the correct path

export function DrawerDefault() {
  const dispatch = useDispatch();
  const { genreFilter } = useSelector((state) => state.dramas);

  const genres = [
    { id: 35, name: "Comedy" },
    { id: 18, name: "Drama" },
    { id: 10749, name: "Romance" },
    { id: 80, name: "Crime" },
    { id: 10765, name: "Sci-Fi & Fantasy" }, // Use this ID for Fantasy if needed
    { id: 10768, name: "War & Politics" }, // Close for "Legal" dramas if available
    { id: 36, name: "Historical" },
    { id: 10751, name: "Family & Revenge" }, // Revenge approximation
    // Add more genres as needed
  ];

  return (
    <div className="p-4">
      <div className="mb-2  flex items-center justify-between">
        <Typography variant="h4" color="white">
          GENRES
        </Typography>
      </div>

      {/* Genre List */}
      <List className="text-gray-100 font-bold text-lg">
        {genres.map((genre) => (
          <ListItem
            key={genre.id}
            onClick={() => dispatch(setGenreFilter(genre.id))}
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
