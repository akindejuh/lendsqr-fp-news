import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
  recordCrashlyticsError,
  logCrashlystics,
} from '../utils/crashlytics-handler';

export const setupGoogleSignIn = () => {
  try {
    logCrashlystics('Configuring Google SignIn!');
    GoogleSignin.configure({
      webClientId:
        '980578462378-8fmfelkskfjvh7iav9n1comoa7r2jhhd.apps.googleusercontent.com',
    });

    logCrashlystics('Google SignIn Configuration successful!');
  } catch (err) {
    recordCrashlyticsError(err);
  }
};
