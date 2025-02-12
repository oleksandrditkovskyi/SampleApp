import { Dispatch, memo, SetStateAction, useEffect, useState } from 'react';
import { Image, Pressable, View } from 'react-native';
import Toast from 'react-native-toast-message';

import { BaseText } from '@components/BaseText';

import { getCityWeather } from '@utils/api';
import { commonValues } from '@utils/commonValues';
import { removeFromStorage, saveToStorage } from '@utils/storageService';
import { STORAGE_KEYS } from '@utils/storageService/storageKeys';
import { WeatherDataProps, WeatherStore } from '@utils/types';

import { useWeatherStore } from '@store/weatherStore';

import { styles } from './styles';

type Props = {
  item: string;
  array: string[];
  setSelectedCities: Dispatch<SetStateAction<string[]>>;
};
export const City = memo(({ item, array, setSelectedCities }: Props) => {
  const { weatherStoreData, setWeatherStoreData, setIsGeolocation } =
    useWeatherStore() as WeatherStore;
  const [data, setData] = useState<WeatherDataProps>();

  const isSelected =
    weatherStoreData?.name?.toLowerCase() === item?.toLowerCase();

  const onPress = async () => {
    if (data && !isSelected) {
      await saveToStorage(STORAGE_KEYS.SELECTED_CITY_WEATHER, data);
      setWeatherStoreData(data);
      setIsGeolocation(false);
    } else {
      setIsGeolocation(true);
      removeFromStorage(STORAGE_KEYS.SELECTED_CITY_WEATHER);
    }
  };

  const fetchWeather = async () => {
    try {
      const res = await getCityWeather(item);

      setData(res);
    } catch (e) {
      console.error(e);

      Toast.show({
        type: 'error',
        text1: 'Something went wrong.',
        position: 'bottom',
      });

      setSelectedCities(array.filter(el => el !== item));
    }
  };

  useEffect(() => {
    (async () => await fetchWeather())();
  }, [item]);

  return (
    data && (
      <Pressable style={styles.container} onPress={onPress}>
        {isSelected && <View style={styles.border} />}

        <View>
          <BaseText value={data?.name} />

          <BaseText
            size={commonValues.SIZE_12}
            value={`${Math.round(data.main.temp_min)}°/${Math.round(data.main.temp_max)}°`}
          />
        </View>

        <View style={styles.descriptionWrap}>
          <Image
            resizeMode={'contain'}
            style={styles.img}
            source={{
              uri: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
            }}
          />

          <BaseText
            size={commonValues.SIZE_12}
            value={data.weather[0].description}
          />
        </View>
      </Pressable>
    )
  );
});
