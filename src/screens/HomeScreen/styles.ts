import { StyleSheet } from 'react-native';

import { colors } from '@utils/colors';
import { commonValues } from '@utils/commonValues';

export const styles = StyleSheet.create({
  container: {
    flex: commonValues.FLEX_1,
    padding: commonValues.SIZE_16,
    paddingTop: commonValues.HEADER_HEIGHT + commonValues.SIZE_16,
  },
  mainInfoWrap: {
    alignItems: 'center',
  },
  img: {
    width: 200,
    height: 200,
    overflow: 'hidden',
    borderRadius: 100,
  },
  dateWrap: {
    flexDirection: 'row',
  },
  verticalLine: {
    width: commonValues.SIZE_2,
    backgroundColor: colors.WHITE,
    marginHorizontal: commonValues.SIZE_12,
  },
  separator: {
    width: commonValues.SIZE_16,
  },
  flatListWrap: {
    marginTop: commonValues.SIZE_16,
  },
  flatList: {
    padding: commonValues.SIZE_16,
  },
  androidBlur: {
    backgroundColor: colors.WHITE_TRANSPARENT_20,
    borderRadius: commonValues.SIZE_12,
  },
  plusBtn: {
    alignItems: 'center',
    padding: commonValues.SIZE_16,
    borderRadius: commonValues.BORDER_RADIUS_12,
    backgroundColor: colors.WHITE_TRANSPARENT_20,
  },
});
