import { useEffect } from 'react';
import { PermissionsAndroid, StyleSheet } from 'react-native';
import BootSplash from 'react-native-bootsplash';
import Geolocation from 'react-native-geolocation-service';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppNavigator } from '@navigation/AppNavigator';

import ErrorBoundary from '@components/ErrorBoundary';
import { GradientBackground } from '@components/GradientBackground';

import { getCityWeather, getWeather } from '@utils/api';
import { commonValues } from '@utils/commonValues';
import { getFromStorage } from '@utils/storageService';
import { STORAGE_KEYS } from '@utils/storageService/storageKeys';
import { WeatherDataProps, WeatherStore } from '@utils/types';

import { useWeatherStore } from '@store/weatherStore';

const App = () => {
  const { setLoading, isGeolocation, setIsGeolocation, setWeatherStoreData } =
    useWeatherStore() as WeatherStore;

  const requestLocationPermission = async () => {
    if (!commonValues.IS_IOS) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const fetchWeatherByLocation = async (lat: number, lon: number) => {
    setLoading(true);

    try {
      const dataLocation = await getWeather(lat, lon);

      setWeatherStoreData(dataLocation);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCity = async (city: string) => {
    setLoading(true);

    try {
      const dataCity = await getCityWeather(city);

      setWeatherStoreData(dataCity);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getLocation = async () => {
    const hasPermission = await requestLocationPermission();

    if (!hasPermission) {
      return null;
    }

    const [city, citiesList] = await Promise.all([
      getFromStorage<WeatherDataProps>(STORAGE_KEYS.SELECTED_CITY_WEATHER),
      getFromStorage<string[]>(STORAGE_KEYS.CITIES_LIST),
    ]);

    if (citiesList?.length && city && !isGeolocation) {
      fetchWeatherByCity(city.name);
    } else {
      Geolocation.getCurrentPosition(
        position => {
          const coords = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          };

          fetchWeatherByLocation(coords.lat, coords.lon);
          setIsGeolocation(true);
        },
        error => {
          if (error.code === 1) {
            console.error(error.message);
          }
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getLocation();
    };

    fetchData();
  }, [isGeolocation]);

  useEffect(() => {
    const getLocationSettings = async () => {
      const isAlwaysUseLocation = await getFromStorage(
        STORAGE_KEYS.IS_ALWAYS_USE_GEOLOCATION,
      );

      setIsGeolocation(!!isAlwaysUseLocation);
    };

    getLocationSettings();
  }, []);

  useEffect(() => {
    BootSplash.hide({ fade: true });
  }, []);

  return (
    <ErrorBoundary>
      <GestureHandlerRootView style={styles.container}>
        <GradientBackground>
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
