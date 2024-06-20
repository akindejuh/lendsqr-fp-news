/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { FunctionComponent, useEffect, useRef } from 'react';
import { ActivityIndicator, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import RootStack from 'src/routes/root-stack';
import store, { persistor } from 'src/redux/store';
import { getNewsListing } from 'src/domain/news';
import { requestAndroidNotifications } from 'src/utils/android-notifications';
import Toast from 'react-native-toast-message';
import codePush from 'react-native-code-push';
import analytics from '@react-native-firebase/analytics';
import { RemoteConfigProvider } from 'src/context/remote-config/remote-config-provider';
import { CrashReportProvider } from 'src/context/crash-report/crash-report-provider';
import { logCrashlystics } from 'src/utils/crashlytics-handler';
import { AuthConfigProvider } from 'src/context/auth-config/auth-config';
import { PersistGate } from 'redux-persist/integration/react';
import { View } from 'src/components';
import { setupGoogleSignIn } from 'src/configs/google';
import { colors } from 'src/design-system';

const App: FunctionComponent = () => {
  const navigationRef: any = useRef();
  const routeNameRef: any = useRef();

  useEffect(() => {
    setupGoogleSignIn();
    logCrashlystics('FP News is launched!');
    // This is used here because I used a server that spins down after a period of inactivity
    getNewsListing({
      page: '1',
      search: '',
    });
    requestAndroidNotifications();
  }, []);

  return (
    <>
      <AuthConfigProvider>
        <CrashReportProvider>
          <RemoteConfigProvider>
            <SafeAreaProvider>
              <NavigationContainer
                ref={navigationRef}
                onReady={() => {
                  Platform.OS === 'android' && SplashScreen.hide();
                  routeNameRef.current =
                    navigationRef.current.getCurrentRoute().name;
                }}
                onStateChange={async () => {
                  const previousRouteName = routeNameRef.current;
                  const currentRouteName =
                    navigationRef.current.getCurrentRoute().name;

                  if (previousRouteName !== currentRouteName) {
                    await analytics().logScreenView({
                      screen_name: currentRouteName,
                      screen_class: currentRouteName,
                    });
                  }
                  routeNameRef.current = currentRouteName;
                }}>
                <Provider store={store}>
                  <PersistGate
                    loading={
                      <View
                        flex={1}
                        justifyContent="center"
                        alignItems="center">
                        <ActivityIndicator color={colors().grayText} />
                      </View>
                    }
                    persistor={persistor}
                  />
                  <RootStack />
                  <Toast />
                </Provider>
              </NavigationContainer>
            </SafeAreaProvider>
          </RemoteConfigProvider>
        </CrashReportProvider>
      </AuthConfigProvider>
    </>
  );
};

export default codePush(App);

// const codePushOptions = {
//   checkFrequency: codePush.CheckFrequency.ON_APP_START,
//   updateDialog: {
//     appendReleaseDescription: true,
//     descriptionPrefix: '\n\nChange log:\n',
//     title: 'Update available',
//     mandatoryContinueButtonLabel: 'Update',
//     mandatoryUpdateMessage: 'An update is available that must be installed.',
//     optionalIgnoreButtonLabel: 'Later',
//     optionalInstallButtonLabel: 'Install',
//     optionalUpdateMessage:
//       'An update is available. Would you like to install it?',
//   },
//   installMode: codePush.InstallMode.IMMEDIATE,
// };
// const CodePushApp = codePush(codePushOptions)(
//   class CodePushApp extends React.Component {
//     codePushStatusDidChange(status) {
//       switch (status) {
//         case codePush.SyncStatus.CHECKING_FOR_UPDATE:
//           logCrashlystics('CodePush: Checking for updates.');
//           break;
//         case codePush.SyncStatus.DOWNLOADING_PACKAGE:
//           logCrashlystics('CodePush: Downloading package.');
//           break;
//         case codePush.SyncStatus.INSTALLING_UPDATE:
//           logCrashlystics('CodePush: Installing update.');
//           break;
//         case codePush.SyncStatus.UP_TO_DATE:
//           logCrashlystics('CodePush: Up to date.');
//           break;
//         case codePush.SyncStatus.UPDATE_INSTALLED:
//           logCrashlystics('CodePush: Update installed.');
//           break;
//       }
//     }

//     codePushDownloadDidProgress(progress) {
//       logCrashlystics(
//         `CodePush: Downloading ${progress.receivedBytes} of ${progress.totalBytes} bytes.`,
//       );
//     }

//     componentDidCatch(error, errorInfo) {
//       logCrashlystics(`CodePush: ${error}`, errorInfo);
//     }

//     render() {
//       return <App />;
//     }
//   },
// );
// export default CodePushApp;
