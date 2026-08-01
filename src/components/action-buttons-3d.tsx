import { GlassButton } from '@/components/ui/glass-button';
import React from 'react';
import { View } from 'react-native';

interface ActionButtons3DProps {
  onOpenExport: () => void;
}

export const ActionButtons3D = React.memo(function ActionButtons3D({ onOpenExport }: ActionButtons3DProps) {
  return (
    <View className="w-full my-3 gap-3">
      <View className="flex-row items-center gap-3 w-full">
        <GlassButton
          title="Export HD Code"
          icon="download-outline"
          variant="primary"
          onPress={onOpenExport}
          className="flex-1"
        />
      </View>
    </View>
  );
});
