/**
 * @format
 */

import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';

const Root = () => {
  return <App />;
};

messaging().setBackgroundMessageHandler(async _remoteMessage => {});
const HeadlessCheck = ({ isHeadless }) => {
  if (isHeadless) {
    return null;
  }
  return <Root />;
};

AppRegistry.registerComponent(appName, () => HeadlessCheck);
