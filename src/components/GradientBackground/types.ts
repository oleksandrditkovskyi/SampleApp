export type GradientBackgroundProps = {
  children: React.ReactNode;
  weatherType?: WeatherType;
};

export type WeatherType = 'clear' | 'clouds' | 'rain' | 'thunderstorm';

export type TimeOfDay = 'morning' | 'day' | 'evening' | 'night';
