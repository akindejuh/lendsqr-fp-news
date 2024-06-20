import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { successToast } from 'src/helpers';
import messaging from '@react-native-firebase/messaging';
import { useAuth } from '../auth-config/interfaces';
import { logCrashlystics } from 'src/utils/crashlytics-handler';

interface NotificationContextProps {
  deviceToken?: string;
  setFetchToken?: Dispatch<SetStateAction<boolean | undefined>>;
}

export const NotificationContext = createContext<NotificationContextProps>({
  deviceToken: undefined,
  setFetchToken: undefined,
});

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const authState = useAuth();
  const [token, setToken] = useState<string>();
  const [fetchToken, setFetchToken] = useState<boolean>();

  const initializeMessaging = useCallback(async () => {
    const authStatus = await messaging().requestPermission();

    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled && !!authState?.user?.uid) {
      const newToken = await messaging().getToken();
      setToken(newToken);
      logCrashlystics(`Authorization status: ${authStatus}`);
    }

    const onNotificationOpenedAppHandler = messaging().onNotificationOpenedApp(
      async remoteMessage => {
        logCrashlystics(JSON.stringify(remoteMessage));
      },
    );

    const initialNotification = await messaging().getInitialNotification();
    if (initialNotification) {
      logCrashlystics(JSON.stringify(initialNotification));
    }

    return () => {
      onNotificationOpenedAppHandler();
    };
  }, [authState?.user?.uid]);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      logCrashlystics(JSON.stringify(remoteMessage));
      const data = remoteMessage?.notification;
      successToast({ title: data?.title, message: data?.body });
    });

    initializeMessaging();
    return unsubscribe;
  }, [fetchToken, initializeMessaging]);

  return (
    <NotificationContext.Provider value={{ deviceToken: token, setFetchToken }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
