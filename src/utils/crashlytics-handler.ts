import crashlytics from '@react-native-firebase/crashlytics';

export const recordCrashlyticsError = (err: any) => {
  crashlytics().recordError(new Error(JSON.stringify(err)));
};

export const logCrashlystics = (data: string) => {
  crashlytics().log(data);
};
