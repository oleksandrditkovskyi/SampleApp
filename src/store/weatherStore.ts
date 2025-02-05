import { create } from 'zustand';

import { WeatherDataProps } from '@utils/types';

export const useWeatherStore = create(set => ({
  loading: false,
  isGeolocation: false,
  weatherStoreData: {},
  setWeatherStoreData: (data: WeatherDataProps) =>
    set({ weatherStoreData: data }),
  setLoading: (value: boolean) => set({ loading: value }),
  setIsGeolocation: (value: boolean) => set({ isGeolocation: value }),
}));
