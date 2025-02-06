import { useEffect, useState } from 'react';
import { Switch, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BlurView } from '@react-native-community/blur';

import { BaseText } from '@components/BaseText';
import { Line } from '@components/Line';

import { colors } from '@utils/colors';
import { commonValues } from '@utils/commonValues';
import { getFromStorage, saveToStorage } from '@utils/storageService';
import { STORAGE_KEYS } from '@utils/storageService/storageKeys';

import { styles } from './styles';

export const SettingsScreen = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled(previousState => {
      const newState = !previousState;
      saveToStorage(STORAGE_KEYS.IS_ALWAYS_USE_GEOLOCATION, newState);
      return newState;
    });
  };

  useEffect(() => {
    const getData = async () => {
      const storeValue = await getFromStorage<boolean>(
        STORAGE_KEYS.IS_ALWAYS_USE_GEOLOCATION,
      );
      setIsEnabled(!!storeValue);
    };

    getData();
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} />

      <BlurView
        blurAmount={commonValues.SIZE_20}
        blurType="dark"
        reducedTransparencyFallbackColor="white"
        style={styles.glassEffect}
      />

      <View style={styles.geoSettings}>
        <BaseText value="Always use geolocation" />

        <Switch
          thumbColor={colors.WHITE}
          trackColor={{ true: colors.GREEN_IOS }}
          value={isEnabled}
          onValueChange={toggleSwitch}
        />
      </View>

      <BaseText
        color={colors.WHITE_TRANSPARENT_40}
        size={commonValues.FONT_SIZE_10}
        value="Geolocation will be enabled automatically on every app launch."
      />

      <Line />

      <BaseText value="About" />
    </View>
  );
};
