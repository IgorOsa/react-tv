import { createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit';
import firestore from '../../firebase/config';
import { FILTERS_FEATURE_KEY } from '../filters/filtersSlice';
import fetchShows from './showsAPI';

export const SHOWS_FEATURE_KEY = 'shows';

const initialState = {
  value: [],
  genres: [],
  status: 'idle',
};

export const fetchShowsAsync = createAsyncThunk(
  'shows/fetchShows',
  async () => {
    const response = await fetchShows();
    return response.data;
  },
);

export const createShowDocumentAsync = createAsyncThunk(
  'shows/createShowDocumentAsync',
  async (showID) => {
    const docRef = firestore.doc(`/shows/${showID}`);
    return docRef.set({ likes: 0 });
  },
);

export const updateShowDataAsync = createAsyncThunk(
  'shows/updateShowDataAsync',
  async ({ id, update }) => firestore.collection('shows').doc(id).update(update),
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
      .addCase(createShowDocumentAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createShowDocumentAsync.fulfilled, (state) => {
        state.status = 'idle';
      })
      .addCase(updateShowDataAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateShowDataAsync.fulfilled, (state) => {
        state.status = 'idle';
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
