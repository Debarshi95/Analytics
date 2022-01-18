import { createSelector } from '@reduxjs/toolkit';

const selectFilterState = (state) => state.filters;

export const selectFilters = createSelector(selectFilterState, (subState) => subState.filters);
