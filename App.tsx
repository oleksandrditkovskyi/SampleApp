import { StyleSheet,View } from 'react-native';

import ErrorBoundary from '@components/ErrorBoundary';

const App = () => {

  return (
    <ErrorBoundary>
      <View style={styles.container} />
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'royalblue',
  },
});

export default App;
