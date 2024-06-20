import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import newsListingSlice from './slice/news/listing-slice';
import newsDetailSlice from './slice/news/detail-slice';
import themeSlice from './slice/theme/theme-slice';
import { persistReducer, persistStore } from 'redux-persist';
import EncryptedStorage from 'react-native-encrypted-storage';

const rootReducer = combineReducers({
  newsListing: newsListingSlice,
  newsDetail: newsDetailSlice,
  theme: themeSlice,
});

const persistConfig = {
  key: 'root',
  storage: EncryptedStorage,
  whitelist: ['theme'],
  blacklist: ['newsListing', 'newsDetail'],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export default store;
