import { configureStore } from '@reduxjs/toolkit';
import filtersReducer, { FILTERS_FEATURE_KEY } from '../features/filters/filtersSlice';
import searchReducer, { SEARCH_FEATURE_KEY } from '../features/search/searchSlice';
import showsReducer, { SHOWS_FEATURE_KEY } from '../features/shows/showsSlice';
import { showsApi } from '../features/shows/showsAPI';

const store = configureStore({
  reducer: {
    [showsApi.reducerPath]: showsApi.reducer,
    [SHOWS_FEATURE_KEY]: showsReducer,
    [SEARCH_FEATURE_KEY]: searchReducer,
    [FILTERS_FEATURE_KEY]: filtersReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(showsApi.middleware),
});

export default store;
