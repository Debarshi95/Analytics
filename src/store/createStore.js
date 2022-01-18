import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

const createStore = (initialState = {}) => {
  const store = configureStore({
    preloadedState: { ...initialState },
    reducer: rootReducer(),
    devTools: process.env.NODE_ENV !== 'production',
    secure: false,
  });

  return store;
};

export default createStore;
