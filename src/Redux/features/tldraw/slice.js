import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
};

const Slice = createSlice({
  name: 'tldraw',
  initialState,
  reducers: {
    openTldraw(state, action) {
      state.isOpen = action.payload;
    },
  },
});

export const { reducer: tldrawReducer } = Slice;
export const { openTldraw } = Slice.actions;
export const tldrawActions = Slice.actions;


