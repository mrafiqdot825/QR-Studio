import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';

import { GlassCard } from '@/components/ui/glass-card';
import { GlassChip } from '@/components/ui/glass-chip';
import { Palette } from '@/constants/theme';
import { CustomizationOptions } from '@/types/qr';

export type { CustomizationOptions };

interface CustomizationStudioControlsProps {
  options: CustomizationOptions;
  onChangeOptions: React.Dispatch<React.SetStateAction<CustomizationOptions>>;
}

function CustomizationStudioControlsImpl({
  options,
  onChangeOptions,
}: CustomizationStudioControlsProps) {
  const updateOption = React.useCallback(
    <K extends keyof CustomizationOptions>(key: K, value: CustomizationOptions[K]) => {
      onChangeOptions((prev) => ({ ...prev, [key]: value }));
    },
    [onChangeOptions]
  );

  return (
    <GlassCard className="p-5 my-3 w-full gap-5">
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="text-on-surface text-base font-extrabold">Studio Customization</Text>
          <Text className="text-on-surface-variant text-xs mt-0.5">
            Configure matrix module shapes, eye frames, and badge logos.
          </Text>
        </View>
        <Ionicons name="options-outline" size={20} color={Palette.cyan} />
      </View>

      {/* Module Shape Controls */}
      <View className="gap-2">
        <Text className="text-on-surface-variant text-xs font-semibold uppercase tracking-wider">
          Module Shape
        </Text>
        <View className="flex-row gap-2">
          {(['square', 'rounded', 'dots'] as const).map((shape) => (
            <GlassChip
              key={shape}
              label={shape.toUpperCase()}
              selected={options.moduleShape === shape}
              onPress={() => updateOption('moduleShape', shape)}
              className="flex-1 justify-center"
            />
          ))}
        </View>
      </View>

      {/* Eye Style Controls */}
      <View className="gap-2">
        <Text className="text-on-surface-variant text-xs font-semibold uppercase tracking-wider">
          Eye Corner Style
        </Text>
        <View className="flex-row gap-2">
          {(['square', 'rounded', 'circle'] as const).map((eye) => (
            <GlassChip
              key={eye}
              label={eye.toUpperCase()}
              selected={options.eyeStyle === eye}
              onPress={() => updateOption('eyeStyle', eye)}
              className="flex-1 justify-center"
            />
          ))}
        </View>
      </View>

      {/* Center Badge Icon Controls */}
      <View className="gap-2">
        <Text className="text-on-surface-variant text-xs font-semibold uppercase tracking-wider">
          Center Brand Badge
        </Text>
        <View className="flex-row gap-2">
          {(['none', 'qrify', 'shield', 'star'] as const).map((logoItem) => (
            <GlassChip
              key={logoItem}
              label={logoItem.toUpperCase()}
              selected={options.logo === logoItem}
              onPress={() => updateOption('logo', logoItem as any)}
              className="flex-1 justify-center"
            />
          ))}
        </View>
      </View>
    </GlassCard>
  );
}

// This panel only reads moduleShape/eyeStyle/logo, but its parent hands it the whole
// CustomizationOptions object — a fresh reference every time fgColor/bgColor/padding
// change too. A plain memo would still re-render on those unrelated updates, so compare
// only the fields this component actually renders.
export const CustomizationStudioControls = React.memo(
  CustomizationStudioControlsImpl,
  (prev, next) =>
    prev.options.moduleShape === next.options.moduleShape &&
    prev.options.eyeStyle === next.options.eyeStyle &&
    prev.options.logo === next.options.logo &&
    prev.onChangeOptions === next.onChangeOptions
);
