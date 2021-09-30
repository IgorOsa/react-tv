import { createSlice } from '@reduxjs/toolkit';

export const FILTERS_FEATURE_KEY = 'filters';

const initialState = {
  genre: '',
};

const filterSlice = createSlice({
  name: FILTERS_FEATURE_KEY,
  initialState,
  reducers: {
    setGenre: (state, action) => {
      state.genre = action.payload;
    },
  },
});

export const { setGenre } = filterSlice.actions;

export const selectFilterGenre = (state) => state[FILTERS_FEATURE_KEY].genre;

export default filterSlice.reducer;
