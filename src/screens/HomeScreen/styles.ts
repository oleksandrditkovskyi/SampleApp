import { StyleSheet } from 'react-native';

import { colors } from '@utils/colors';
import { commonValues } from '@utils/commonValues';

export const styles = StyleSheet.create({
  container: {
    flex: commonValues.FLEX_1,
    padding: commonValues.SIZE_16,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: commonValues.SIZE_16,
  },
  btn: {
    padding: commonValues.SIZE_6,
  },
  mainInfoWrap: {
    alignItems: 'center',
  },
  img: {
    width: 200,
    height: 200,
    overflow: 'hidden',
    borderRadius: '50%',
  },
  dateWrap: {
    flexDirection: 'row',
  },
  werticalLine: {
    width: 2,
    backgroundColor: colors.WHITE,
    marginHorizontal: commonValues.SIZE_12,
  },
  glassEffect: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: commonValues.BORDER_RADIUS_16,
  },
  loading: {
    zIndex: 1,
  },
});
