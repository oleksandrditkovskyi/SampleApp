import { StyleSheet } from 'react-native';

import { colors } from '@utils/colors';
import { commonValues } from '@utils/commonValues';

const HEADER_HEIGHT = commonValues.SIZE_42;

export const styles = StyleSheet.create({
  container: {
    flex: commonValues.FLEX_1,
    padding: commonValues.SIZE_16,
    paddingTop: commonValues.SIZE_16 + HEADER_HEIGHT,
  },
  mainInfoWrap: {
    alignItems: 'center',
  },
  img: {
    width: 200,
    height: 200,
    overflow: 'hidden',
    borderRadius: commonValues.HALF,
  },
  dateWrap: {
    flexDirection: 'row',
  },
  werticalLine: {
    width: commonValues.SIZE_2,
    backgroundColor: colors.WHITE,
    marginHorizontal: commonValues.SIZE_12,
  },
  glassEffect: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: commonValues.BORDER_RADIUS_16,
  },
  separator: {
    width: commonValues.SIZE_16,
  },
  activityIndicator: {
    flex: commonValues.FLEX_1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatListWrap: {
    marginTop: commonValues.SIZE_16,
  },
  flatList: {
    padding: commonValues.SIZE_16,
  },
});
