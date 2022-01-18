import { createSelector } from '@reduxjs/toolkit';

const selectAppDetailState = (state) => state.appDetails;

export const selectAppData = createSelector(
  selectAppDetailState,
  (subState) => subState?.data || {}
);

export const selectAppById = (appId) =>
  createSelector([selectAppData], (data) => {
    const app = data?.data?.find((item) => item.app_id === appId);
    return app;
  });
