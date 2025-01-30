import { Component, ErrorInfo, ReactNode } from 'react';
import { View } from 'react-native';

import { ErrorBoundaryProps, ErrorBoundaryState } from './types';

import { BaseText } from '@components/BaseText';

import { styles } from './styles';

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('ErrorBoundary caught an error:', error, info);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <BaseText size={20} value="Something went wrong" />
        </View>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
