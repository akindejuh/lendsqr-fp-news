import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'src/redux/store';
import { UINewsDetail } from 'src/domain/news/types';
import { getNewsDetail, transformNewsDetail } from 'src/domain/news';

interface NewsDetailState extends UINewsDetail, FetchState {}
const initialState: NewsDetailState = {
  audience_score: 0,
  id: '',
  title: '',
  topic: '',
  image_url: '',
  author: '',
  publication_date: '',
  summary: '',
  content: '',
  isLoading: false,
  isError: false,
  error: '',
};

export const getNewsDetailThunk = createAsyncThunk(
  'news/getNewsDetail',
  getNewsDetail,
);

const newsDetailSlice = createSlice({
  name: 'newsDetail',
  initialState,
  reducers: {
    clearNewsDetail: () => {
      return initialState;
    },
  },
  extraReducers: builder => {
    builder.addCase(getNewsDetailThunk.pending, state => {
      state.isLoading = true;
      state.isError = false;
      state.error = '';
    });
    builder.addCase(getNewsDetailThunk.fulfilled, (state, action) => {
      const newData = transformNewsDetail(
        action.payload?.data ?? {
          audienceScore: 0,
          _id: '',
          title: '',
          topic: '',
          imageUrl: '',
          author: '',
          published: '',
          summary: '',
          content: '',
        },
      );

      state = {
        ...state,
        ...newData,
        isLoading: false,
        isError: false,
        error: '',
      };

      state.isLoading = false;
      state.isError = false;
      state.error = '';
    });
    builder.addCase(getNewsDetailThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error?.message || '';
    });
  },
});

// selectors
export const getNewsDetailState = (state: RootState) => state.newsDetail;

// actions
export const { clearNewsDetail } = newsDetailSlice.actions;

// reducer
export default newsDetailSlice.reducer;
