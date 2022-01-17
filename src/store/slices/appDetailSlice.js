/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAppDetails } from '../../services/api';

const initialState = {
  data: null,
  loading: false,
  error: '',
};

export const fetchAppDetails = createAsyncThunk('fetchAppDetails', async () => {
  try {
    const res = await getAppDetails();
    return res?.data;
  } catch (error) {
    return error.message;
  }
});
const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  extraReducers: {
    [fetchAppDetails.pending]: (state) => {
      state.loading = true;
    },
    [fetchAppDetails.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    [fetchAppDetails.rejected]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export default appSlice.reducer;
