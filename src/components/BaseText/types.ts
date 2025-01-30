import { TextStyle } from 'react-native';

export type BaseTextProps = {
  bold?: boolean;
  color?: string;
  style?: TextStyle;
  medium?: boolean;
  size?: number;
  value: string | number;
};
