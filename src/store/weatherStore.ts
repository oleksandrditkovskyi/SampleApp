import { create } from 'zustand';

import { WeatherDataProps } from '@utils/types';

export const useWeatherStore = create(set => ({
  weatherStoreData: {
    name: '',
    dt_txt: '',
    weather: {
      icon: '',
      description: '',
    },
    dt: null,
    main: {
      temp: null,
      humidity: null,
      pressure: null,
      temp_min: null,
      temp_max: null,
    },
    wind: {
      speed: null,
    },
    pop: null,
  },
  setWeatherStoreData: (data: WeatherDataProps) =>
    set({ weatherStoreData: data }),
}));
