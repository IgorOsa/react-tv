import { configureStore } from '@reduxjs/toolkit';
import searchReducer, { SEARCH_FEATURE_KEY } from '../features/search/searchSlice';
import showsReducer, { SHOWS_FEATURE_KEY } from '../features/shows/showsSlice';

const store = configureStore({
  reducer: {
    [SHOWS_FEATURE_KEY]: showsReducer,
    [SEARCH_FEATURE_KEY]: searchReducer,
  },
});

// store.subscribe(() => {
//   console.log('store', JSON.stringify(store.getState()[SHOWS_FEATURE_KEY].status));
// });

export default store;
