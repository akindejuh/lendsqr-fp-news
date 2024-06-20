import FBRemoteConfig from '@react-native-firebase/remote-config';
import { recordCrashlyticsError } from './crashlytics-handler';

export enum RemoteConfigKey {
  BASE_CONFIG = 'BASE_CONFIG',
}

export type IBaseConfig = {
  API_BASE_URL: string;
};

FBRemoteConfig().setConfigSettings({
  minimumFetchIntervalMillis: 30000,
});

export async function getConfigValue<R>(
  key: RemoteConfigKey,
): Promise<R | null> {
  try {
    const rawValue = FBRemoteConfig().getValue(key.toString()).asString();
    const value = JSON.parse(rawValue);
    return Promise.resolve(value);
  } catch (err) {
    recordCrashlyticsError(err);
    return Promise.resolve(null);
  }
}

export async function getBaseConfig(): Promise<IBaseConfig | null> {
  return getConfigValue(RemoteConfigKey.BASE_CONFIG);
}

export async function fetchAndActivateConfig(): Promise<boolean> {
  try {
    await FBRemoteConfig().fetchAndActivate();
    return Promise.resolve(true);
  } catch (err) {
    recordCrashlyticsError(err);
    const error = err as Error;
    if (/throttle|throttling/i.test(error.message)) {
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  }
}
