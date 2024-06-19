import { API_BASE_URL } from '@env';

const getEnv = <T>(name: string): T => {
  if (name === undefined || name === null) {
    throw new Error(`Environment variable ${name} is required!`);
  }
  return name as unknown as T;
};

export const EnvConfig = {
  baseURL: getEnv<string>(API_BASE_URL),
};
