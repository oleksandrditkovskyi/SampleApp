import Svg, { Path } from 'react-native-svg';

import { colors } from '@utils/colors';
import { commonValues } from '@utils/commonValues';

export const ManageLocationIcon = () => (
  <Svg fill="none" height={commonValues.SIZE_22} width={commonValues.SIZE_22}>
    <Path
      d="M12 11H1.333M12 21.667V11v10.667ZM12 11V.333 11Zm0 0h10.667H12Z"
      stroke={colors.WHITE}
      strokeLinecap="round"
      strokeWidth={2}
    />
  </Svg>
);
