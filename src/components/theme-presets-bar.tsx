import { GlassCard } from '@/components/ui/glass-card';
import { CinematicPresets, PresetId } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

interface ThemePresetsBarProps {
  selectedPresetId: PresetId;
  onSelectPreset: (id: PresetId) => void;
  selectedColor?: string;
  onSelectColor?: (color: string) => void;
}

const ACCENT_PALETTE = [
  '#1E2A38',
  '#3E6FA6',
  '#2E7D32',
  '#6B46C1',
  '#ED6C02',
  '#D32F2F',
  '#0284C7',
  '#8B5CF6',
  '#C9A227',
];

const PresetCardItem = React.memo(
  ({
    preset,
    isSelected,
    colors,
    onSelect,
  }: {
    preset: (typeof CinematicPresets)[0];
    isSelected: boolean;
    colors: any;
    onSelect: (id: PresetId) => void;
  }) => {
    const handlePress = React.useCallback(() => {
      onSelect(preset.id);
    }, [onSelect, preset.id]);

    return (
      <Pressable
        accessibilityLabel={`Select ${preset.name} theme preset`}
        accessibilityRole="button"
        onPress={handlePress}
        style={[
          isSelected ? styles.presetCardShadow : undefined,
          {
            backgroundColor: isSelected ? colors.surface : colors.glassSurfaceSubtle,
            borderColor: isSelected ? colors.accent : colors.border,
            borderWidth: isSelected ? 2 : 1,
          },
        ]}
        className="w-28 p-2.5 rounded-2xl items-center gap-2">
        <LinearGradient
          colors={preset.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="w-full h-14 rounded-xl items-center justify-center relative">
          <View
            className="w-6 h-6 rounded-lg items-center justify-center"
            style={[styles.badgeShadow, { backgroundColor: preset.qrColor }]}>
            <Ionicons name="qr-code" size={14} color="#FFFFFF" />
          </View>
          {isSelected && (
            <View style={{ backgroundColor: colors.accent }} className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full items-center justify-center">
              <Ionicons name="checkmark" size={10} color="#FFFFFF" />
            </View>
          )}
        </LinearGradient>
        <Text className="text-on-surface font-bold text-xs text-center" numberOfLines={1}>
          {preset.name}
        </Text>
      </Pressable>
    );
  }
);
PresetCardItem.displayName = 'PresetCardItem';

const SwatchItem = React.memo(
  ({
    color,
    isSelected,
    onSelect,
  }: {
    color: string;
    isSelected: boolean;
    onSelect: (color: string) => void;
  }) => {
    const handlePress = React.useCallback(() => {
      onSelect(color);
    }, [color, onSelect]);

    return (
      <Pressable
        accessibilityLabel={`Select color tint ${color}`}
        accessibilityRole="button"
        onPress={handlePress}
        className={`w-8 h-8 rounded-full items-center justify-center ${isSelected ? 'opacity-100' : 'opacity-80'
          }`}
        style={[
          { backgroundColor: color },
          isSelected && styles.swatchShadow,
        ]}>
        {isSelected && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
      </Pressable>
    );
  }
);
SwatchItem.displayName = 'SwatchItem';

export const ThemePresetsBar = React.memo(function ThemePresetsBar({
  selectedPresetId,
  onSelectPreset,
  selectedColor,
  onSelectColor,
}: ThemePresetsBarProps) {
  const { colors } = useTheme();
  return (
    <GlassCard className="p-5 my-3 w-full gap-4">
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="text-on-surface text-base font-extrabold">Theme & Color Palette</Text>
          <Text className="text-on-surface-variant text-xs mt-0.5">
            Select a luxury preset or custom foreground tint.
          </Text>
        </View>
        <Ionicons name="color-palette-outline" size={20} color={colors.accent} />
      </View>

      {/* Preset Cards Carousel */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 10, paddingVertical: 4 }}>
        {CinematicPresets.map((preset) => (
          <PresetCardItem
            key={preset.id}
            preset={preset}
            isSelected={selectedPresetId === preset.id}
            colors={colors}
            onSelect={onSelectPreset}
          />
        ))}
      </ScrollView>

      {/* Custom Color Selector Swatches */}
      {onSelectColor && (
        <View className="gap-2 pt-2">
          <Text className="text-on-surface-variant text-xs font-semibold uppercase tracking-wider">
            Custom Foreground Tint
          </Text>
          <View className="flex-row items-center justify-between gap-1.5">
            {ACCENT_PALETTE.map((color) => (
              <SwatchItem
                key={color}
                color={color}
                isSelected={selectedColor === color}
                onSelect={onSelectColor}
              />
            ))}
          </View>
        </View>
      )}
    </GlassCard>
  );
});

const styles = StyleSheet.create({
  presetCardShadow: {
    boxShadow: '0px 4px 12px rgba(30, 42, 56, 0.08)',
  },
  badgeShadow: {
    boxShadow: '0px 1px 4px rgba(30, 42, 56, 0.05)',
  },
  swatchShadow: {
    boxShadow: '0px 2px 6px rgba(30, 42, 56, 0.10)',
  },
});
