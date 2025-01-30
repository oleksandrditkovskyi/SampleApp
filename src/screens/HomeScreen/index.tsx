import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from '@navigation/AppNavigator';

import { ManageLocationIcon } from '@assets/images/svg/ManageLocationIcon';
import { SettingsIcon } from '@assets/images/svg/SettingsIcon';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const onPressManageLocation = () => navigation.navigate('ManageLocation');
  const onPressSettings = () => navigation.navigate('Settings');

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
