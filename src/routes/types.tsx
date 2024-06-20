import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  AuthStack: NavigatorScreenParams<AuthStackParamList> | undefined;
  AppStack: NavigatorScreenParams<AppStackParamList> | undefined;
};

export type AuthStackParamList = {
  LoginScreen: undefined;
  SignUpScreen: undefined;
};

export type AppStackParamList = {
  HomeTab: NavigatorScreenParams<HomeTabParamList> | undefined;
  NewsDetailsScreen: {
    news_id: string;
  };
};

export type HomeTabParamList = {
  NewsListingScreen: undefined;
  ProfileScreen: undefined;
};

export type MenuScreenProps<Screen extends keyof HomeTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<HomeTabParamList, Screen>,
    NativeStackScreenProps<AppStackParamList>
  >;

export type AuthStackScreenProps<Screen extends keyof AuthStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<AuthStackParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

export type AppStackScreenProps<Screen extends keyof AppStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<AppStackParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

export {};
