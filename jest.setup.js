import { jest } from '@jest/globals';

jest.mock('@react-native-firebase/app', () => ({
  initializeApp: jest.fn(),
}));

jest.mock('@react-native-firebase/analytics', () => ({
  logEvent: jest.fn(),
  setCurrentScreen: jest.fn(),
}));

jest.mock('@react-native-firebase/auth', () => ({
  signInWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
}));

jest.mock('@react-native-firebase/crashlytics', () => ({
  recordError: jest.fn(),
}));

jest.mock('@react-native-firebase/messaging', () => ({
  getToken: jest.fn(),
  onMessage: jest.fn(),
}));

jest.mock('@react-native-firebase/perf', () => ({
  startTrace: jest.fn(),
  incrementMetric: jest.fn(),
  stopTrace: jest.fn(),
}));

jest.mock('@react-native-firebase/remote-config', () => {
  return () => ({
    setConfigSettings: jest.fn(),
    getValue: jest.fn().mockReturnValue({
      asString: jest.fn().mockReturnValue('{}'),
    }),
    fetchAndActivate: jest.fn().mockResolvedValue(undefined),
  });
});

jest.mock('react-native-encrypted-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

jest.mock('@react-native-google-signin/google-signin', () => ({
  GoogleSignin: jest.fn().mockReturnValue({
    signIn: jest.fn(),
    signOut: jest.fn(),
    revokeAccess: jest.fn(),
    getTokens: jest.fn(),
    getCurrentUser: jest.fn(),
  }),
}));

jest.mock('react-native-screens', () => ({
  enableScreens: jest.fn(),
  setEnabled: jest.fn(),
}));

jest.mock('react-native-splash-screen', () => ({
  hide: jest.fn(),
  show: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

jest.mock('react-native-responsive-screen', () => ({
  widthPercentageToDP: jest.fn(),
  heightPercentageToDP: jest.fn(),
}));

jest.mock('react-native-toast-message', () => ({
  showToast: jest.fn(),
}));

jest.mock('redux-persist', () => ({
  persistStore: jest.fn().mockReturnValue({}),
  persistReducer: jest.fn().mockImplementation((_, reducers) => reducers),
}));

jest.mock('react-native-share', () => ({
  open: jest.fn(),
  shareSingle: jest.fn(),
}));
