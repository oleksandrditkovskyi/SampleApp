import Svg, { Path } from 'react-native-svg';

import { colors } from '@utils/colors';
import { commonValues } from '@utils/commonValues';

export const HumidityIcon = ({ size = commonValues.SIZE_32 }) => (
  <Svg fill="none" height={size} viewBox="0 0 32 32" width={size}>
    <Path
      d="M25 20c0 5.523-3.477 9-9 9s-9-3.477-9-9c0-5.927 6.452-13.928 8.43-16.242a.75.75 0 0 1 1.14 0C18.548 6.072 25 14.073 25 20Z"
      stroke={colors.WHITE}
      strokeMiterlimit={10}
      strokeWidth={2}
    />
    <Path
      d="M21.5 20.5A4.5 4.5 0 0 1 17 25"
      stroke={colors.WHITE}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
  </Svg>
);
