import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from '@navigation/AppNavigator';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const onPressManageLocation = () => navigation.navigate('ManageLocation');
  const onPressSettings = () => navigation.navigate('Settings');

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.manageLocationBtn}
        onPress={onPressManageLocation}
      />

      <Pressable style={styles.settingsBtn} onPress={onPressSettings} />

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
  manageLocationBtn: {
    width: 24,
    height: 24,
    backgroundColor: 'purple',
  },
  settingsBtn: {
    width: 24,
    height: 24,
    backgroundColor: 'royalblue',
  },
});
