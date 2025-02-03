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
  setLoading: (state: boolean) => void;
  weatherStoreData: WeatherDataProps;
  setWeatherStoreData: (data: WeatherDataProps) => void;
};
