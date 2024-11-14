import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchMyList = createAsyncThunk(
  'myList/fetchMyList',
  async () => {
    const response = await axios.get('https://api.rapidmock.com/api/vikuman/v1/mylist');
    return response.data;
  }
);

const myListSlice = createSlice({
  name: 'myList',
  initialState: {
    toWatch: [],
    watched: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyList.fulfilled, (state, action) => {
        state.loading = false;
        state.toWatch = action.payload['To Watch'];
        state.watched = action.payload['Watched'];
      })
      .addCase(fetchMyList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default myListSlice.reducer;
