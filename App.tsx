/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { FunctionComponent } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import RootStack from './src/routes/root-stack';
import SplashScreen from 'react-native-splash-screen';
import { Platform } from 'react-native';

const App: FunctionComponent = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer
        onReady={() => Platform.OS === 'android' && SplashScreen.hide()}>
        <RootStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
