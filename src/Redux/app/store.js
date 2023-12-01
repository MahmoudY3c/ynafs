import { configureStore } from '@reduxjs/toolkit';
import { darwerReducer } from '../features/data/slice';
import { itemsReducer } from '../features/items/slice';
import { tldrawReducer } from '../features/tldraw/slice';

const store = configureStore({
  reducer: {
    data: darwerReducer,
    items: itemsReducer,
    tldraw: tldrawReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV === 'development' ? true : false,
});

export default store;
