import remoteConfig from '@react-native-firebase/remote-config';
import { IBaseConfig } from '../../src/utils/remote-config';
import { recordCrashlyticsError } from '../utils/crashlytics-handler';

export async function GetRemoteBaseConfigs(): Promise<IBaseConfig | null> {
  try {
    const rawData = remoteConfig().getValue('BASE_CONFIG').asString();

    // check if empty data was returned
    if (!rawData) {
      await remoteConfig().fetchAndActivate();
      return null;
    }

    return JSON.parse(rawData);
  } catch (err) {
    recordCrashlyticsError(err);
    return null;
  }
}
