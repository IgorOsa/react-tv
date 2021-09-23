import { configureStore } from '@reduxjs/toolkit';
import showsReducer from '../features/shows/showsSlice';

const store = configureStore({
  reducer: {
    shows: showsReducer,
  },
});

export default store;
