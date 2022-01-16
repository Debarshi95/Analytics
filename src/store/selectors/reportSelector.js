/* eslint-disable import/prefer-default-export */
const reportState = (state) => state.report;

export const selectReport = (state) => reportState(state).data;
