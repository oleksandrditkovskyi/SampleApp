import { GestureResponderEvent, TextStyle } from 'react-native';

export type BaseTextProps = {
  bold?: boolean;
  color?: string;
  style?: TextStyle;
  medium?: boolean;
  size?: number;
  value: string | number;
  onPress?: (event: GestureResponderEvent) => void;
};
