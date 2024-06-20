import React from 'react';
import 'react-native';
import NewsDetailScreen from '../news-details';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import renderer from 'react-test-renderer';
import { test, expect } from '@jest/globals';

test('News Detail Snapshot', () => {
  const snap = renderer
    .create(
      <SafeAreaProvider>
        <NavigationContainer>
          <NewsDetailScreen />
        </NavigationContainer>
      </SafeAreaProvider>,
    )
    .toJSON();

  expect(snap).toMatchSnapshot();
});
