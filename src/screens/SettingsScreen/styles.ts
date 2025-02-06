import { StyleSheet } from 'react-native';

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
  geoSettings: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
