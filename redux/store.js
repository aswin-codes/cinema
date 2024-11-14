import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './movieSlice';
import movieDetailsReducer from './movieDetailsSlice';
import myListReducer from './myListSlice';

export const store = configureStore({
  reducer: {
    movies: movieReducer,
    movieDetails: movieDetailsReducer,
    myList: myListReducer,
  },
});