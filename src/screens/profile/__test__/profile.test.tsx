import React from 'react';
import 'react-native';
import ProfileScreen from '../profile';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import renderer from 'react-test-renderer';
import { test, expect } from '@jest/globals';

test('Profile Snapshot', () => {
  const snap = renderer
    .create(
      <SafeAreaProvider>
        <NavigationContainer>
          <ProfileScreen />
        </NavigationContainer>
      </SafeAreaProvider>,
    )
    .toJSON();

  expect(snap).toMatchSnapshot();
});
