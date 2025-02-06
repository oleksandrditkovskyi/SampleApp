import { StyleSheet } from 'react-native';

import { commonValues } from '@utils/commonValues';

export const styles = StyleSheet.create({
  glassEffect: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: commonValues.BORDER_RADIUS_16,
  },
});
