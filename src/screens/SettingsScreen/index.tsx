import { Text, View } from 'react-native';

import { BaseText } from '@components/BaseText';

import { styles } from './styles';

export const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <BaseText size={20} value="Settings Screen" />
    </View>
  );
};
