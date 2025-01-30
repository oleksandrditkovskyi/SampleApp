import { API_KEY } from '@env';

export const ENDPOINTS = {
  WEATHER: {
    GET_LOCATION_WEARHER: (lat: number, lon: number) =>
      `?lat=${lat}&lon=${lon}&appid=${API_KEY}`,
  },
};
