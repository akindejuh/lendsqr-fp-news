import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'src/redux/store';

export interface IThemeState {
  theme: 'light' | 'dark' | 'system';
}

const initialState: IThemeState = {
  theme: 'system',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, { payload }: { payload: IThemeState['theme'] }) => {
      state.theme = payload;
    },
  },
});

// selectors
export const getThemeState = (state: RootState) => state.theme;

// actions
export const { setTheme } = themeSlice.actions;

// reducer
export default themeSlice.reducer;
