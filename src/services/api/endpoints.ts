import { API_KEY } from '@env';

export const ENDPOINTS = {
  WEATHER: {
    GET_LOCATION_WEARHER: (lat: number, lon: number) =>
      `weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`,
    GET_WEATHER_5_DAYS: (lat: number, lon: number) =>
      `forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`,
  },
};
