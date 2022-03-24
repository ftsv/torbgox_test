import { combineReducers, configureStore } from '@reduxjs/toolkit';
import watchesReducer from './reducers/watchesSlice';

const rootReducer = combineReducers({
  watchesReducer,
});

export const setupStore = () => configureStore({
    reducer: rootReducer,
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];