import { View } from 'react-native';

import { BlurView } from '@react-native-community/blur';

import { BaseText } from '@components/BaseText';

import { commonValues } from '@utils/commonValues';

import { styles } from './styles';

export const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <BlurView
        blurAmount={commonValues.SIZE_20}
        blurType="light"
        reducedTransparencyFallbackColor="white"
        style={styles.glassEffect}
      />

      <BaseText size={20} value="Settings Screen" />
    </View>
  );
};
