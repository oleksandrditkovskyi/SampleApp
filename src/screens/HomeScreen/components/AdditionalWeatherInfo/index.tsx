import { View } from 'react-native';

import { BaseText } from '@components/BaseText';

import { commonValues } from '@utils/commonValues';
import { WeatherDataProps } from '@utils/types';

import { CloudRainIcon } from '@assets/images/svg/CloudRainIcon';
import { HumidityIcon } from '@assets/images/svg/HumidityIcon';
import { PressureIcon } from '@assets/images/svg/PressureIcon';
import { WindIcon } from '@assets/images/svg/WindIcon';

import { styles } from './styles';

type Props = {
  weatherData: WeatherDataProps;
  next24hoursData: WeatherDataProps[];
};

export const AdditionalWeatherInfo = ({
  weatherData,
  next24hoursData,
}: Props) => {
  const chanceOfRain = `${Math.round(
    Math.max(...next24hoursData.map(el => el.pop)) * 100,
  )}%`;

  return (
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
            <BaseText size={commonValues.FONT_SIZE_12} value={chanceOfRain} />

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
};
