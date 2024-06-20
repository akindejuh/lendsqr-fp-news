import React, { ComponentType } from 'react';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

import {
  AuthStackParamList,
  AppStackParamList,
  HomeTabParamList,
} from './types';

// Screens for the authStack
import LoginScreen from 'src/screens/auth/login';
import SignUpScreen from 'src/screens/auth/sign-up';

// Screens for the appStack
import HomeTab from 'src/routes/home-tab';
import NewsDetailsScreen from 'src/screens/news/news-details';

// Screens for the HomeTab BottomTab
import NewsListingScreen from 'src/screens/news/news-listing';
import ProfileScreen from 'src/screens/profile/profile';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { Icon, Image, View } from 'src/components';
import { images } from 'src/assets/images/images';
import { colors } from 'src/design-system';
import { ViewStyle } from 'react-native';

interface Route<List extends Record<string, object | undefined>> {
  name: keyof List;
  component: ComponentType<any>;
  options?: NativeStackNavigationOptions;
}

interface BottomTabRoute {
  name: keyof HomeTabParamList;
  component: ComponentType;
  options?: BottomTabNavigationOptions;
}

export const authRoutes: Array<Route<AuthStackParamList>> = [
  { name: 'LoginScreen', component: LoginScreen },
  { name: 'SignUpScreen', component: SignUpScreen },
];

export const appRoutes: Array<Route<AppStackParamList>> = [
  { name: 'HomeTab', component: HomeTab },
  { name: 'NewsDetailsScreen', component: NewsDetailsScreen },
];

export const homeTabRoutes: (
  photoURL?: string | null,
) => Array<BottomTabRoute> = photoURL => {
  return [
    {
      name: 'NewsListingScreen',
      component: NewsListingScreen,
      options: {
        tabBarLabel: 'News',
        tabBarIcon: ({ color }) => {
          return (
            <>
              <Icon
                name="home"
                color={colors().background}
                style={{ color } as ViewStyle}
                size={40}
              />
            </>
          );
        },
      },
    },
    {
      name: 'ProfileScreen',
      component: ProfileScreen,
      options: {
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color }) => {
          return (
            <View
              width={40}
              height={40}
              borderRadius={40}
              padding={2}
              borderWidth={2}
              borderColor={color}>
              <Image
                sourceFile={
                  photoURL
                    ? {
                        uri: photoURL || '',
                      }
                    : images.defaultUser
                }
                borderRadius={40}
                width={32}
                height={32}
              />
            </View>
          );
        },
      },
    },
  ];
};
