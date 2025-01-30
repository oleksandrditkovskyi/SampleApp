import { BASE_URL } from '@env';
import axios from 'axios';

export const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(
  config => config,
  error => Promise.reject(error),
);

api.interceptors.response.use(
  response => response,
  error => Promise.reject(error),
);
