import { View } from 'react-native';

import { BaseText } from '@components/BaseText';

import { styles } from './styles';

export const ManageLocationScreen = () => {
  return (
    <View style={styles.container}>
      <BaseText size={20} value="Manage Location Screen" />
    </View>
  );
};
