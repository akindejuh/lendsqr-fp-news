import axios, { InternalAxiosRequestConfig } from 'axios';
import { recordCrashlyticsError } from 'src/utils/crashlytics-handler';
import { fetchAndActivateConfig, getBaseConfig } from 'src/utils/remote-config';
import perf, { FirebasePerformanceTypes } from '@react-native-firebase/perf';

interface AxiosRequestConfigWithMetadata<T = unknown>
  extends InternalAxiosRequestConfig<T> {
  metadata?: FirebasePerformanceTypes.HttpMetric;
}

async function useRequestConfig(config: AxiosRequestConfigWithMetadata) {
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

  try {
    const httpMetric = perf().newHttpMetric(
      config?.url as string,
      config?.method as any,
    );
    config.metadata = httpMetric;

    await httpMetric.start();
  } finally {
    return config;
  }

  // return config;
}

const instance = axios.create({
  timeout: 60 * 1000,
});

instance.interceptors.request.use(useRequestConfig);

instance.interceptors.response.use(
  async function (response) {
    try {
      const httpMetric = (response.config as any).metadata;
      httpMetric.setHttpResponseCode(response.status);
      httpMetric.setResponseContentType(response.headers['content-type']);
      await httpMetric.stop();
    } finally {
      return response;
    }
  },
  async function (error) {
    try {
      const { httpMetric } = error.config.metadata;
      httpMetric.setHttpResponseCode(error.response.status);
      httpMetric.setResponseContentType(error.response.headers['content-type']);
      await httpMetric.stop();
    } finally {
      return Promise.reject(error);
    }
  },
);

export default instance;
