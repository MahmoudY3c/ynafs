import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: null,
  lessonsData: null,
  treesData: null,
  loading: {
    status: false,
    item: null
  },
  error: {
    error: null,
    area: '',
    message: '',
    type: 'error',
  },
  items: {
    initial: true,
    termValue: 'SM2',
    categoryValue: null,
    levelValue: null,
    subjectValue: null,
    lessonValue: null,
    treeValue: null,
    QuestionTypeValue: null,
    drivePowerPointValue: null,
    displayQestionFeld: true,
    trueOrFalse: null,
    multiple: null,
    essay: null,
    areas: true,
  },
}

const Slice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setItem(state, action) {
      state.items[action.payload.item] = action.payload.value;
    },
    setItems(state, action) {
      state.items = action.payload;
    },
    setLoading(state, action) {
      state.loading.status = action.payload.status;
      state.loading.item = action.payload.item;
    },
    setError(state, action) {
      state.error.error = action.payload.error;
      state.error.area = action.payload.area;
      state.error.message = action.payload.message;
      state.error.type = action.payload.type || state.error.type;
    },
    setCategories(state, action) {
      state.categories = action.payload;
    },
    setLessons(state, action) {
      state.lessonsData = action.payload;
    },
    setTrees(state, action) {
      state.treesData = action.payload;
    },
    setDrivePowerPointValue(state, action) {
      state.items.drivePowerPointValue = action.payload;
    }
  },
});

export const { reducer: itemsReducer } = Slice;
export const { setItems, setItem, setLoading, setError, setCategories, setLessons, setTrees, setDrivePowerPointValue } = Slice.actions;
export const setItemsActions = Slice.actions;

// console.log('====================================');
// console.log(setItems);
// console.log('====================================');