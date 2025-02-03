import { api } from '@services/api/api';
import { ENDPOINTS } from '@services/api/endpoints';

export const getCityWeather = async (city: string) => {
  const response = await api.get(ENDPOINTS.WEATHER.GET_CITY_WEATHER(city), {
    params: {
      units: 'metric',
    },
  });
  return response.data;
};
