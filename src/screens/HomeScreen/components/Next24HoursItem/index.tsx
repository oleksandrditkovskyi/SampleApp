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

export const Next24HoursItem = memo(({ item }: Props) => (
  <View style={styles.container}>
    <BaseText medium value={format(item.dt_txt, 'HH:mm')} />

    <Image
      style={styles.img}
      source={{
        uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
      }}
    />

    <BaseText
      size={commonValues.FONT_SIZE_12}
      value={`${Math.round(item.main.temp_min)}°/${Math.round(item.main.temp_max)}°`}
    />

    <BaseText
      size={commonValues.FONT_SIZE_12}
      value={`${Math.round(item.pop * 100)}% rain`}
    />
  </View>
));
