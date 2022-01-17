/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filters: [
    { id: 1, title: 'date', disabled: false },
    { id: 2, title: 'app_id', disabled: false },
    { id: 3, title: 'clicks', disabled: true },
    { id: 4, title: 'requests', disabled: true },
    { id: 5, title: 'responses', disabled: true },
    { id: 6, title: 'impressions', disabled: true },
    { id: 7, title: 'revenue', disabled: true },
    { id: 8, title: 'fill_rate', disabled: true },
    { id: 9, title: 'CTR', disabled: true },
  ],
};
const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    updateFilters: (state, action) => {
      state.filters = [...action.payload];
    },
  },
});

export const { updateFilters } = filterSlice.actions;

export default filterSlice.reducer;
