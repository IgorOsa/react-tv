import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import fetchShowsBySearchQuery from './searchAPI';

export const SEARCH_FEATURE_KEY = 'search';

const initialState = {
  query: '',
  results: [],
  status: 'idle',
};

export const fetchShowsBySearchQueryAsync = createAsyncThunk(
  'search/fetchShowsBySearchQuery',
  async (query) => {
    const response = await fetchShowsBySearchQuery(query);
    return response.data;
  },
);

const searchSlice = createSlice({
  name: SEARCH_FEATURE_KEY,
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShowsBySearchQueryAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchShowsBySearchQueryAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.results = action.payload;
      });
  },
});

export const { setQuery } = searchSlice.actions;

export const selectSearchQuery = (state) => state[SEARCH_FEATURE_KEY].query;
export const selectSearchResults = (state) => state[SEARCH_FEATURE_KEY].results;

export default searchSlice.reducer;
