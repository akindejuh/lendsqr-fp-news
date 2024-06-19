import { Platform } from 'react-native';
import {
  RESULTS,
  checkNotifications,
  requestNotifications,
} from 'react-native-permissions';

const RequestNotification = () => {
  requestNotifications([
    'alert',
    'sound',
    'badge',
    'provisional',
    'providesAppSettings',
  ]).then(() => {});
};

const requestAndroidNotifications = () => {
  if (Platform.OS === 'android') {
    checkNotifications().then(({ status }: any) => {
      switch (status) {
        case RESULTS.DENIED:
          RequestNotification();
          break;
        case RESULTS.BLOCKED:
          RequestNotification();
          break;
        default:
          break;
      }
    });
  }
};

export { requestAndroidNotifications };
