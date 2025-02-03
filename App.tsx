import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppNavigator } from '@navigation/AppNavigator';

import ErrorBoundary from '@components/ErrorBoundary';
import { GradientBackground } from '@components/GradientBackground';

import { getWeather } from '@utils/api';
import { commonValues } from '@utils/commonValues';
import { WeatherStore } from '@utils/types';

import { useWeatherStore } from '@store/weatherStore';

const App = () => {
  const { weatherStoreData, setWeatherStoreData, setLoading } =
    useWeatherStore() as WeatherStore;

  const fetchWeather = async (lat: number, lon: number) => {
    setLoading(true);
    try {
      const data = await getWeather(lat, lon);

      setWeatherStoreData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getLocation = () => {
    if (weatherStoreData.coord) {
      fetchWeather(weatherStoreData.coord.lat, weatherStoreData.coord.lon);
    } else {
      Geolocation.getCurrentPosition(
        position => {
          const coords = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          };
          fetchWeather(coords.lat, coords.lon);
        },
        error => error,
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    }
  };

  useEffect(() => getLocation(), []);

  return (
    <ErrorBoundary>
      <GestureHandlerRootView style={styles.container}>
        <GradientBackground weatherType="clear">
          <SafeAreaView edges={['right', 'left']} style={styles.container}>
            <AppNavigator />
          </SafeAreaView>
        </GradientBackground>
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: commonValues.FLEX_1,
  },
});

export default App;
