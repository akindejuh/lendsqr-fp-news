import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'src/redux/store';

interface ThemeState {
  theme: 'light' | 'dark' | 'system';
}

const initialState: ThemeState = {
  theme: 'system',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, { payload }: { payload: ThemeState['theme'] }) => {
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
