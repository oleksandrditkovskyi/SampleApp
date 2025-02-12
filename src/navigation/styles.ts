import { StyleSheet } from 'react-native';

import { commonValues } from '@utils/commonValues';

export const styles = StyleSheet.create({
  headerLeft: { marginLeft: commonValues.SIZE_22 },
  headerRight: { marginRight: commonValues.SIZE_22 },
  locationCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: commonValues.SIZE_30,
    height: commonValues.SIZE_30,
    borderRadius: commonValues.SIZE_30 / 2,
  },
  headerRightContainerStyle: {
    justifyContent: 'space-between',
  },
  noData: {
    opacity: 0,
  },
});
