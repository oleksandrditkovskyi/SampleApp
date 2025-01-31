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

import { WeatherStore } from '@utils/types';

import { useWeatherStore } from '@store/index';

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
        style={styles.headerLeft}
        onPress={() => navigation.navigate('ManageLocation')}
      >
        <ManageLocationIcon />
      </Pressable>
    ),
    headerRight: () => (
      <Pressable
        style={styles.headerRight}
        onPress={() => navigation.navigate('Settings')}
      >
        <SettingsIcon />
      </Pressable>
    ),
  });

  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: 'transparent',
        },
      }}
    >
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerTransparent: true,
        }}
      >
        <Stack.Screen
          component={ManageLocationScreen}
          name="ManageLocation"
          options={{
            animation: 'reveal_from_bottom',
          }}
        />

        <Stack.Screen
          component={HomeScreen}
          name="Home"
          options={homeOptions}
        />

        <Stack.Screen component={SettingsScreen} name="Settings" />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
