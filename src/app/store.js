import { configureStore } from '@reduxjs/toolkit';
import { doctorApi } from '../features/ApiSlice';
import authRuducer from '../features/ApiSlice'
import feeReducer from '../features/FeeSlice'
export const store = configureStore({
  reducer: {
    auth : authRuducer,
    [doctorApi.reducerPath]: doctorApi.reducer,
    fee : feeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(doctorApi.middleware),
});

