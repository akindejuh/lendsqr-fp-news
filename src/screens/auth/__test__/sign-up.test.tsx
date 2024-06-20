import React from 'react';
import 'react-native';
import SignUpScreen from '../sign-up';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import renderer from 'react-test-renderer';
import { test, expect } from '@jest/globals';

test('Sign Up Snapshot', () => {
  const snap = renderer
    .create(
      <SafeAreaProvider>
        <NavigationContainer>
          <SignUpScreen />
        </NavigationContainer>
      </SafeAreaProvider>,
    )
    .toJSON();

  expect(snap).toMatchSnapshot();
});
