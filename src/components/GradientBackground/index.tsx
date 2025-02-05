import React, { useMemo } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { getGradientColors, getTimeOfDay } from './methods';
import { GradientBackgroundProps, TimeOfDay, WeatherType } from './types';
import { addSeconds, fromUnixTime } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

import { WeatherStore } from '@utils/types';

import { useWeatherStore } from '@store/weatherStore';

import { styles } from './styles';

export const GradientBackground: React.FC<GradientBackgroundProps> = ({
  children,
}) => {
  const { weatherStoreData } = useWeatherStore() as WeatherStore;

  const utcDate = fromUnixTime(weatherStoreData?.dt);
  const localDate = toZonedTime(
    addSeconds(utcDate, weatherStoreData?.timezone),
    'UTC',
  );

  const timeOfDay = useMemo(
    () => getTimeOfDay(localDate.getHours()),
    [weatherStoreData],
  );
  const colors = useMemo(
    () =>
      getGradientColors(
        weatherStoreData.weather?.[0]?.main.toLowerCase() as WeatherType,
        timeOfDay as TimeOfDay,
      ),
    [weatherStoreData, timeOfDay],
  );

  return (
    <LinearGradient
      colors={colors}
      end={{ x: 0, y: 1 }}
      start={{ x: 0, y: 0 }}
      style={styles.gradient}
    >
      <SafeAreaProvider>{children}</SafeAreaProvider>
    </LinearGradient>
  );
};
