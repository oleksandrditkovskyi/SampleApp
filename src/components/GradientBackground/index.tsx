import React, { useMemo } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { getGradientColors, getTimeOfDay } from './methods';
import { GradientBackgroundProps } from './types';

import { styles } from './styles';

export const GradientBackground: React.FC<GradientBackgroundProps> = ({
  children,
  weatherType = 'clear',
}) => {
  const timeOfDay = useMemo(() => getTimeOfDay(), []);
  const colors = useMemo(
    () => getGradientColors(weatherType, timeOfDay),
    [weatherType, timeOfDay],
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
