import { ComponentType } from 'react';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

import {
  AuthStackParamList,
  AppStackParamList,
  NewsStackParamsList,
} from './types';

// Used directly in the authStack
import SignInScreen from 'src/screens/auth/sign-in';
import SignUpScreen from 'src/screens/auth/sign-up';

// Stack for NewsScreens to be injected into AppStack
import NewsStack from './stacks/news-stack';

// Screens for News Stack
import NewsListingScreen from 'src/screens/news/listing';
import NewsDetailsScreen from 'src/screens/news/details';

interface Route<List extends Record<string, object | undefined>> {
  name: keyof List;
  component: ComponentType<any>;
  options?: NativeStackNavigationOptions;
}

export const authRoutes: Array<Route<AuthStackParamList>> = [
  { name: 'SignInScreen', component: SignInScreen },
  { name: 'SignUpScreen', component: SignUpScreen },
];
export const appRoutes: Array<Route<AppStackParamList>> = [
  {
    name: 'NewsStack',
    component: NewsStack,
  },
];

export const newsRoutes: Array<Route<NewsStackParamsList>> = [
  {
    name: 'NewsListingScreen',
    component: NewsListingScreen,
  },
  {
    name: 'NewsDetailsScreen',
    component: NewsDetailsScreen,
  },
];
