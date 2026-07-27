import { GlassCard } from '@/components/ui/glass-card';
import { CinematicPresets, PresetId } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

interface ThemePresetsBarProps {
  selectedPresetId: PresetId;
  onSelectPreset: (id: PresetId) => void;
  selectedColor?: string;
  onSelectColor?: (color: string) => void;
}

const ACCENT_PALETTE = [
  '#111827',
  '#2563EB',
  '#10B981',
  '#7C3AED',
  '#F59E0B',
  '#EF4444',
  '#0284C7',
  '#A855F7',
  '#C9A227',
];

export function ThemePresetsBar({
  selectedPresetId,
  onSelectPreset,
  selectedColor,
  onSelectColor,
}: ThemePresetsBarProps) {
  return (
    <GlassCard className="p-5 my-3 w-full gap-4 border border-white/40">
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="text-on-surface text-base font-extrabold">Theme & Color Palette</Text>
          <Text className="text-on-surface-variant text-xs mt-0.5">
            Select a luxury preset or custom foreground tint.
          </Text>
        </View>
        <Ionicons name="color-palette-outline" size={20} color="#2563EB" />
      </View>

      {/* Preset Cards Carousel */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 10, paddingVertical: 4 }}>
        {CinematicPresets.map((preset) => {
          const isSelected = selectedPresetId === preset.id;
          return (
            <Pressable
              key={preset.id}
              accessibilityLabel={`Select ${preset.name} theme preset`}
              accessibilityRole="button"
              onPress={() => onSelectPreset(preset.id)}
              className={`w-28 p-2.5 rounded-2xl border items-center gap-2 transition-all ${
                isSelected
                  ? 'border-primary bg-white/90 ring-2 ring-primary/20 shadow-md'
                  : 'border-white/40 bg-white/60'
              }`}>
              <LinearGradient
                colors={preset.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="w-full h-14 rounded-xl items-center justify-center border border-black/[0.04] relative">
                <View
                  className="w-6 h-6 rounded-lg items-center justify-center shadow-xs"
                  style={{ backgroundColor: preset.qrColor }}>
                  <Ionicons name="qr-code" size={14} color="#FFFFFF" />
                </View>
                {isSelected && (
                  <View className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-primary items-center justify-center">
                    <Ionicons name="checkmark" size={10} color="#FFFFFF" />
                  </View>
                )}
              </LinearGradient>
              <Text className="text-on-surface font-bold text-xs text-center" numberOfLines={1}>
                {preset.name}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* Custom Color Selector Swatches */}
      {onSelectColor && (
        <View className="gap-2 pt-2 border-t border-black/[0.04]">
          <Text className="text-on-surface-variant text-xs font-semibold uppercase tracking-wider">
            Custom Foreground Tint
          </Text>
          <View className="flex-row items-center justify-between gap-1.5">
            {ACCENT_PALETTE.map((color) => {
              const isSelected = selectedColor === color;
              return (
                <Pressable
                  key={color}
                  accessibilityLabel={`Select color tint ${color}`}
                  accessibilityRole="button"
                  onPress={() => onSelectColor(color)}
                  className={`w-8 h-8 rounded-full items-center justify-center border transition-all ${
                    isSelected ? 'border-primary scale-110 shadow-sm' : 'border-white/40'
                  }`}
                  style={{ backgroundColor: color }}>
                  {isSelected && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
                </Pressable>
              );
            })}
          </View>
        </View>
      )}
    </GlassCard>
  );
}
