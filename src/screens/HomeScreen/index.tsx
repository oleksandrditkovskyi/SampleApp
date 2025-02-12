import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, View } from 'react-native';
import { Pressable, ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { getWeather5Days } from './api';
import { format } from 'date-fns';

import { RootStackParamList } from '@navigation/AppNavigator';

import { BaseBlurView } from '@components/BaseBlurView';
import { BaseText } from '@components/BaseText';
import { Line } from '@components/Line';
import { AdditionalWeatherInfo } from './components/AdditionalWeatherInfo';
import { ForecastFor5Days } from './components/ForecastFor5Days';
import { Next24HoursItem } from './components/Next24HoursItem';

import { colors } from '@utils/colors';
import { commonValues } from '@utils/commonValues';
import { WeatherDataProps, WeatherStore } from '@utils/types';

import { useWeatherStore } from '@store/weatherStore';

import { ManageLocationIcon } from '@assets/images/svg/ManageLocationIcon';

import { styles } from './styles';

export const HomeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const { weatherStoreData, loading } = useWeatherStore() as WeatherStore;

  const [forecastFor5Days, setForecastFor5Days] = useState<WeatherDataProps[]>(
    [],
  );
  const [next24hoursData, setNext24hoursData] = useState<WeatherDataProps[]>(
    [],
  );

  const localeDate = weatherStoreData?.dt
    ? new Date(weatherStoreData?.dt * 1000)
    : '';

  const onPressPlus = () => navigation.navigate('ManageLocation');

  const fetchWeather = async (lat: number, lon: number) => {
    try {
      const data5Days = await getWeather5Days(lat, lon);
      const data24Hours = data5Days.list.slice(0, 8);
      const filteredData5Days = data5Days.list.filter(
        (item: WeatherDataProps) => item.dt_txt.includes('12:00:00'),
      );

      setForecastFor5Days(filteredData5Days);
      setNext24hoursData(data24Hours);
    } catch (error) {
      console.error(error);
    } finally {
    }
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
    if (weatherStoreData.coord) {
      fetchWeather(weatherStoreData.coord.lat, weatherStoreData.coord.lon);
    }
  }, [weatherStoreData]);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <SafeAreaView edges={['top']} />

      {!loading ? (
        weatherStoreData.coord ? (
          <>
            <View style={!commonValues.IS_IOS && styles.androidBlur}>
              <BaseBlurView />

              <>
                <View style={styles.mainInfoWrap}>
                  <Image
                    resizeMode={'contain'}
                    style={styles.img}
                    source={{
                      uri: `https://openweathermap.org/img/wn/${weatherStoreData.weather[0].icon}@4x.png`,
                    }}
                  />

                  <View style={styles.dateWrap}>
                    <BaseText value={format(localeDate, 'MMM dd')} />

                    <View style={styles.verticalLine} />

                    <BaseText value={format(localeDate, 'EEEE')} />
                  </View>

                  <BaseText
                    bold
                    size={commonValues.FONT_SIZE_72}
                    value={`${Math.round(weatherStoreData.main.temp)}°`}
                  />

                  <BaseText value={weatherStoreData.weather[0].description} />
                </View>

                <Line marginHorizontal={commonValues.SIZE_16} />

                <AdditionalWeatherInfo
                  next24hoursData={next24hoursData}
                  weatherData={weatherStoreData}
                />
              </>
            </View>

            {next24hoursData.length > 0 && (
              <View
                style={[
                  styles.flatListWrap,
                  !commonValues.IS_IOS && styles.androidBlur,
                ]}
              >
                <BaseBlurView />

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

            {forecastFor5Days.length > 0 && (
              <View
                style={[
                  styles.flatListWrap,
                  !commonValues.IS_IOS && styles.androidBlur,
                ]}
              >
                <BaseBlurView />

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
          </>
        ) : (
          <Pressable style={styles.plusBtn} onPress={onPressPlus}>
            <ManageLocationIcon />
          </Pressable>
        )
      ) : (
        <ActivityIndicator color={colors.WHITE} />
      )}

      <SafeAreaView edges={['bottom']} />
    </ScrollView>
  );
};
