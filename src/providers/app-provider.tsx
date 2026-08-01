import { ErrorBoundary } from '@/components/ui/error-boundary';
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
        <ModalProvider>{children}</ModalProvider>
      </ErrorBoundary>
    </AppThemeProvider>
  );
};
