import { Pressable } from 'react-native';

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
  const {
    weatherStoreData: { name },
  } = useWeatherStore() as WeatherStore;

  const homeOptions = ({
    navigation,
  }: {
    navigation: StackNavigationProp<RootStackParamList, 'Home', undefined>;
  }) => ({
    headerTitle: () => <BaseText bold value={name} />,
    headerLeft: () => (
      <Pressable
        hitSlop={hitSlop}
        style={styles.headerLeft}
        onPress={() => navigation.navigate('ManageLocation')}
      >
        <ManageLocationIcon />
      </Pressable>
    ),
    headerRight: () => (
      <Pressable
        hitSlop={hitSlop}
        style={styles.headerRight}
        onPress={() => navigation.navigate('Settings')}
      >
        <SettingsIcon />
      </Pressable>
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
          options={{
            animation: 'slide_from_right',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
