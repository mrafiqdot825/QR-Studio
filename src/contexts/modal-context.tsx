import React, { createContext, useCallback, useContext, useState } from 'react';

interface ModalContextType {
  scannerOpen: boolean;
  settingsOpen: boolean;
  openScanner: () => void;
  closeScanner: () => void;
  openSettings: () => void;
  closeSettings: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [scannerOpen, setScannerOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const openScanner = useCallback(() => setScannerOpen(true), []);
  const closeScanner = useCallback(() => setScannerOpen(false), []);
  const openSettings = useCallback(() => setSettingsOpen(true), []);
  const closeSettings = useCallback(() => setSettingsOpen(false), []);

  return (
    <ModalContext.Provider
      value={{
        scannerOpen,
        settingsOpen,
        openScanner,
        closeScanner,
        openSettings,
        closeSettings,
      }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModals = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModals must be used within a ModalProvider');
  }
  return context;
};
