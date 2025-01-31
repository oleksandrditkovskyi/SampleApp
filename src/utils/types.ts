export type WeatherDataProps = {
  name: string;
  dt_txt: string;
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
  weatherStoreData: WeatherDataProps;
  setWeatherStoreData: (data: WeatherDataProps) => void;
};
