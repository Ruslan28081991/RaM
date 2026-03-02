import React from 'react';

import type { ErrorInfo } from 'react';

import type { TProps, TState } from '@/shared/types';

class ErrorBoundary extends React.Component<TProps, TState> {
  state = { hasError: false };

  static getDerivedStateFromError(error: Error) {
    console.error(error);
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong!</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
