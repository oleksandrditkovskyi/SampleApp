import { memo } from 'react';
import { Image, View } from 'react-native';

import { format } from 'date-fns';

import { BaseText } from '@components/BaseText';

import { commonValues } from '@utils/commonValues';
import { WeatherDataProps } from '@utils/types';

import { CloudRainIcon } from '@assets/images/svg/CloudRainIcon';
import { HumidityIcon } from '@assets/images/svg/HumidityIcon';

import { styles } from './styles';

type Props = {
  item: WeatherDataProps;
};

export const ForecastFor5Days = memo(({ item }: Props) => (
  <View style={styles.container}>
    <BaseText medium style={styles.week} value={format(item.dt_txt, 'EEE')} />

    <View style={styles.rainWrap}>
      <Image
        style={styles.img}
        source={{
          uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
        }}
      />

      <BaseText
        size={commonValues.FONT_SIZE_12}
        value={`${Math.round(item.main.temp_min)}°`}
      />
    </View>

    <View style={styles.rainWrap}>
      <CloudRainIcon size={commonValues.SIZE_20} />

      <BaseText
        size={commonValues.FONT_SIZE_12}
        value={`${Math.round(item.pop * 100)}%`}
      />
    </View>

    <View style={styles.rainWrap}>
      <HumidityIcon size={commonValues.SIZE_20} />

      <BaseText
        size={commonValues.FONT_SIZE_12}
        value={`${Math.round(item.main.humidity)}%`}
      />
    </View>

    <BaseText
      size={commonValues.FONT_SIZE_12}
      style={styles.temp}
      value={`${item.wind.speed} m/s`}
    />
  </View>
));
