import { api } from '@services/api/api';
import { ENDPOINTS } from '@services/api/endpoints';

export const getWeather = async (lat: number, lon: number) => {
  const response = await api.get(
    ENDPOINTS.WEATHER.GET_LOCATION_WEARHER(lat, lon),
    {
      params: {
        units: 'metric',
      },
    },
  );
  return response.data;
};
