/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getReport } from '../../services/api';

const initialState = {
  data: null,
  loading: false,
  error: '',
};

export const fetchReport = createAsyncThunk('fetchReport', async () => {
  try {
    const res = await getReport();
    return res?.data;
  } catch (error) {
    return error.message;
  }
});

const reportSlice = createSlice({
  name: 'reportSlice',
  initialState,
  extraReducers: {
    [fetchReport.pending]: (state) => {
      if (!state.loading) {
        state.loading = true;
      }
      state.error = '';
    },
    [fetchReport.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    [fetchReport.rejected]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export default reportSlice.reducer;
