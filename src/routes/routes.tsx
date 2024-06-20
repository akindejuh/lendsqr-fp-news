import { ComponentType } from 'react';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

import {
  AuthStackParamList,
  AppStackParamList,
  HomeTabParamList,
} from './types';

// Screens for the authStack
import SignInScreen from 'src/screens/auth/sign-in';
import SignUpScreen from 'src/screens/auth/sign-up';

// Screens for the appStack
import HomeTab from 'src/routes/home-tab';
import NewsDetailsScreen from 'src/screens/news/details';

// Screens for the HomeTab BottomTab
import NewsListingScreen from 'src/screens/news/listing';
import ProfileScreen from 'src/screens/profile/profile';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';

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
  { name: 'SignInScreen', component: SignInScreen },
  { name: 'SignUpScreen', component: SignUpScreen },
];

export const appRoutes: Array<Route<AppStackParamList>> = [
  { name: 'HomeTab', component: HomeTab },
  { name: 'NewsDetailsScreen', component: NewsDetailsScreen },
];

export const homeTabRoutes: Array<BottomTabRoute> = [
  {
    name: 'NewsListingScreen',
    component: NewsListingScreen,
    options: { tabBarLabel: 'News' },
  },
  {
    name: 'ProfileScreen',
    component: ProfileScreen,
    options: { tabBarLabel: 'Profile' },
  },
];
