import axios, { InternalAxiosRequestConfig } from 'axios';
import { EnvConfig } from '../utils/get-env';

async function useAuthentication(config: InternalAxiosRequestConfig) {
  config.baseURL = EnvConfig.baseURL;

  // const token = await loadString("userToken");
  // if (token) {
  //   config.headers.authorization = `Bearer ${token}`;
  // }

  return config;
}

const instance = axios.create({
  timeout: 30 * 1000,
});

instance.interceptors.request.use(useAuthentication);

export default instance;
