import { ComponentType } from 'react';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

import { AuthStackParamList, AppStackParamList } from './types';

// Screens for the authStack
import SignInScreen from 'src/screens/auth/sign-in';
import SignUpScreen from 'src/screens/auth/sign-up';

// Screens for the appStack
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
    name: 'NewsListingScreen',
    component: NewsListingScreen,
  },
  {
    name: 'NewsDetailsScreen',
    component: NewsDetailsScreen,
  },
];
