import { Logger } from '@/services/logger/logger.service';
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    Logger.error('Unhandled React Error Boundary Exception:', error, errorInfo);
  }

  private handleReset = (): void => {
    this.setState({ hasError: false, error: null });
  };

  public render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <View style={styles.container} accessibilityRole="alert">
          <View style={styles.card}>
            <Text style={styles.title}>Something went wrong</Text>
            <Text style={styles.subtitle}>
              An unexpected error occurred in the application visual stage.
            </Text>
            {this.state.error?.message ? (
              <Text style={styles.errorText} numberOfLines={3}>
                {this.state.error.message}
              </Text>
            ) : null}
            <Pressable
              style={styles.button}
              onPress={this.handleReset}
              accessibilityLabel="Try again"
              accessibilityRole="button">
              <Text style={styles.buttonText}>Try Again</Text>
            </Pressable>
          </View>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#F0F8FF',
  },
  card: {
    width: '100%',
    maxWidth: 400,
    padding: 24,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D6E4F0',
    boxShadow: '0px 8px 24px rgba(30, 42, 56, 0.08)',
    elevation: 4,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1E2A38',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#5C6B7A',
    textAlign: 'center',
    marginBottom: 16,
  },
  errorText: {
    fontSize: 12,
    fontFamily: 'monospace',
    color: '#D32F2F',
    backgroundColor: 'rgba(211, 47, 47, 0.08)',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
    width: '100%',
  },
  button: {
    backgroundColor: '#3E6FA6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
});
