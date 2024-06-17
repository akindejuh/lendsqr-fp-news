import { createSlice } from '@reduxjs/toolkit';
import { INewsListing } from 'src/interface/news';
import { RootState } from 'src/redux/store';

export interface newsState {
  data: INewsListing[];
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
