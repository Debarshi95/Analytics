/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getReport } from '../../services/api';
import { formatDate } from '../../utils/helper-funcs';

const initialState = {
  data: null,
  loading: false,
  error: '',
  dates: {
    startDate: '',
    endDate: '',
  },
};

export const fetchReport = createAsyncThunk('fetchReport', async ({ startDate }) => {
  try {
    const start = formatDate(startDate, 'en-CA', false);
    // const end = formatDate(endDate, 'en-CA', false);
    if (start) {
      console.log('yes', { start });
    }
    const res = await getReport();
    return res?.data;
  } catch (error) {
    return error.message;
  }
});

const reportSlice = createSlice({
  name: 'reportSlice',
  initialState,
  reducers: {
    setDates: (state, action) => {
      const { startDate, endDate } = action.payload;
      console.log({ action });
      state.dates = {
        endDate,
        startDate,
      };
    },
  },

  extraReducers: {
    [fetchReport.pending]: (state) => {
      if (!state.loading) {
        state.loading = true;
      }
      state.error = '';
    },
    [fetchReport.fulfilled]: (state, action) => {
      if (!state.dates.startDate) {
        const startDate = action.payload.data[0].date;
        state.dates = {
          ...state.dates,
          startDate,
        };
      }
      state.data = action.payload;
      state.loading = false;
    },
    [fetchReport.rejected]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setDates } = reportSlice.actions;
export default reportSlice.reducer;
