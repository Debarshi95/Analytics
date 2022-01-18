import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import { getReport } from '../../services/api';

const initialState = {
  data: null,
  loading: false,
  error: '',
  dates: {
    startDate: '2021-05-01T00:00:00Z', // Default to 1st May 2021
    endDate: '2021-05-05T00:00:00Z', // Default to 5th May 2021
  },
};

export const fetchReport = createAsyncThunk('fetchReport', async ({ startDate, endDate }) => {
  try {
    const dateFormat = 'YYYY-MM-DD';
    const start = moment(startDate).format(dateFormat);
    const end = moment(endDate).format(dateFormat);

    const res = await getReport(start, end);
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
