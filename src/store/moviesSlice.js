import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api/axios.js';

export const fetchMovies = createAsyncThunk('movies/fetchAll', async () => {
  const res = await api.get('/movies');
  return res.data;
});

export const createMovie = createAsyncThunk('movies/create', async (data, { rejectWithValue }) => {
  try {
    const res = await api.post('/movies', data);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

export const updateMovie = createAsyncThunk('movies/update', async ({ id, data }, { rejectWithValue }) => {
  try {
    const res = await api.patch(`/movies/${id}`, data);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

export const fetchRewatchOrder = createAsyncThunk('movies/rewatchOrder', async (id, { rejectWithValue }) => {
  try {
    const res = await api.get(`/movies/${id}/rewatch-order`);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    loading: false,
    error: null,
    rewatchOrder: null,
    rewatchLoading: false,
    rewatchError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchMovies
      .addCase(fetchMovies.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchMovies.fulfilled, (state, action) => { state.loading = false; state.movies = action.payload; })
      .addCase(fetchMovies.rejected, (state, action) => { state.loading = false; state.error = action.error.message; })
      // createMovie
      .addCase(createMovie.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(createMovie.fulfilled, (state) => { state.loading = false; })
      .addCase(createMovie.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      // updateMovie
      .addCase(updateMovie.pending, (state) => { state.error = null; })
      .addCase(updateMovie.fulfilled, (state, action) => {
        const idx = state.movies.findIndex(m => m.id === action.payload.id);
        if (idx !== -1) state.movies[idx] = action.payload;
      })
      .addCase(updateMovie.rejected, (state, action) => { state.error = action.payload; })
      // fetchRewatchOrder
      .addCase(fetchRewatchOrder.pending, (state) => { state.rewatchLoading = true; state.rewatchError = null; state.rewatchOrder = null; })
      .addCase(fetchRewatchOrder.fulfilled, (state, action) => { state.rewatchLoading = false; state.rewatchOrder = action.payload; })
      .addCase(fetchRewatchOrder.rejected, (state, action) => { state.rewatchLoading = false; state.rewatchError = action.payload; });
  },
});

export default moviesSlice.reducer;
