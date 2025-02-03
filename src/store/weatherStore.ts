import { create } from 'zustand';

import { WeatherDataProps } from '@utils/types';

export const useWeatherStore = create(set => ({
  loading: true,
  weatherStoreData: {},
  setWeatherStoreData: (data: WeatherDataProps) =>
    set({ weatherStoreData: data }),
  setLoading: () => set((state: boolean) => ({ loading: !state })),
}));
