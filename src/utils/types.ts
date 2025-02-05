export type WeatherDataProps = {
  name: string;
  dt_txt: string;
  coord: {
    lat: number;
    lon: number;
  };
  weather: {
    icon: string;
    description: string;
  }[];
  dt: number;
  main: {
    temp: number;
    humidity: number;
    pressure: number;
    temp_min: number;
    temp_max: number;
  };
  wind: {
    speed: number;
  };
  pop: number;
};

export type WeatherStore = {
  loading: boolean;
  isGeolocation: boolean;
  weatherStoreData: WeatherDataProps;
  setLoading: (value: boolean) => void;
  setIsGeolocation: (value: boolean) => void;
  setWeatherStoreData: (data: WeatherDataProps) => void;
};
