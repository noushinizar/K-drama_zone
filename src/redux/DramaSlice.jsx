import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = "65be52bb78a25770e87b40912cdbafb3";

// Fetch dramas (supports both trending and genre-specific)
export const fetchDramas = createAsyncThunk(
  "dramas/fetchDramas",
  async (genreId = null) => {
    const endpoint = "https://api.themoviedb.org/3/discover/tv";
    const totalPages = 5; // Fetch 5 pages of results (100 dramas)
    const allResults = [];

    try {
      for (let page = 1; page <= totalPages; page++) {
        const params = {
          api_key: API_KEY,
          language: "en-US",
          sort_by: "popularity.desc",
          with_original_language: "ko",
          page, // Specify the current page
        };

        if (genreId) {
          params.with_genres = genreId;
        }

        const response = await axios.get(endpoint, { params });
        allResults.push(...response.data.results); // Combine results
      }

      console.log("Fetched Multiple Pages of Dramas:", allResults);
      return allResults;
    } catch (error) {
      console.error("Error fetching dramas:", error);
      throw error;
    }
  }
);

// Fetch a specific drama with trailer and credits
export const fetchDramaWithTrailer = createAsyncThunk(
  "dramas/fetchDramaWithTrailer",
  async (dramaId) => {
    try {
      const dramaResponse = await axios.get(
        `https://api.themoviedb.org/3/tv/${dramaId}`,
        { params: { api_key: API_KEY } }
      );
      const trailerResponse = await axios.get(
        `https://api.themoviedb.org/3/tv/${dramaId}/videos`,
        { params: { api_key: API_KEY } }
      );
      const creditsResponse = await axios.get(
        `https://api.themoviedb.org/3/tv/${dramaId}/credits`,
        { params: { api_key: API_KEY } }
      );

      const trailer = trailerResponse.data.results.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );

      return {
        ...dramaResponse.data,
        trailerUrl: trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null,
        cast: creditsResponse.data.cast,
        crew: creditsResponse.data.crew,
      };
    } catch (error) {
      console.error("Error fetching drama details:", error);
      throw error;
    }
  }
);

const dramaSlice = createSlice({
  name: "dramas",
  initialState: {
    list: [],
    selectedDrama: null,
    loading: false,
    error: null,
    genreFilter: null, // Currently selected genre filter
  },
  reducers: {
    clearSelectedDrama: (state) => {
      state.selectedDrama = null;
    },
    setGenreFilter: (state, action) => {
      state.genreFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Dramas
      .addCase(fetchDramas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDramas.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchDramas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Fetch Drama with Trailer
      .addCase(fetchDramaWithTrailer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDramaWithTrailer.fulfilled, (state, action) => {
        state.selectedDrama = action.payload;
        state.loading = false;
      })
      .addCase(fetchDramaWithTrailer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearSelectedDrama, setGenreFilter } = dramaSlice.actions;
export default dramaSlice.reducer;
