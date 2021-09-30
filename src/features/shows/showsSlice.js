import { createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit';
import { FILTERS_FEATURE_KEY } from '../filters/filtersSlice';
import fetchShows, { fetchShowById } from './showsAPI';

export const SHOWS_FEATURE_KEY = 'shows';

const initialState = {
  value: [],
  genres: [],
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
  reducers: {
    setShows: (state, action) => {
      state.value = action.payload;
    },
  },
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

export const { setShows } = showsSlice.actions;

export const selectShows = (state) => state[SHOWS_FEATURE_KEY].value;

export const selectFilteredShows = createSelector(
  selectShows,
  (state) => state[FILTERS_FEATURE_KEY],
  (shows, filters) => shows.filter((el) => {
    const { genre } = filters;
    return genre === '' ? shows : el.genres.includes(genre);
  }),
);

export const selectTopShows = (state, n) => {
  const { value } = state[SHOWS_FEATURE_KEY];

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
  const show = state[SHOWS_FEATURE_KEY].currentShow;
  return show;
};

export const selectIsLoadingShows = (state) => state[SHOWS_FEATURE_KEY].status === 'loading';

export const selectGenres = (state) => {
  const { value } = state[SHOWS_FEATURE_KEY];

  const genres = new Set(value.reduce((acc, el) => {
    acc.push(...el.genres);
    return acc;
  }, []));

  return ([...genres].sort());
};

export default showsSlice.reducer;
