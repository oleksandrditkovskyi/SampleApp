import { StyleSheet } from 'react-native';

import { colors } from '@utils/colors';
import { commonValues } from '@utils/commonValues';

export const styles = StyleSheet.create({
  container: {
    flex: commonValues.FLEX_1,
    padding: commonValues.SIZE_16,
    paddingTop: commonValues.HEADER_HEIGHT + commonValues.SIZE_16,
  },
  glassEffect: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: commonValues.BORDER_RADIUS_16,
  },
  multiSelectContainerStyle: {
    borderWidth: 0,
    overflow: 'hidden',
    borderRadius: commonValues.SIZE_12,
    backgroundColor: colors.WHITE_TRANSPARENT_20,
  },
  multiSelectItemTextStyle: {
    color: colors.WHITE,
  },
  multiSelectStyle: {
    height: commonValues.SIZE_40,
    padding: commonValues.SIZE_12,
    borderRadius: commonValues.BORDER_RADIUS_12,
    backgroundColor: colors.WHITE_TRANSPARENT_20,
  },
});
