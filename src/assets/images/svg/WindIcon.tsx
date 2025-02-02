import Svg, { Path } from 'react-native-svg';

import { colors } from '@utils/colors';
import { commonValues } from '@utils/commonValues';

export const WindIcon = () => (
  <Svg fill="none" height={commonValues.SIZE_32} width={commonValues.SIZE_32}>
    <Path
      d="M12.983 28a1 1 0 0 0 .945-.629l3.841-9.601 9.602-3.841A1 1 0 0 0 28 13v-.016a1 1 0 0 0-.658-.924l-22-8a1 1 0 0 0-1.283 1.282l8 22a1 1 0 0 0 .925.658h-.001Z"
      fill={colors.WHITE}
    />
  </Svg>
);
