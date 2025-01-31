import { View } from 'react-native';

import { WeatherDataProps } from '@screens/HomeScreen/types';

import { BaseText } from '@components/BaseText';

import { commonValues } from '@utils/commonValues';

import { CloudRainIcon } from '@assets/images/svg/CloudRainIcon';
import { HumidityIcon } from '@assets/images/svg/HumidityIcon';
import { PressureIcon } from '@assets/images/svg/PressureIcon';
import { WindIcon } from '@assets/images/svg/WindIcon';

import { styles } from './styles';

type Props = {
  weatherData: WeatherDataProps;
  weather5DaysData: WeatherDataProps[];
};

export const AdditionalWeatherInfo = ({
  weatherData,
  weather5DaysData,
}: Props) => (
  <View style={styles.container}>
    <View style={styles.infoWrap}>
      <View style={styles.info}>
        <WindIcon />

        <View>
          <BaseText
            size={commonValues.FONT_SIZE_12}
            value={`${weatherData.wind.speed} m/s`}
          />

          <BaseText size={commonValues.FONT_SIZE_12} value="Wind" />
        </View>
      </View>

      <View style={styles.info}>
        <PressureIcon />

        <View>
          <BaseText
            size={commonValues.FONT_SIZE_12}
            value={`${weatherData.main.pressure} hPa`}
          />

          <BaseText size={commonValues.FONT_SIZE_12} value="Pressure" />
        </View>
      </View>
    </View>

    <View style={styles.infoWrap}>
      <View style={styles.info}>
        <CloudRainIcon />

        <View>
          <BaseText
            size={commonValues.FONT_SIZE_12}
            value={`${weather5DaysData[0].pop * 100} %`}
          />

          <BaseText size={commonValues.FONT_SIZE_12} value="Chance of rain" />
        </View>
      </View>

      <View style={styles.info}>
        <HumidityIcon />

        <View>
          <BaseText
            size={commonValues.FONT_SIZE_12}
            value={`${weatherData.main.humidity}%`}
          />

          <BaseText size={commonValues.FONT_SIZE_12} value="Humidity" />
        </View>
      </View>
    </View>
  </View>
);
