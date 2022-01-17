const appDetailState = (state) => state.appDetails;

// eslint-disable-next-line import/prefer-default-export
export const selectAppDetails = (state) => appDetailState(state).data;
