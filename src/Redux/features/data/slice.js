import {createSlice} from '@reduxjs/toolkit';
import { getData } from './thunk';
import { filterResponseData } from '../../../handlers/handlers';

const initialState = {
  dataLoading: true,
  data: {},
};

const Slice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setData: (state = initialState, action) => {
      state.data = action.payload ? filterResponseData(action.payload) : {};
    },
  },
  extraReducers: builder => {
    // Login Builders With Post Thunk
    builder.addCase(getData.fulfilled, (state, action) => {
      state.dataLoading = false;
      state.data = filterResponseData(action.payload);
    });
    builder.addCase(getData.pending, (state, action) => {
      state.dataLoading = true;
      state.data = {};
    });
    builder.addCase(getData.rejected, (state, action) => {
      console.log(action, 'rejected');

      state.dataLoading = false;
      state.data = {};
    });
  },
});

export const {reducer: darwerReducer} = Slice;
export const {openDrawer, closeDrawer} = Slice.actions;
