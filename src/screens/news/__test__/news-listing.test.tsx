import React from 'react';
import 'react-native';
import NewsListingScreen from '../news-listing';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import renderer from 'react-test-renderer';
import { test, expect } from '@jest/globals';

test('News Listing Screen Snapshot', () => {
  const snap = renderer
    .create(
      <SafeAreaProvider>
        <NavigationContainer>
          <NewsListingScreen />
        </NavigationContainer>
      </SafeAreaProvider>,
    )
    .toJSON();

  expect(snap).toMatchSnapshot();
});
