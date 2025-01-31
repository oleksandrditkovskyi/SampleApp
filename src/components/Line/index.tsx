import { View } from 'react-native';

import { styles } from './styles';

type LineProps = {
  marginHorizontal?: number;
};

export const Line = ({ marginHorizontal }: LineProps) => (
  <View style={[styles.line, { marginHorizontal }]} />
);
