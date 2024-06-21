import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeTabParamList } from './types';
import { homeTabRoutes } from './routes';
import { colors } from 'src/design-system';
import { useAuth } from 'src/context/auth-config/interfaces';
import { Appearance, Platform } from 'react-native';

const BottomTab = createBottomTabNavigator<HomeTabParamList>();

export default function HomeTab() {
  const authState = useAuth();
  const isIOS = Platform.OS === 'ios';

  const [cScheme, setCScheme] = useState(Appearance.getColorScheme());
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setCScheme(colorScheme);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const themeColors = colors(cScheme);

  return (
    <BottomTab.Navigator
      initialRouteName={'NewsListingScreen'}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: themeColors.primary,
        tabBarStyle: {
          backgroundColor: themeColors.background,
          height: isIOS ? 80 : 63,
          paddingTop: isIOS ? 10 : 0,
          shadowColor: themeColors.grayText,
          shadowOffset: {
            width: 2,
            height: 2,
          },
          shadowOpacity: 0.75,
          shadowRadius: 3,
          elevation: 5,
        },
      }}>
      {homeTabRoutes(authState?.user?.photoURL).map((screen, index) => {
        return (
          <BottomTab.Screen
            key={index}
            {...screen}
            name={screen.name}
            component={screen.component}
            options={{ ...screen.options }}
          />
        );
      })}
    </BottomTab.Navigator>
  );
}
