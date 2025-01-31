import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Pressable, View } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BlurView } from '@react-native-community/blur';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { getWeather, getWeather5Days } from './api';
import { WeatherDataProps } from './types';
import { format } from 'date-fns';

import { RootStackParamList } from '@navigation/AppNavigator';

import { BaseText } from '@components/BaseText';
import { Line } from '@components/Line';
import { AdditionalWeatherInfo } from './components/AdditionalWeatherInfo';

import { commonValues } from '@utils/commonValues';

import { ManageLocationIcon } from '@assets/images/svg/ManageLocationIcon';
import { SettingsIcon } from '@assets/images/svg/SettingsIcon';

import { styles } from './styles';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [weatherData, setWeatherData] = useState<WeatherDataProps | null>(null);
  const [weather5DaysData, setWeather5DaysData] = useState<WeatherDataProps[]>(
    [],
  );
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(
    null,
  );

  const localeDate = weatherData?.dt ? new Date(weatherData?.dt * 1000) : '';

  const onPressManageLocation = () => navigation.navigate('ManageLocation');
  const onPressSettings = () => navigation.navigate('Settings');

  const fetchWeather = async (lat: number, lon: number) => {
    setIsLoading(true);
    try {
      const data = await getWeather(lat, lon);
      const data5Days = await getWeather5Days(lat, lon);
      setWeather5DaysData(data5Days.list);
      setWeatherData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const coords = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };
        setLocation(coords);
        fetchWeather(coords.lat, coords.lon);
      },
      error => error,
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} />

      <View style={styles.header}>
        <Pressable style={styles.btn} onPress={onPressManageLocation}>
          <ManageLocationIcon />
        </Pressable>
        <BaseText
          bold
          value={weatherData ? `${weatherData.name}` : 'Loading...'}
        />

        <Pressable style={styles.btn} onPress={onPressSettings}>
          <SettingsIcon />
        </Pressable>
      </View>

      {weatherData && (
        <View>
          <BlurView
            blurAmount={20}
            blurType="light"
            reducedTransparencyFallbackColor="white"
            style={[styles.glassEffect, isLoading && styles.loading]}
          />

          {isLoading && (
            <ActivityIndicator
              animating={isLoading}
              color="#fff"
              style={[styles.glassEffect, isLoading && styles.loading]}
            />
          )}

          <View style={styles.mainInfoWrap}>
            <Image
              resizeMode={'contain'}
              style={styles.img}
              source={{
                uri: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`,
              }}
            />

            <View style={styles.dateWrap}>
              <BaseText value={format(localeDate, 'MMM dd')} />

              <View style={styles.werticalLine} />

              <BaseText value={format(localeDate, 'EEEE')} />
            </View>

            <BaseText
              bold
              size={commonValues.FONT_SIZE_72}
              value={`${Math.round(weatherData.main.temp)}°`}
            />

            <BaseText value={weatherData.weather[0].description} />
          </View>

          <Line marginHorizontal={commonValues.SIZE_16} />

          <AdditionalWeatherInfo
            weather5DaysData={weather5DaysData}
            weatherData={weatherData}
          />
        </View>
      )}
    </View>
  );
};
