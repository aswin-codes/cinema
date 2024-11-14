import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching movie details
export const fetchMovieDetails = createAsyncThunk(
  'movieDetails/fetchMovieDetails',
  async (movieId) => {
    try {
      const response = await axios.get(
        `https://api.rapidmock.com/api/vikuman/v1/movies?id=${movieId}`
      );
      return response.data;
    } catch (error) {
      throw Error('Failed to fetch movie details');
    }
  }
);

// Async thunk for adding movie to watch list
export const addToWatchList = createAsyncThunk(
  'movieDetails/addToWatchList',
  async ({ movieId, status }) => {
    try {
      const response = await axios.post(
        'https://api.rapidmock.com/api/vikuman/v1/mylist/add',
        {
          movieId,
          status
        }
      );
      return response.data;
    } catch (error) {
      throw Error('Failed to add movie to watch list');
    }
  }
);

const movieDetailsSlice = createSlice({
  name: 'movieDetails',
  initialState: {
    movie: null,
    loading: false,
    error: null,
    addToListLoading: false,
    addToListError: null,
    addToListSuccess: false
  },
  reducers: {
    resetAddToListStatus: (state) => {
      state.addToListLoading = false;
      state.addToListError = null;
      state.addToListSuccess = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchMovieDetails
      .addCase(fetchMovieDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.movie = action.payload;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Handle addToWatchList
      .addCase(addToWatchList.pending, (state) => {
        state.addToListLoading = true;
        state.addToListError = null;
        state.addToListSuccess = false;
      })
      .addCase(addToWatchList.fulfilled, (state) => {
        state.addToListLoading = false;
        state.addToListSuccess = true;
      })
      .addCase(addToWatchList.rejected, (state, action) => {
        state.addToListLoading = false;
        state.addToListError = action.error.message;
      });
  }
});

export const { resetAddToListStatus } = movieDetailsSlice.actions;
export default movieDetailsSlice.reducer;