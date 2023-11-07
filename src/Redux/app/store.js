import { configureStore } from '@reduxjs/toolkit';
import { darwerReducer } from '../features/data/slice';
import { itemsReducer } from '../features/items/slice';

const store = configureStore({
  reducer: {
    data: darwerReducer,
    items: itemsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV === 'development' ? true : false,
});

export default store;
