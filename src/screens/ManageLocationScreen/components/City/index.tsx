import { Dispatch, memo, SetStateAction, useEffect, useState } from 'react';
import { Image, Pressable, View } from 'react-native';

import { getCityWeather } from './api';

import { BaseText } from '@components/BaseText';

import { commonValues } from '@utils/commonValues';
import { WeatherDataProps, WeatherStore } from '@utils/types';

import { useWeatherStore } from '@store/weatherStore';

import { styles } from './styles';

type Props = {
  item: string;
  array: string[];
  setSelectedCities: Dispatch<SetStateAction<string[]>>;
};
export const City = memo(({ item, array, setSelectedCities }: Props) => {
  const { setWeatherStoreData } = useWeatherStore() as WeatherStore;
  const [data, setData] = useState<WeatherDataProps>();

  const fetchWeather = async () => {
    try {
      const res = await getCityWeather(item);

      setData(res);
    } catch (e) {
      // TODO: add errors handling
      setSelectedCities(array.filter(el => el !== item));
      console.error(e);
    }
  };

  useEffect(() => {
    (async () => await fetchWeather())();
  }, [item]);

  return (
    data && (
      <Pressable
        style={styles.container}
        // onPress={() => setWeatherStoreData(data)}
      >
        <View>
          <BaseText value={data?.name || ''} />

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
