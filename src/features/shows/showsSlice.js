import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import fetchShows from './showsAPI';

const initialState = {
  value: [],
  status: 'idle',
};

export const fetchShowsAsync = createAsyncThunk(
  'shows/fetchShows',
  async () => {
    const response = await fetchShows();
    return response.data;
  },
);

export const showsSlice = createSlice({
  name: 'shows',
  initialState,
  reducers: { },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShowsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchShowsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      });
  },
});

export const selectShows = (state) => state.shows.value;

export const selectTopShows = (state, n) => {
  const { value } = state.shows;

  return value.slice(0, n);
};

export default showsSlice.reducer;
