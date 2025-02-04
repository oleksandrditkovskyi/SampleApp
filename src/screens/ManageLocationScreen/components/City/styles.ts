import { StyleSheet } from 'react-native';

import { colors } from '@utils/colors';
import { commonValues } from '@utils/commonValues';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: commonValues.FLEX_1,
    padding: commonValues.SIZE_16,
    justifyContent: 'space-between',
    borderRadius: commonValues.BORDER_RADIUS_12,
    backgroundColor: colors.WHITE_TRANSPARENT_20,
  },
  descriptionWrap: {
    alignItems: 'flex-end',
  },
  img: {
    width: commonValues.SIZE_40,
    height: commonValues.SIZE_40,
  },
  border: {
    borderColor: colors.WHITE,
    ...StyleSheet.absoluteFillObject,
    borderWidth: commonValues.BORDER_WIDTH_1,
    borderRadius: commonValues.BORDER_RADIUS_12,
  },
});
