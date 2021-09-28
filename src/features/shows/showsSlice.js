import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import fetchShows, { fetchShowById } from './showsAPI';

export const SHOWS_FEATURE_KEY = 'shows';

const initialState = {
  value: [],
  currentShow: {},
  status: 'idle',
};

export const fetchShowsAsync = createAsyncThunk(
  'shows/fetchShows',
  async () => {
    const response = await fetchShows();
    return response.data;
  },
);

export const fetchShowByIdAsync = createAsyncThunk(
  'shows/fetchShowById',
  async (id) => {
    const response = await fetchShowById(id);
    return response.data;
  },
);

export const showsSlice = createSlice({
  name: SHOWS_FEATURE_KEY,
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
      })
      .addCase(fetchShowByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchShowByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.currentShow = action.payload;
      });
  },
});

export const selectShows = (state) => state.shows.value;

export const selectTopShows = (state, n) => {
  const { value } = state.shows;

  const arr = [...value];

  if (arr) {
    arr.sort((a, b) => {
      const keyA = parseFloat(a.rating.average);
      const keyB = parseFloat(b.rating.average);

      return keyB - keyA;
    });
  }

  return arr.slice(0, n);
};

export const selectCurrentShow = (state) => {
  const show = state.shows.currentShow;
  return show;
};

export default showsSlice.reducer;
