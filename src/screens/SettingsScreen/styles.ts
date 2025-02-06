import { StyleSheet } from 'react-native';

import { commonValues } from '@utils/commonValues';

export const styles = StyleSheet.create({
  container: {
    flex: commonValues.FLEX_1,
    padding: commonValues.SIZE_16,
    paddingTop: commonValues.HEADER_HEIGHT + commonValues.SIZE_16,
  },
  geoSettings: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  aboutWrap: { gap: commonValues.SIZE_12 },
  aboutText: { marginBottom: commonValues.SIZE_12 },
  iconsWrap: { flexDirection: 'row' },
});
