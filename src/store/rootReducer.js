import { combineReducers } from '@reduxjs/toolkit';
import reportReducer from './slices/reportSlice';
import filterReducer from './slices/filterSlice';
import appDetailReducer from './slices/appDetailSlice';

const rootReducer = () =>
  combineReducers({
    report: reportReducer,
    filters: filterReducer,
    appDetails: appDetailReducer,
  });

export default rootReducer;
