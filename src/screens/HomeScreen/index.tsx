import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { getWeather } from './api';

import { RootStackParamList } from '@navigation/AppNavigator';

import { ManageLocationIcon } from '@assets/images/svg/ManageLocationIcon';
import { SettingsIcon } from '@assets/images/svg/SettingsIcon';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface WeatherData {
  main: {
    temp: number;
  };
}

export const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(
    null,
  );

  const onPressManageLocation = () => navigation.navigate('ManageLocation');
  const onPressSettings = () => navigation.navigate('Settings');

  const fetchWeather = async (lat: number, lon: number) => {
    try {
      const data = await getWeather(lat, lon);
      setWeather(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const coords = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };
        setLocation(coords);
        fetchWeather(coords.lat, coords.lon);
      },
      error => error,
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <View style={styles.container}>
      <Pressable style={styles.btn} onPress={onPressManageLocation}>
        <ManageLocationIcon />
      </Pressable>

      <Pressable style={styles.btn} onPress={onPressSettings}>
        <SettingsIcon />
      </Pressable>

      <Text>Home</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
  },
  btn: {
    padding: 5,
  },
});
