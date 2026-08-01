import { GlassCard } from '@/components/ui/glass-card';
import { GlassContainer } from '@/components/ui/glass-container';
import { DeveloperInfoCard } from '@/features/settings/components/developer-info-card';
import { PoliciesCard } from '@/features/settings/components/policies-card';
import { useTheme } from '@/hooks/use-theme';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React, { useState } from 'react';
import { Platform, ScrollView, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen() {
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
    <GlassContainer>
      <SafeAreaView className="flex-1">
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

            {/* POLICIES & LEGAL GOVERNANCE */}
            <PoliciesCard />
          </View>
        </ScrollView>
      </SafeAreaView>
    </GlassContainer>
  );
}
