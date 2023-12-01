import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: null,
  lessonsData: null,
  selectedSubject: null,
  selectedLevel: null,
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
      console.log(action.payload, '............. action.payload .........');
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
    setSelectedSubject(state, action) {
      state.selectedSubject = action.payload;
    },
    setSelectedLevel(state, action) {
      state.selectedLevel = action.payload;
    },
    setDrivePowerPointValue(state, action) {
      const { level, subject, drivePowerPoint } = action.payload || {};
      if (level && subject && drivePowerPoint) {
        const __subject = [
          ...state.lessonsData[level][subject],
        ];
        __subject.drivePowerPoint = drivePowerPoint;

        state.lessonsData = {
          ...state.lessonsData,
          [level]: {
            ...state.lessonsData[level],
            [subject]: __subject,
          }
        };

      } else {
        state.items.drivePowerPointValue = action.payload;
      }
    },
    updateSelectedTreeData(state, action) {
      const { treeIndex, LessonVocabulary, LessonPrepare } = action.payload;
      state.treesData[treeIndex].LessonVocabulary = LessonVocabulary;
      state.treesData[treeIndex].LessonPrepare = LessonPrepare;
    }
  },
});

export const { reducer: itemsReducer } = Slice;
export const { setItems, setItem, setLoading, setError, setCategories, setLessons, setTrees, setSelectedSubject, setSelectedLevel, setDrivePowerPointValue, updateSelectedTreeData } = Slice.actions;
export const setItemsActions = Slice.actions;

// console.log('====================================');
// console.log(setItems);
// console.log('====================================');