import { createSelector } from '@reduxjs/toolkit';

const selectAppDetailState = (state) => state.appDetails;

export const selectAppData = createSelector(selectAppDetailState, (subState) => subState.data);

export const selectAppById = (id) =>
  createSelector([selectAppData], (data) => {
    const app = data.data.find((item) => item.app_id === id);
    return app;
  });
