import { configureStore } from '@reduxjs/toolkit';
import showsReducer, { SHOWS_FEATURE_KEY } from '../features/shows/showsSlice';

const store = configureStore({
  reducer: {
    [SHOWS_FEATURE_KEY]: showsReducer,
  },
});

export default store;
