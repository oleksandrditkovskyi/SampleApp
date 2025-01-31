export type WeatherDataProps = {
  name: string;
  weather: {
    icon: string;
    description: string;
  }[];
  dt: number;
  main: {
    temp: number;
    humidity: number;
    pressure: number;
  };
  wind: {
    speed: number;
  };
  pop: number;
};
