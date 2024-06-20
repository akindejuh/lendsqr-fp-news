import React, { ReactNode, useCallback, useEffect, useRef } from 'react';
import crashlytics from '@react-native-firebase/crashlytics';
import { recordCrashlyticsError } from 'src/utils/crashlytics-handler';

export type ICrashReportProviderProps = React.FC<{
  children: ReactNode;
}>;

export const CrashReportProvider: ICrashReportProviderProps =
  function CrashReportProvider({ children }) {
    const abortController = useRef<AbortController>();

    const initialize = useCallback(async () => {
      try {
        if (crashlytics().isCrashlyticsCollectionEnabled) {
          return;
        }
        await crashlytics().setCrashlyticsCollectionEnabled(true);
      } catch (err) {
        recordCrashlyticsError(err);
        if (abortController.current?.signal.aborted) {
          return;
        }
      }
    }, []);

    useEffect(function componentDidMount() {
      abortController.current = new AbortController();
      initialize();
      return function componentWillUnmount() {
        if (abortController.current?.signal.aborted === false) {
          abortController.current.abort();
        }
      };
    });

    return <>{children}</>;
  };
