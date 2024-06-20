import {
  GoogleSignin,
  isErrorWithCode,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {
  logCrashlystics,
  recordCrashlyticsError,
} from 'src/utils/crashlytics-handler';
import analytics from '@react-native-firebase/analytics';
import auth from '@react-native-firebase/auth';

export async function SignInUserWithGoogle() {
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const userInfo = await GoogleSignin.signIn();
    await analytics().setUserId(userInfo.user.id);
    const googleCredential = auth.GoogleAuthProvider.credential(
      userInfo?.idToken,
    );
    const googleAuth = auth().signInWithCredential(googleCredential);
    return googleAuth;
  } catch (err) {
    if (isErrorWithCode(err)) {
      switch (err.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          logCrashlystics('User cancelled sign in flow: ' + err.message);
          break;
        case statusCodes.IN_PROGRESS:
          logCrashlystics('The user is being signed in: ' + err.message);
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          logCrashlystics(
            'User does not have google play services: ' + err.message,
          );
          break;
        default:
          recordCrashlyticsError(err);
      }
    } else {
      recordCrashlyticsError(err);
    }
  }
}
