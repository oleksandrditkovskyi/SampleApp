import { BlurView } from '@react-native-community/blur';

import { commonValues } from '@utils/commonValues';

import { styles } from './styles';

export const BaseBlurView = ({ dark = false }) =>
  commonValues.IS_IOS && (
    <BlurView
      blurAmount={commonValues.SIZE_20}
      blurType={dark ? 'dark' : 'light'}
      reducedTransparencyFallbackColor="white"
      style={styles.glassEffect}
    />
  );
