import { StyleSheet } from 'react-native';

import { commonValues } from '@utils/commonValues';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  img: {
    width: commonValues.SIZE_38,
    height: commonValues.SIZE_38,
  },
  week: {
    flex: commonValues.FLEX_1,
  },
  rainWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: commonValues.FLEX_1,
  },
  temp: {
    textAlign: 'right',
    flex: commonValues.FLEX_1,
  },
});
