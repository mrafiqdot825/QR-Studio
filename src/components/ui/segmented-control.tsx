import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';

interface SegmentOption {
  id: string;
  label: string;
}

interface SegmentedControlProps {
  options: SegmentOption[];
  selectedId: string;
  onSelect: (id: string) => void;
  className?: string;
}

export function SegmentedControl({
  options,
  selectedId,
  onSelect,
  className = '',
}: SegmentedControlProps) {
  const handleSelect = (id: string) => {
    if (id !== selectedId) {
      if (Platform.OS !== 'web') {
        Haptics.selectionAsync().catch(() => {});
      }
      onSelect(id);
    }
  };

  return (
    <View className={`flex-row p-1 rounded-2xl bg-white/70 border border-black/[0.06] overflow-hidden relative ${className}`}>
      <BlurView
        intensity={Platform.OS === 'ios' ? 40 : 80}
        tint="light"
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />
      {options.map((opt) => {
        const isSelected = opt.id === selectedId;
        return (
          <Pressable
            key={opt.id}
            onPress={() => handleSelect(opt.id)}
            className={`flex-1 py-2.5 items-center justify-center rounded-xl transition-all ${
              isSelected ? 'bg-white shadow-sm shadow-black/10 border border-black/[0.04]' : ''
            }`}>
            <Text
              className={`text-xs font-semibold ${
                isSelected ? 'text-primary font-bold' : 'text-on-surface-variant font-medium'
              }`}>
              {opt.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
