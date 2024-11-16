import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = '65be52bb78a25770e87b40912cdbafb3';

// Async thunk to fetch dramas with an optional genre filter
export const fetchDramas = createAsyncThunk(
    'dramas/fetchDramas',
    async (genreId = null) => {
        const params = {
            api_key: API_KEY,
            language: 'en-US',
            sort_by: 'popularity.desc',
            with_original_language: 'ko',
            page: 1
        };
        
        if (genreId) {
            params.with_genres = genreId; // Add genre filter if provided
        }
        
        const response = await axios.get(`https://api.themoviedb.org/3/discover/tv`, { params });
        console.log(response.data.results);
        return response.data.results;  
        
    }
    
);


// Async thunk to fetch a drama with trailer details
export const fetchDramaWithTrailer = createAsyncThunk(
    'dramas/fetchDramaWithTrailer',
    async (dramaId) => {
        const dramaResponse = await axios.get(`https://api.themoviedb.org/3/tv/${dramaId}`, {
            params: { api_key: API_KEY }
        });
        const trailerResponse = await axios.get(`https://api.themoviedb.org/3/tv/${dramaId}/videos`, {
            params: { api_key: API_KEY }
        });

        const trailer = trailerResponse.data.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
        return {
            ...dramaResponse.data,
            trailerUrl: trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null
        };
    }
);

const dramaSlice = createSlice({
    name: 'dramas',
    initialState: {
        list: [],
        selectedDrama: null,
        loading: false,
        error: null,
        genreFilter: null, // Track selected genre for filtering
    },
    reducers: {
        clearSelectedDrama: (state) => {
            state.selectedDrama = null;
        },
        setGenreFilter: (state, action) => {
            state.genreFilter = action.payload; // Set the selected genre ID
        }
    },
    extraReducers: (builder) => {
        builder
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
    }
});

export const { clearSelectedDrama, setGenreFilter } = dramaSlice.actions;
export default dramaSlice.reducer;
