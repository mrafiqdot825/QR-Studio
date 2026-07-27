import { GlassButton } from '@/components/ui/glass-button';
import { GlassToast } from '@/components/ui/glass-toast';
import { PresetId } from '@/constants/theme';
import { QRType } from '@/types/qr';
import { saveHistoryItem } from '@/utils/storage';
import React, { useState } from 'react';
import { View } from 'react-native';

interface ActionButtons3DProps {
  qrRef: React.RefObject<unknown>;
  payloadValue: string;
  typeLabel: QRType;
  presetId: PresetId;
  onOpenExport: () => void;
}

export function ActionButtons3D({
  qrRef: _qrRef,
  payloadValue,
  typeLabel,
  presetId,
  onOpenExport,
}: ActionButtons3DProps) {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSaveToHistory = () => {
    saveHistoryItem({
      title: `${typeLabel.toUpperCase()} Code`,
      value: payloadValue,
      type: typeLabel,
      presetId,
    });
    setToastMessage('Saved to History Library');
  };

  return (
    <View className="w-full my-3 gap-3">
      <GlassToast
        visible={!!toastMessage}
        message={toastMessage || ''}
        onHide={() => setToastMessage(null)}
      />

      <View className="flex-row items-center gap-3 w-full">
        <GlassButton
          title="Export HD Code"
          icon="download-outline"
          variant="primary"
          onPress={onOpenExport}
          className="flex-1"
        />

        <GlassButton
          title="Save Library"
          icon="bookmark-outline"
          variant="secondary"
          onPress={handleSaveToHistory}
          className="flex-1"
        />
      </View>
    </View>
  );
}
