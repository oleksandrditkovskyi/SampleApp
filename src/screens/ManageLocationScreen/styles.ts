import { StyleSheet } from 'react-native';

import { colors } from '@utils/colors';
import { commonValues } from '@utils/commonValues';

export const styles = StyleSheet.create({
  container: {
    flex: commonValues.FLEX_1,
    paddingTop: commonValues.HEADER_HEIGHT + commonValues.SIZE_16,
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
    marginHorizontal: commonValues.SIZE_16,
    borderRadius: commonValues.BORDER_RADIUS_12,
    backgroundColor: colors.WHITE_TRANSPARENT_20,
  },
  flatListWrap: {
    flex: commonValues.FLEX_1,
  },
  flatListStyle: {
    flex: commonValues.FLEX_1,
    paddingVertical: commonValues.SIZE_16,
  },
  deleteBtn: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: commonValues.SIZE_50,
    height: commonValues.SIZE_50,
  },
  separator: {
    height: commonValues.SIZE_16,
  },
  swipeableContainer: {
    paddingHorizontal: commonValues.SIZE_16,
  },
});
