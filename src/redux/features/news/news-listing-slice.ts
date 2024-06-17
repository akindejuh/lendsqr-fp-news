import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'src/redux/store';
import { UINewsListing } from 'src/domain/news/types';

export interface newsState {
  data: UINewsListing[];
  page: {
    total_pages: number;
    current_page: number;
    next_page: number;
  };
}

const initialState: newsState = {
  data: [],
  page: {
    total_pages: 0,
    current_page: 0,
    next_page: 0,
  },
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    clearNews: () => {
      return initialState;
    },
  },
});

// selectors
export const getNews = (state: RootState) => state.news;

// actions
export const { clearNews } = newsSlice.actions;

// reducer
export default newsSlice.reducer;
