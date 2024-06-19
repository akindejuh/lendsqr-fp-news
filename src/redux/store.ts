import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import newsListingSlice from './slice/news/listing-slice';
import newsDetailSlice from './slice/news/detail-slice';

const rootReducer = combineReducers({
  newsListing: newsListingSlice,
  newsDetail: newsDetailSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export default store;
