import React from 'react';
import 'react-native';
import LoginScreen from '../login';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import renderer from 'react-test-renderer';
import { test, expect } from '@jest/globals';

test('Login Screen Snapshot', () => {
  const snap = renderer
    .create(
      <SafeAreaProvider>
        <NavigationContainer>
          <LoginScreen />
        </NavigationContainer>
      </SafeAreaProvider>,
    )
    .toJSON();

  expect(snap).toMatchSnapshot();
});
