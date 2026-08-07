import { GlassCard } from '@/components/ui/glass-card';
import { GlassModal } from '@/components/ui/glass-modal';
import { APP_CONFIG } from '@/config/app.config';
import { useTheme } from '@/hooks/use-theme';
import { withAlpha } from '@/utils/color';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React, { useState } from 'react';
import { Platform, Switch, Text, View } from 'react-native';

interface SettingsModalProps {
  visible: boolean;
  onClose: () => void;
}

export function SettingsModal({ visible, onClose }: SettingsModalProps) {
  const { colors } = useTheme();
  const [hapticsEnabled, setHapticsEnabled] = useState(true);
  const [highQualityExports, setHighQualityExports] = useState(true);

  const toggleHaptics = (val: boolean) => {
    setHapticsEnabled(val);
    if (val && Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }
  };

  return (
    <GlassModal visible={visible} onClose={onClose} title="Settings & Preferences" variant="sheet">
      <View className="gap-4">
        {/* APP PREFERENCES GROUP */}
        <GlassCard className="p-4 gap-3">
          <Text className="text-on-surface-variant text-[11px] font-extrabold tracking-wider uppercase">
            HAPTICS & PREFERENCES
          </Text>

          <View className="flex-row items-center justify-between py-1">
            <View className="flex-row items-center gap-3">
              <View style={{ backgroundColor: withAlpha(colors.accent, 0.10) }} className="w-8 h-8 rounded-xl items-center justify-center">
                <Ionicons name="phone-portrait-outline" size={16} color={colors.accent} />
              </View>
              <View>
                <Text className="text-on-surface font-bold text-sm">Haptic Feedback</Text>
                <Text className="text-on-surface-variant text-[11px]">Tactile vibrations on press</Text>
              </View>
            </View>
            <Switch
              accessibilityLabel="Toggle haptic feedback"
              value={hapticsEnabled}
              onValueChange={toggleHaptics}
              trackColor={{ false: colors.border, true: colors.accent }}
            />
          </View>

          <View style={{ borderColor: colors.border }} className="flex-row items-center justify-between py-1 border-t">
            <View className="flex-row items-center gap-3">
              <View style={{ backgroundColor: withAlpha(colors.accent, 0.10) }} className="w-8 h-8 rounded-xl items-center justify-center">
                <Ionicons name="sparkles-outline" size={16} color={colors.accent} />
              </View>
              <View>
                <Text className="text-on-surface font-bold text-sm">Ultra HD Vector Engine</Text>
                <Text className="text-on-surface-variant text-[11px]">Render vector exports at 300DPI</Text>
              </View>
            </View>
            <Switch
              accessibilityLabel="Toggle ultra HD vector engine"
              value={highQualityExports}
              onValueChange={setHighQualityExports}
              trackColor={{ false: colors.border, true: colors.accent }}
            />
          </View>
        </GlassCard>

        {/* ABOUT APP FOOTER */}
        <View className="items-center py-2 gap-1">
          <Text className="text-on-surface font-extrabold text-xs">{APP_CONFIG.name} — Alice Blue Edition</Text>
          <Text className="text-on-surface-variant text-[11px]">Version {APP_CONFIG.version} • Expo SDK 57</Text>
        </View>
      </View>
    </GlassModal>
  );
}
