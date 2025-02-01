import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, View } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BlurView } from '@react-native-community/blur';

import { getWeather, getWeather5Days } from './api';
import { format } from 'date-fns';

import { BaseText } from '@components/BaseText';
import { Line } from '@components/Line';
import { AdditionalWeatherInfo } from './components/AdditionalWeatherInfo';
import { ForecastFor5Days } from './components/ForecastFor5Days';
import { Next24HoursItem } from './components/Next24HoursItem';

import { colors } from '@utils/colors';
import { commonValues } from '@utils/commonValues';
import { WeatherDataProps, WeatherStore } from '@utils/types';

import { useWeatherStore } from '@store/weatherStore';

import { styles } from './styles';

export const HomeScreen = () => {
  const { setWeatherStoreData } = useWeatherStore() as WeatherStore;

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [weatherData, setWeatherData] = useState<WeatherDataProps | null>(null);
  const [weather5DaysData, setWeather5DaysData] = useState<WeatherDataProps[]>(
    [],
  );
  const [forecastFor5Days, setForecastFor5Days] = useState<WeatherDataProps[]>(
    [],
  );
  const [next24hoursData, setNext24hoursData] = useState<WeatherDataProps[]>(
    [],
  );
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(
    null,
  );

  const localeDate = weatherData?.dt ? new Date(weatherData?.dt * 1000) : '';

  const fetchWeather = async (lat: number, lon: number) => {
    setIsLoading(true);
    try {
      const data = await getWeather(lat, lon);
      const data5Days = await getWeather5Days(lat, lon);
      const data24Hours = data5Days.list.slice(0, 8);
      const filteredData5Days = data5Days.list
        .filter((item: WeatherDataProps) => item.dt_txt.includes('12:00:00'))
        .slice(1);

      setForecastFor5Days(filteredData5Days);
      setWeatherStoreData(data);
      setNext24hoursData(data24Hours);
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

  const renderItem24Hours = useCallback(
    ({ item }: { item: WeatherDataProps }) => <Next24HoursItem item={item} />,
    [next24hoursData],
  );

  const renderItem5Days = useCallback(
    ({ item }: { item: WeatherDataProps }) => <ForecastFor5Days item={item} />,
    [forecastFor5Days],
  );

  const ItemSeparatorComponent = () => <View style={styles.separator} />;

  const keyExtractor = (item: WeatherDataProps) => String(item.dt);

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <SafeAreaView edges={['top']} />

      {weatherData && !isLoading ? (
        <View>
          <BlurView
            blurAmount={commonValues.SIZE_20}
            blurType="light"
            reducedTransparencyFallbackColor="white"
            style={styles.glassEffect}
          />

          <View>
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
        </View>
      ) : (
        <ActivityIndicator color={colors.WHITE} />
      )}

      {next24hoursData.length > 0 && !isLoading && (
        <View style={styles.flatListWrap}>
          <BlurView
            blurAmount={commonValues.SIZE_20}
            blurType="light"
            reducedTransparencyFallbackColor="white"
            style={styles.glassEffect}
          />

          <FlatList
            horizontal
            data={next24hoursData}
            ItemSeparatorComponent={ItemSeparatorComponent}
            keyExtractor={keyExtractor}
            renderItem={renderItem24Hours}
            showsHorizontalScrollIndicator={false}
            style={styles.flatList}
          />
        </View>
      )}

      {forecastFor5Days.length > 0 && !isLoading && (
        <View style={styles.flatListWrap}>
          <BlurView
            blurAmount={commonValues.SIZE_20}
            blurType="light"
            reducedTransparencyFallbackColor="white"
            style={styles.glassEffect}
          />

          <FlatList
            data={forecastFor5Days}
            ItemSeparatorComponent={ItemSeparatorComponent}
            keyExtractor={keyExtractor}
            renderItem={renderItem5Days}
            scrollEnabled={false}
            style={styles.flatList}
          />
        </View>
      )}

      <SafeAreaView edges={['bottom']} />
    </ScrollView>
  );
};
