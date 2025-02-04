import Svg, { Path } from 'react-native-svg';

import { colors } from '@utils/colors';
import { commonValues } from '@utils/commonValues';

export const CloseIcon = ({ color = colors.WHITE }) => (
  <Svg
    fill={color}
    height={commonValues.SIZE_24}
    viewBox="0 0 50 50"
    width={commonValues.SIZE_24}
  >
    <Path d="M9.156 6.313 6.312 9.155 22.157 25 6.22 40.969 9.03 43.78 25 27.844 40.938 43.78l2.843-2.843L27.844 25 43.687 9.156l-2.843-2.844L25 22.157Z" />
  </Svg>
);
