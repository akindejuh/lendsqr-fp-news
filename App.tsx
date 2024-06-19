/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { FunctionComponent, useEffect } from 'react';
import { Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import RootStack from 'src/routes/root-stack';
import store from 'src/redux/store';
import { getNewsListing } from 'src/domain/news';
import { requestAndroidNotifications } from 'src/utils/android-notifications';

const App: FunctionComponent = () => {
  useEffect(() => {
    // This is used here because I used a server that spins down after a period of inactivity
    getNewsListing({
      page: '1',
      search: '',
    });
    requestAndroidNotifications();
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer
        onReady={() => Platform.OS === 'android' && SplashScreen.hide()}>
        <Provider store={store}>
          <RootStack />
        </Provider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
