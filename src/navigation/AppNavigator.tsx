import React from 'react';
import { Pressable } from 'react-native';
import Reanimated, {
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';

import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';

import { HomeScreen } from '@screens/HomeScreen';
import { ManageLocationScreen } from '@screens/ManageLocationScreen';
import { SettingsScreen } from '@screens/SettingsScreen';

import { BaseText } from '@components/BaseText';

import { colors } from '@utils/colors';
import { hitSlop } from '@utils/commonValues';
import { WeatherStore } from '@utils/types';

import { useWeatherStore } from '@store/weatherStore';

import { CloseIcon } from '@assets/images/svg/CloseIcon';
import { LocationMarkerIcon } from '@assets/images/svg/LocationMarkerIcon';
import { ManageLocationIcon } from '@assets/images/svg/ManageLocationIcon';
import { SettingsIcon } from '@assets/images/svg/SettingsIcon';

import { styles } from './styles';

export type RootStackParamList = {
  Home: undefined;
  Settings: undefined;
  ManageLocation: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  const { weatherStoreData, isGeolocation, setIsGeolocation } =
    useWeatherStore() as WeatherStore;

  const derivedBackgroundColor = useDerivedValue(() => {
    return withTiming(
      isGeolocation ? colors.GREEN_IOS : colors.WHITE_TRANSPARENT_20,
      { duration: 200 },
    );
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: derivedBackgroundColor.value,
    };
  });

  const onPressLocationCircle = () => setIsGeolocation(!isGeolocation);

  const homeOptions = ({
    navigation,
  }: {
    navigation: StackNavigationProp<RootStackParamList, 'Home', undefined>;
  }) => ({
    headerTitle: () => (
      <BaseText
        value={weatherStoreData.name}
        onPress={() => navigation.navigate('ManageLocation')}
      />
    ),
    headerLeft: () => (
      <Pressable
        hitSlop={hitSlop}
        style={styles.headerLeft}
        onPress={() => navigation.navigate('ManageLocation')}
      >
        <ManageLocationIcon />
      </Pressable>
    ),
    headerRightContainerStyle: styles.headerRightContainerStyle,
    headerRight: () => (
      <>
        <Reanimated.View style={[styles.locationCircle, animatedStyle]}>
          <Pressable hitSlop={hitSlop} onPress={onPressLocationCircle}>
            <LocationMarkerIcon />
          </Pressable>
        </Reanimated.View>

        <Pressable
          hitSlop={hitSlop}
          style={styles.headerRight}
          onPress={() => navigation.navigate('Settings')}
        >
          <SettingsIcon />
        </Pressable>
      </>
    ),
  });

  const manageLocationOptions = ({
    navigation,
  }: {
    navigation: StackNavigationProp<
      RootStackParamList,
      'ManageLocation',
      undefined
    >;
  }) => ({
    headerTitle: () => <BaseText bold value={'Manage Location'} />,
    headerLeft: () => null,
    headerRight: () => (
      <Pressable
        hitSlop={hitSlop}
        style={styles.headerRight}
        onPress={() => navigation.goBack()}
      >
        <CloseIcon />
      </Pressable>
    ),
  });

  const settingsOptions = {
    headerBackButtonDisplayMode: 'minimal' as const,
    headerTitle: () => <BaseText bold value={'Settings'} />,
    headerTintColor: colors.WHITE,
    animation: 'slide_from_right' as const,
  };

  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: colors.TRANSPARENT,
        },
      }}
    >
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerTransparent: true,
          presentation: 'transparentModal',
        }}
      >
        <Stack.Screen
          component={ManageLocationScreen}
          name="ManageLocation"
          options={manageLocationOptions}
        />

        <Stack.Screen
          component={HomeScreen}
          name="Home"
          options={homeOptions}
        />

        <Stack.Screen
          component={SettingsScreen}
          name="Settings"
          options={settingsOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
