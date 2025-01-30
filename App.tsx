import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppNavigator } from '@navigation/AppNavigator';

import ErrorBoundary from '@components/ErrorBoundary';
import { GradientBackground } from '@components/GradientBackground';

const App = () => {
  return (
    <ErrorBoundary>
      <GestureHandlerRootView style={styles.container}>
        <GradientBackground weatherType="clear">
          <SafeAreaView edges={['right', 'left']} style={styles.container}>
            <AppNavigator />
          </SafeAreaView>
        </GradientBackground>
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
