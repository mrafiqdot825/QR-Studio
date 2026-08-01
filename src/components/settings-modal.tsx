import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React, { useState } from 'react';
import { Alert, Platform, Pressable, Switch, Text, View } from 'react-native';

import { GlassCard } from '@/components/ui/glass-card';
import { GlassModal } from '@/components/ui/glass-modal';
import { GlassToast } from '@/components/ui/glass-toast';
import { APP_CONFIG } from '@/config/app.config';
import { useTheme } from '@/hooks/use-theme';
import { clearHistory } from '@/utils/storage';

interface SettingsModalProps {
  visible: boolean;
  onClose: () => void;
}

export function SettingsModal({ visible, onClose }: SettingsModalProps) {
  const { colors } = useTheme();
  const [hapticsEnabled, setHapticsEnabled] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [highQualityExports, setHighQualityExports] = useState(true);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const handleClearAllHistory = () => {
    Alert.alert(
      'Clear History Library',
      'Are you sure you want to delete all saved QR codes? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: async () => {
            await clearHistory();
            setToastMsg('History library cleared');
          },
        },
      ]
    );
  };

  const toggleHaptics = (val: boolean) => {
    setHapticsEnabled(val);
    if (val && Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }
  };

  return (
    <GlassModal visible={visible} onClose={onClose} title="Settings & Preferences" variant="sheet">
      <GlassToast visible={!!toastMsg} message={toastMsg || ''} onHide={() => setToastMsg(null)} />

      <View className="gap-4">
        {/* APP PREFERENCES GROUP */}
        <GlassCard className="p-4 gap-3">
          <Text className="text-on-surface-variant text-[11px] font-extrabold tracking-wider uppercase">
            HAPTICS & PREFERENCES
          </Text>

          <View className="flex-row items-center justify-between py-1">
            <View className="flex-row items-center gap-3">
              <View className="w-8 h-8 rounded-xl bg-blue-500/10 items-center justify-center">
                <Ionicons name="phone-portrait-outline" size={16} color="#55D6FF" />
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
              trackColor={{ false: 'rgba(255, 255, 255, 0.16)', true: '#55D6FF' }}
            />
          </View>

          <View style={{ borderColor: colors.border }} className="flex-row items-center justify-between py-1 border-t">
            <View className="flex-row items-center gap-3">
              <View className="w-8 h-8 rounded-xl bg-emerald-500/10 items-center justify-center">
                <Ionicons name="bookmark-outline" size={16} color="#39D98A" />
              </View>
              <View>
                <Text className="text-on-surface font-bold text-sm">Auto-Save Generated Codes</Text>
                <Text className="text-on-surface-variant text-[11px]">Save automatically to history</Text>
              </View>
            </View>
            <Switch
              accessibilityLabel="Toggle auto save generated codes"
              value={autoSave}
              onValueChange={setAutoSave}
              trackColor={{ false: 'rgba(255, 255, 255, 0.16)', true: '#55D6FF' }}
            />
          </View>

          <View style={{ borderColor: colors.border }} className="flex-row items-center justify-between py-1 border-t">
            <View className="flex-row items-center gap-3">
              <View className="w-8 h-8 rounded-xl bg-violet-500/10 items-center justify-center">
                <Ionicons name="sparkles-outline" size={16} color="#73B8FF" />
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
              trackColor={{ false: 'rgba(255, 255, 255, 0.16)', true: '#55D6FF' }}
            />
          </View>
        </GlassCard>

        {/* STORAGE & DATA GROUP */}
        <GlassCard className="p-4 gap-3">
          <Text className="text-on-surface-variant text-[11px] font-extrabold tracking-wider uppercase">
            DATA & STORAGE
          </Text>

          <Pressable
            accessibilityLabel="Clear history library"
            accessibilityRole="button"
            onPress={handleClearAllHistory}
            className="flex-row items-center justify-between py-2 active:opacity-70">
            <View className="flex-row items-center gap-3">
              <View className="w-8 h-8 rounded-xl bg-red-500/10 items-center justify-center">
                <Ionicons name="trash-outline" size={16} color="#FF7A7A" />
              </View>
              <View>
                <Text className="text-red-600 font-bold text-sm">Clear History Library</Text>
                <Text className="text-on-surface-variant text-[11px]">Delete all saved QR items</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={16} color={colors.secondaryText} />
          </Pressable>
        </GlassCard>

        {/* ABOUT APP FOOTER */}
        <View className="items-center py-2 gap-1">
          <Text className="text-on-surface font-extrabold text-xs">{APP_CONFIG.name} — Liquid Glass Edition</Text>
          <Text className="text-on-surface-variant text-[11px]">Version {APP_CONFIG.version} • Expo SDK 57</Text>
        </View>
      </View>
    </GlassModal>
  );
}
