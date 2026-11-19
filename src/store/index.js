import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './moviesSlice.js';
import cinemasReducer from './cinemasSlice.js';

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    cinemas: cinemasReducer,
  },
});
