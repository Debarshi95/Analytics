import { combineReducers } from '@reduxjs/toolkit';
import reportReducer from './slices/reportSlice';

const rootReducer = () =>
  combineReducers({
    report: reportReducer,
  });

export default rootReducer;
