import { useState } from 'react';
import { Switch, View } from 'react-native';

import { BlurView } from '@react-native-community/blur';

import { BaseText } from '@components/BaseText';

import { colors } from '@utils/colors';
import { commonValues } from '@utils/commonValues';

import { styles } from './styles';

export const SettingsScreen = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
      <BlurView
        blurAmount={commonValues.SIZE_20}
        blurType="dark"
        reducedTransparencyFallbackColor="white"
        style={styles.glassEffect}
      />

      <Switch
        thumbColor={colors.WHITE}
        trackColor={{ true: colors.GREEN_IOS }}
        value={isEnabled}
        onValueChange={toggleSwitch}
      />

      <BaseText size={20} value="Settings Screen" />
    </View>
  );
};
