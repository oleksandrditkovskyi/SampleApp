import { StyleSheet, Text, View } from 'react-native';

export const ManageLocationScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Manage Location</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'purple',
  },
});
