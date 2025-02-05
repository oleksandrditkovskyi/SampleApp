import { TimeOfDay, WeatherType } from './types';

import { TIME_OF_DAY } from '@utils/constants';

export const getTimeOfDay = (hours: number) => {
  if (hours >= 5 && hours < 12) return TIME_OF_DAY.MORNING;
  if (hours >= 12 && hours < 17) return TIME_OF_DAY.DAY;
  if (hours >= 17 && hours < 20) return TIME_OF_DAY.NIGHT;
  return TIME_OF_DAY.NIGHT;
};

export const getGradientColors = (
  weatherType: WeatherType,
  timeOfDay: TimeOfDay,
) => {
  const gradients = {
    clear: {
      morning: ['#FF9A9E', '#FAD0C4'],
      day: ['#4DA0B0', '#D39D38'],
      evening: ['#FF512F', '#DD2476'],
      night: ['#0F2027', '#203A43'],
    },
    clouds: {
      morning: ['#606c88', '#906c88'],
      day: ['#606c88', '#3f4c6b'],
      evening: ['#403B4A', '#E7E9BB'],
      night: ['#1F1C2C', '#2C2C2C'],
    },
    rain: {
      morning: ['#373B44', '#4286f4'],
      day: ['#373B44', '#4286f4'],
      evening: ['#232526', '#414345'],
      night: ['#1F1C2C', '#2C2C2C'],
    },
    thunderstorm: {
      morning: ['#23074d', '#cc5333'],
      day: ['#23074d', '#cc5333'],
      evening: ['#200122', '#6f0000'],
      night: ['#16222A', '#3A6073'],
    },
  };

  return gradients[weatherType]?.[timeOfDay] || gradients.clear[timeOfDay];
};
