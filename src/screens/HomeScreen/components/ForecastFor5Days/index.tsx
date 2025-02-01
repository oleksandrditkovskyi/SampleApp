import { memo } from 'react';
import { Image, View } from 'react-native';

import { format } from 'date-fns';

import { BaseText } from '@components/BaseText';

import { commonValues } from '@utils/commonValues';
import { WeatherDataProps } from '@utils/types';

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
        value={`${Math.round(item.pop * 100)}% rain`}
      />
    </View>

    <BaseText
      size={commonValues.FONT_SIZE_12}
      style={styles.temp}
      value={`${Math.round(item.main.temp_min)}°/${Math.round(item.main.temp_max)}°`}
    />
  </View>
));
