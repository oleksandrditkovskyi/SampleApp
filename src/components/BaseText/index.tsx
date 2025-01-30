import { StyleSheet, Text } from 'react-native';

import { BaseTextProps } from './types';

import { colors } from '@utils/colors';

import { styles } from './styles';

export const BaseText = ({
  bold,
  color,
  style,
  medium,
  value,
  size,
  ...props
}: BaseTextProps) => (
  <Text
    style={[
      styles.font,
      bold && styles.bold,
      medium && styles.medium,
      {
        color: color || colors.WHITE,
        fontSize: size || 16,
      },
      style,
    ]}
    {...props}
  >
    {value}
  </Text>
);
