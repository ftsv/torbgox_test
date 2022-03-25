import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { timezoneApi } from '../services/timezoneService';
import watchesReducer from './reducers/watchesSlice';

const rootReducer = combineReducers({
  watchesReducer,
  [timezoneApi.reducerPath]: timezoneApi.reducer,
});

export const setupStore = () => configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(timezoneApi.middleware),
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];