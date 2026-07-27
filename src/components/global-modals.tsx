import { ScannerModal } from '@/components/scanner-modal';
import { SettingsModal } from '@/components/settings-modal';
import { useModals } from '@/hooks/use-modals';
import React from 'react';

export const GlobalModals: React.FC = () => {
  const { scannerOpen, closeScanner, settingsOpen, closeSettings } = useModals();

  return (
    <>
      <ScannerModal visible={scannerOpen} onClose={closeScanner} />
      <SettingsModal visible={settingsOpen} onClose={closeSettings} />
    </>
  );
};
