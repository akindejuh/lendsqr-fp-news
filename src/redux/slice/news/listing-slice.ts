import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'src/redux/store';
import { UINewsListing } from 'src/domain/news/types';
import { getNewsListing, transformNewsListings } from 'src/domain/news';

interface NewsListingState
  extends PageRes<{ page_meta: number; data: UINewsListing[] }>,
    FetchState {}
const initialState: NewsListingState = {
  items: [],
  page: {
    total_page: 0,
    current_page: 0,
    next_page: 0,
  },
  isLoading: false,
  isError: false,
  error: '',
};

export const getNewsListingThunk = createAsyncThunk(
  'news/getNewsListing',
  getNewsListing,
);

const newsListingSlice = createSlice({
  name: 'newsListing',
  initialState,
  reducers: {
    clearNewsListing: () => {
      return initialState;
    },
  },
  extraReducers: builder => {
    builder.addCase(getNewsListingThunk.pending, state => {
      state.isLoading = true;
      state.isError = false;
      state.error = '';
    });
    builder.addCase(getNewsListingThunk.fulfilled, (state, action) => {
      const currentPage = action.payload.data?.page?.current_page || 0;
      const newItems = transformNewsListings(action.payload.data?.items || []);

      const existingPageIndex = state.items.findIndex(
        item => item.page_meta === currentPage,
      );

      if (existingPageIndex !== -1) {
        state.items[existingPageIndex] = {
          page_meta: currentPage,
          data: newItems,
        };
      } else {
        state.items.push({
          page_meta: currentPage,
          data: newItems,
        });
      }

      state.page = action.payload.data?.page || initialState.page;
      state.isLoading = false;
      state.isError = false;
      state.error = '';
    });
    builder.addCase(getNewsListingThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error?.message || '';
    });
  },
});

// selectors
export const getNewsListingState = (state: RootState) => state.newsListing;

// actions
export const { clearNewsListing } = newsListingSlice.actions;

// reducer
export default newsListingSlice.reducer;
