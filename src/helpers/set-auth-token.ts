import { api } from './';

export const setAuthToken = (token: string) => {
  if (token) {
    api.defaults.headers.common['x-access-token'] = `${token}`;
  } else {
    delete api.defaults.headers.common['x-access-token'];
  }
};