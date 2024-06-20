import { Appearance } from 'react-native';
import { getThemeState } from 'src/redux/slice/theme/theme-slice';
import { useAppSelector } from 'src/redux/store';

const useAppearance = () => {
  const userSetting = useAppSelector(getThemeState);
  const getSystemAppearance = Appearance.getColorScheme();

  switch (userSetting?.theme) {
    case 'system':
      Appearance.setColorScheme(getSystemAppearance);
      break;
    case 'dark':
      Appearance.setColorScheme('dark');
      break;
    case 'light':
      Appearance.setColorScheme('light');
      break;
    default:
      Appearance.setColorScheme('light');
      break;
  }
};

export default useAppearance;
