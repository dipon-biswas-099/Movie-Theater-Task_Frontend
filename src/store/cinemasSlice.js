import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api/axios.js';

export const fetchCinemas = createAsyncThunk('cinemas/fetchAll', async () => {
  const res = await api.get('/cinemas');
  return res.data;
});

export const createCinema = createAsyncThunk('cinemas/create', async (data, { rejectWithValue }) => {
  try {
    const res = await api.post('/cinemas', data);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

export const fetchBookingQuote = createAsyncThunk('cinemas/bookingQuote', async ({ id, groupSize }, { rejectWithValue }) => {
  try {
    const res = await api.get(`/cinemas/${id}/booking`, { params: { groupSize } });
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

const cinemasSlice = createSlice({
  name: 'cinemas',
  initialState: {
    cinemas: [],
    loading: false,
    error: null,
    quote: null,
    quoteLoading: false,
    quoteError: null,
  },
  reducers: {
    clearQuote: (state) => { state.quote = null; state.quoteError = null; },
  },
  extraReducers: (builder) => {
    builder
      // fetchCinemas
      .addCase(fetchCinemas.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchCinemas.fulfilled, (state, action) => { state.loading = false; state.cinemas = action.payload; })
      .addCase(fetchCinemas.rejected, (state, action) => { state.loading = false; state.error = action.error.message; })
      // createCinema
      .addCase(createCinema.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(createCinema.fulfilled, (state, action) => { state.loading = false; state.cinemas.push(action.payload); })
      .addCase(createCinema.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      // fetchBookingQuote
      .addCase(fetchBookingQuote.pending, (state) => { state.quoteLoading = true; state.quoteError = null; state.quote = null; })
      .addCase(fetchBookingQuote.fulfilled, (state, action) => { state.quoteLoading = false; state.quote = action.payload; })
      .addCase(fetchBookingQuote.rejected, (state, action) => { state.quoteLoading = false; state.quoteError = action.payload; });
  },
});

export const { clearQuote } = cinemasSlice.actions;
export default cinemasSlice.reducer;
