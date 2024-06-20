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
        const success = await fetchAndActivateConfig();
        if (abortController.current?.signal.aborted) {
          return;
        }
        if (!success) {
          Alert.alert(
            'App Launch Failed!',
            'Please ensure you are have a stable internet connection and try again.',
            [{ text: 'Try again', onPress: initialize }],
            { cancelable: false },
          );
          return;
        }
        setIsReady(true);
      } catch (err) {
        recordCrashlyticsError(err);
        if (abortController.current?.signal.aborted) {
          return;
        }
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
