import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { fetchAndActivateConfig } from '../../utils/remote-config';
import { Alert } from 'react-native';
import { recordCrashlyticsError } from 'src/utils/crashlytics-handler';

export type IRemoteconfigProviderProps = React.FC<{
  children: ReactNode;
}>;

export const RemoteConfigProvider: IRemoteconfigProviderProps =
  function RemoteConfigProvider({ children }) {
    const [isReady, setIsReady] = useState<boolean>(false);
    const abortController = useRef<AbortController>();

    const initialize = useCallback(async () => {
      try {
        // fetch and activate remote configs
        const success = await fetchAndActivateConfig();
        // stop if action has been aborted
        if (abortController.current?.signal.aborted) {
          return;
        }
        // ask the user to try again
        if (!success) {
          Alert.alert(
            'App Launch Failed!',
            'Please ensure you are have a stable internet connection and try again.',
            [{ text: 'Try again', onPress: initialize }],
            { cancelable: false },
          );
          return;
        }
        // start the app
        setIsReady(true);
      } catch (err) {
        recordCrashlyticsError(err);
        // stop if action has been aborted
        if (abortController.current?.signal.aborted) {
          return;
        }
        // ask user to try again
        Alert.alert(
          'Error',
          'An unexpected error has occurred, please try again.',
          [{ text: 'Try again', onPress: initialize }],
          { cancelable: false },
        );
      }
    }, []);

    useEffect(function componentDidMount() {
      initialize();
      abortController.current = new AbortController();
      return function componentWillUnmount() {
        const abrtController = abortController.current;
        if (abrtController?.signal.aborted === false) {
          abrtController.abort();
        }
      };
    });

    if (!isReady) {
      return null;
    }

    return <>{children}</>;
  };
