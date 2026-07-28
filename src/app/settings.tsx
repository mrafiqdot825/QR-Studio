import { GlassCard } from '@/components/ui/glass-card';
import { GlassContainer } from '@/components/ui/glass-container';
import { GlassToast } from '@/components/ui/glass-toast';
import { DeveloperInfoCard } from '@/features/settings/components/developer-info-card';
import { PoliciesCard } from '@/features/settings/components/policies-card';
import { useHistory } from '@/hooks/use-history';
import { useTheme } from '@/hooks/use-theme';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React, { useState } from 'react';
import { Alert, Platform, Pressable, ScrollView, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen() {
  const { colors, preference, setPreference } = useTheme();
  const { clearAll } = useHistory();

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
            await clearAll();
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
    <GlassContainer>
      <SafeAreaView className="flex-1">
        <GlassToast visible={!!toastMsg} message={toastMsg || ''} onHide={() => setToastMsg(null)} />

        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingTop: 12,
            paddingBottom: 120,
          }}
          showsVerticalScrollIndicator={false}>
          <View className="w-full max-w-[640px]">
            {/* Header Section */}
            <View className="my-3">
              <Text className="text-on-surface text-3xl font-extrabold tracking-tight">Settings & Policies</Text>
              <Text className="text-on-surface-variant text-sm mt-1">
                Developer information, legal governance, and app preferences.
              </Text>
            </View>

            {/* APPEARANCE GROUP */}
            <GlassCard className="p-4 gap-3 my-2">
              <Text className="text-on-surface-variant text-[11px] font-extrabold tracking-wider uppercase">
                APPEARANCE
              </Text>

              <View style={{ backgroundColor: colors.glassSurfaceSubtle }} className="flex-row rounded-2xl p-1 gap-1">
                {(
                  [
                    { id: 'system' as const, label: 'System', icon: 'phone-portrait-outline' as const },
                    { id: 'light' as const, label: 'Light', icon: 'sunny-outline' as const },
                    { id: 'dark' as const, label: 'Dark', icon: 'moon-outline' as const },
                  ]
                ).map((option) => {
                  const isSelected = preference === option.id;
                  return (
                    <Pressable
                      key={option.id}
                      accessibilityLabel={`Use ${option.label} appearance`}
                      accessibilityRole="button"
                      onPress={() => setPreference(option.id)}
                      style={isSelected ? { backgroundColor: colors.surface } : undefined}
                      className={`flex-1 flex-row items-center justify-center gap-1.5 py-2.5 rounded-xl ${
                        isSelected ? 'shadow-sm' : ''
                      }`}>
                      <Ionicons
                        name={option.icon}
                        size={14}
                        color={isSelected ? '#2563EB' : colors.secondaryText}
                      />
                      <Text
                        className={`text-xs font-bold ${
                          isSelected ? 'text-primary' : 'text-on-surface-variant'
                        }`}>
                        {option.label}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </GlassCard>

            {/* DEVELOPER SPOTLIGHT CARD */}
            <DeveloperInfoCard />

            {/* PREFERENCES GROUP */}
            <GlassCard className="p-4 gap-3 my-2">
              <Text className="text-on-surface-variant text-[11px] font-extrabold tracking-wider uppercase">
                HAPTICS & PREFERENCES
              </Text>

              <View className="flex-row items-center justify-between py-1">
                <View className="flex-row items-center gap-3">
                  <View className="w-8 h-8 rounded-xl bg-blue-500/10 items-center justify-center">
                    <Ionicons name="phone-portrait-outline" size={16} color="#2563EB" />
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
                  trackColor={{ false: '#E5E7EB', true: '#2563EB' }}
                />
              </View>

              <View style={{ borderColor: colors.border }} className="flex-row items-center justify-between py-1 border-t">
                <View className="flex-row items-center gap-3">
                  <View className="w-8 h-8 rounded-xl bg-emerald-500/10 items-center justify-center">
                    <Ionicons name="bookmark-outline" size={16} color="#10B981" />
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
                  trackColor={{ false: '#E5E7EB', true: '#2563EB' }}
                />
              </View>

              <View style={{ borderColor: colors.border }} className="flex-row items-center justify-between py-1 border-t">
                <View className="flex-row items-center gap-3">
                  <View className="w-8 h-8 rounded-xl bg-violet-500/10 items-center justify-center">
                    <Ionicons name="sparkles-outline" size={16} color="#7C3AED" />
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
                  trackColor={{ false: '#E5E7EB', true: '#2563EB' }}
                />
              </View>
            </GlassCard>

            {/* POLICIES & LEGAL GOVERNANCE */}
            <PoliciesCard />

            {/* DATA & STORAGE GROUP */}
            <GlassCard className="p-4 gap-3 my-2">
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
                    <Ionicons name="trash-outline" size={16} color="#EF4444" />
                  </View>
                  <View>
                    <Text className="text-red-600 font-bold text-sm">Clear History Library</Text>
                    <Text className="text-on-surface-variant text-[11px]">Delete all saved QR items</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={16} color={colors.secondaryText} />
              </Pressable>
            </GlassCard>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GlassContainer>
  );
}
