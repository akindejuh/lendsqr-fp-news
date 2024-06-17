import { combineReducers, configureStore } from '@reduxjs/toolkit';
import newsSlice from './features/news/news-listing-slice';
import { useDispatch, useSelector } from 'react-redux';

const rootReducer = combineReducers({
  news: newsSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export default store;
