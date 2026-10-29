import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#0D0E12] text-[#121317] dark:text-[#F3F4F6] flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md w-full bg-white dark:bg-[#16181D] rounded-3xl border border-[#E8EAED] dark:border-[#26282E] p-8 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-[#EA4335]/10 text-[#EA4335] flex items-center justify-center mx-auto mb-4 text-xl font-mono">
              !
            </div>
            <h2 className="text-xl font-medium text-[#121317] dark:text-white mb-2">
              Something went wrong
            </h2>
            <p className="text-xs text-[#5F6368] dark:text-[#9AA0A6] mb-6">
              {this.state.error?.message || 'An unexpected rendering error occurred.'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 rounded-full bg-[#121317] text-white dark:bg-white dark:text-[#121317] text-xs font-medium hover:scale-[0.98] transition-transform"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
