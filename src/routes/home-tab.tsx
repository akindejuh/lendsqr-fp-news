import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeTabParamList } from './types';
import { homeTabRoutes } from './routes';
import { colors } from 'src/design-system';

const BottomTab = createBottomTabNavigator<HomeTabParamList>();

export default function HomeTab() {
  return (
    <BottomTab.Navigator
      initialRouteName={'NewsListingScreen'}
      screenOptions={{
        headerShown: false,
        // tabBarShowLabel: false,
        tabBarActiveTintColor: colors.primary,
      }}>
      {homeTabRoutes.map((screen, index) => {
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
