import { ErrorBoundary } from '@/components/ui/error-boundary';
import { HistoryProvider } from '@/contexts/history-context';
import { ModalProvider } from '@/contexts/modal-context';
import { AppThemeProvider } from '@/providers/theme-provider';
import React from 'react';

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <AppThemeProvider>
      <ErrorBoundary>
        <ModalProvider>
          <HistoryProvider>{children}</HistoryProvider>
        </ModalProvider>
      </ErrorBoundary>
    </AppThemeProvider>
  );
};
