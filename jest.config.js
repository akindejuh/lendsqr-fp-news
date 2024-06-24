module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js', '@testing-library/jest-native/extend-expect'],
  setupFiles: [
    "./node_modules/@react-native-google-signin/google-signin/jest/build/jest/setup.js",
    "<rootDir>/node_modules/appcenter/test/AppCenterMock.js",
    "<rootDir>/node_modules/appcenter-analytics/test/AppCenterAnalyticsMock.js",
    "<rootDir>/node_modules/appcenter-crashes/test/AppCenterCrashesMock.js",
    
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|@react-native-firebase|@react-native-google-signin|react-native-screens|@react-native-community|@react-native-picker|@react-native-svg|react-native-splash-screen|react-native-responsive-screen|react-native-toast-message|@react-native-firebase/crashlytics|@react-native-firebase/analytics|@react-native-firebase/app|@react-native-firebase/auth|@react-native-firebase/messaging|@react-native-firebase/perf|@react-native-firebase/remote-config|react-native-encrypted-storage)|react-native-share/)',
  ],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^react-native-encrypted-storage$': '<rootDir>/__mocks__/react-native-encrypted-storage.mock.ts',
  },
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
};
