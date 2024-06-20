import axios, { InternalAxiosRequestConfig } from 'axios';
import { recordCrashlyticsError } from 'src/utils/crashlytics-handler';
import { fetchAndActivateConfig, getBaseConfig } from 'src/utils/remote-config';

async function useAuthentication(config: InternalAxiosRequestConfig) {
  const baseUrlConfig = await getBaseConfig();

  if (!baseUrlConfig?.API_BASE_URL) {
    await fetchAndActivateConfig();
    recordCrashlyticsError(
      'Whoops, something went wrong, please try again in a moment.',
    );
    throw new Error(
      'Whoops, something went wrong, please try again in a moment.',
    );
  }

  config.baseURL = baseUrlConfig.API_BASE_URL;

  // const token = await loadString("userToken");
  // if (token) {
  //   config.headers.authorization = `Bearer ${token}`;
  // }

  return config;
}

const instance = axios.create({
  timeout: 60 * 1000,
});

instance.interceptors.request.use(useAuthentication);

export default instance;
