import { ErrorBoundary } from '@/components/ui/error-boundary';
import { HistoryProvider } from '@/contexts/history-context';
import { ModalProvider } from '@/contexts/modal-context';
import React from 'react';

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <ErrorBoundary>
      <ModalProvider>
        <HistoryProvider>{children}</HistoryProvider>
      </ModalProvider>
    </ErrorBoundary>
  );
};
