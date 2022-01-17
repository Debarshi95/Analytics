import { createSelector } from '@reduxjs/toolkit';

const selectReportState = (state) => state.report;

export const selectReportData = createSelector(selectReportState, (subState) => subState.data);
export const selectReportDates = createSelector(selectReportState, (subState) => subState.dates);
