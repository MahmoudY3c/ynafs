import request from '../../../API/api';
const {createAsyncThunk} = require('@reduxjs/toolkit');

export const getData = createAsyncThunk('get-lesson', async token => {
  return await request('/lessons', {
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(data => data)
    .catch(err => err);
});
