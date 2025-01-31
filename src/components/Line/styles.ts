import { StyleSheet } from 'react-native';

import { colors } from '@utils/colors';
import { commonValues } from '@utils/commonValues';

export const styles = StyleSheet.create({
  line: {
    width: commonValues.FULL,
    height: commonValues.SIZE_1,
    backgroundColor: colors.WHITE,
    marginVertical: commonValues.SIZE_16,
  },
});
