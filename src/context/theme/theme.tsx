import React, { useEffect, useState } from 'react';
import {
  CustomThemeContext,
  ICustomThemeProvider,
  ICustomTheme,
} from './interfaces';
import { Appearance, ColorSchemeName } from 'react-native';
import { IColors, colors } from '../../design-system/colors';
import { useAppSelector } from 'src/redux/store';
import { getThemeState } from 'src/redux/slice/theme/theme-slice';

export const CustomThemeProvider: ICustomThemeProvider =
  function CustomThemeProvider({ children }) {
    const { theme } = useAppSelector(getThemeState);

    const [customTheme, setCustomTheme] = useState<ICustomTheme>(
      theme || 'system',
    );
    const [systemScheme, setSystemScheme] = useState<ColorSchemeName>(
      Appearance.getColorScheme(),
    );

    useEffect(() => {
      const subscription = Appearance.addChangeListener(({ colorScheme }) => {
        setSystemScheme(colorScheme);
      });

      return () => {
        subscription.remove();
      };
    }, []);

    useEffect(() => {
      setCustomTheme(theme);
    }, [theme]);

    const themeColors: IColors =
      customTheme === 'system'
        ? systemScheme === 'dark'
          ? colors.dark
          : colors.light
        : customTheme === 'light'
        ? colors.light
        : colors.dark;

    return (
      <CustomThemeContext.Provider
        value={{
          colors: themeColors,
          currentTheme: customTheme === 'system' ? systemScheme : customTheme,
          setCustomTheme,
        }}>
        {children}
      </CustomThemeContext.Provider>
    );
  };
