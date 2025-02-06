import { useEffect, useState } from 'react';
import { Linking, Pressable, Switch, View } from 'react-native';
import Reanimated, {
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BaseBlurView } from '@components/BaseBlurView';
import { BaseText } from '@components/BaseText';
import { Line } from '@components/Line';

import { colors } from '@utils/colors';
import { commonValues } from '@utils/commonValues';
import { getFromStorage, saveToStorage } from '@utils/storageService';
import { STORAGE_KEYS } from '@utils/storageService/storageKeys';
import { WeatherStore } from '@utils/types';

import { useWeatherStore } from '@store/weatherStore';

import { GitHubIcon } from '@assets/images/svg/GitHubIcon';
import { LinkedInIcon } from '@assets/images/svg/LinkedInIcon';

import { styles } from './styles';

export const SettingsScreen = () => {
  const { isGeolocation, setIsGeolocation } = useWeatherStore() as WeatherStore;

  const [isEnabled, setIsEnabled] = useState(false);
  const [isAboutVisible, seyIsAboutVisible] = useState(false);

  const derivedOpacity = useDerivedValue(() => {
    return withTiming(isAboutVisible ? 1 : 0, { duration: 1000 });
  });

  const opacityAnimated = useAnimatedStyle(() => {
    return {
      opacity: derivedOpacity.value,
    };
  });

  const onPressAbout = () => seyIsAboutVisible(prev => !prev);
  const onPressLinkedIn = () =>
    Linking.openURL('https://www.linkedin.com/in/oleksandrditkovskyi/');
  const onPressGitHub = () =>
    Linking.openURL('https://github.com/oleksandrditkovskyi');

  const toggleSwitch = () => {
    setIsEnabled(previousState => {
      const newState = !previousState;
      saveToStorage(STORAGE_KEYS.IS_ALWAYS_USE_GEOLOCATION, newState);
      if (!isGeolocation && newState) {
        setIsGeolocation(true);
      }
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

      <BaseBlurView dark />

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

      <BaseText style={styles.aboutText} value="About" onPress={onPressAbout} />

      <Reanimated.View style={[styles.aboutWrap, opacityAnimated]}>
        <BaseText value="The Weather App is a user-friendly mobile application designed to provide real-time weather information and forecasts. Built with React Native, the app offers a seamless experience across both iOS and Android platforms." />

        <View style={styles.iconsWrap}>
          <Pressable onPress={onPressLinkedIn}>
            <LinkedInIcon />
          </Pressable>

          <Pressable onPress={onPressGitHub}>
            <GitHubIcon />
          </Pressable>
        </View>
      </Reanimated.View>
    </View>
  );
};
