import { Storage } from '@/services/storage/storage.service';
import { QRHistoryItem } from '@/types/history';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

interface HistoryContextType {
  history: QRHistoryItem[];
  addHistory: (item: Omit<QRHistoryItem, 'id' | 'date'>) => Promise<QRHistoryItem>;
  deleteHistory: (id: string) => Promise<void>;
  togglePin: (id: string) => Promise<void>;
  clearAll: () => Promise<void>;
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export const HistoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [history, setHistory] = useState<QRHistoryItem[]>(Storage.getHistory());

  useEffect(() => {
    const unsubscribe = Storage.subscribe(() => {
      setHistory(Storage.getHistory());
    });
    return () => unsubscribe();
  }, []);

  const addHistory = useCallback(
    async (item: Omit<QRHistoryItem, 'id' | 'date'>) => {
      return await Storage.addHistoryItem(item);
    },
    []
  );

  const deleteHistory = useCallback(async (id: string) => {
    await Storage.deleteHistoryItem(id);
  }, []);

  const togglePin = useCallback(async (id: string) => {
    await Storage.togglePinItem(id);
  }, []);

  const clearAll = useCallback(async () => {
    await Storage.clearHistory();
  }, []);

  return (
    <HistoryContext.Provider
      value={{
        history,
        addHistory,
        deleteHistory,
        togglePin,
        clearAll,
      }}>
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistoryState = (): HistoryContextType => {
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error('useHistoryState must be used within a HistoryProvider');
  }
  return context;
};
