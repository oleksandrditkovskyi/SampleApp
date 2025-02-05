import Svg, { Path } from 'react-native-svg';

import { colors } from '@utils/colors';
import { commonValues } from '@utils/commonValues';

export const LocationMarkerIcon = ({
  color = colors.WHITE,
  size = commonValues.SIZE_18,
}) => (
  <Svg height={size} viewBox="0 0 40 50" width={size}>
    <Path
      color={color}
      d="M20 11a8.75 8.75 0 1 0 8.75 8.75A8.76 8.76 0 0 0 20 11Zm0 14a5.25 5.25 0 1 1 0-10.499A5.25 5.25 0 0 1 20 25ZM20 .5A19.272 19.272 0 0 0 .75 19.75c0 6.868 3.174 14.148 9.18 21.055a55.684 55.684 0 0 0 9.066 8.379 1.75 1.75 0 0 0 2.008 0 55.685 55.685 0 0 0 9.067-8.38c6.005-6.906 9.179-14.186 9.179-21.054A19.272 19.272 0 0 0 20 .5Zm0 45.058C16.383 42.721 4.25 32.27 4.25 19.75a15.75 15.75 0 1 1 31.5 0c0 12.52-12.134 22.972-15.75 25.808Z"
      fill={color}
    />
  </Svg>
);
