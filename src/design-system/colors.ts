import { Appearance, ColorSchemeName } from 'react-native';

export const colors = (scheme?: ColorSchemeName) => {
  const isDarkMode = scheme
    ? scheme === 'dark'
    : Appearance.getColorScheme() === 'dark';

  return {
    background: isDarkMode ? '#151515' : '#fafafa',
    primary: '#f06c62',
    secondary: '#b800b8',
    grayText: isDarkMode ? '#fafafa' : '#3f3f3f',
    white: '#ffffff',
    black: '#000000',
    transparent: 'transparent',
    inputBackground: isDarkMode ? '#222222' : '#efefef',
    inputPLText: isDarkMode ? '#6a6a6a' : '#9f9f9f',
    linkText: isDarkMode ? '#4aa3ff' : '#007bff',
  };
};
