import { Ionicons } from '@expo/vector-icons';
import { GlassCard } from '@/components/ui/glass-card';
import { GlassModal } from '@/components/ui/glass-modal';
import { useTheme } from '@/hooks/use-theme';
import React, { memo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

export const PoliciesCard: React.FC = memo(() => {
  const { colors } = useTheme();
  const [activePolicy, setActivePolicy] = useState<'privacy' | 'terms' | 'licenses' | null>(null);

  const openPrivacy = React.useCallback(() => setActivePolicy('privacy'), []);
  const openTerms = React.useCallback(() => setActivePolicy('terms'), []);
  const openLicenses = React.useCallback(() => setActivePolicy('licenses'), []);
  const closeModal = React.useCallback(() => setActivePolicy(null), []);

  return (
    <>
      <GlassCard className="p-5 my-3 w-full gap-3">
        <Text className="text-on-surface-variant text-[11px] font-extrabold tracking-wider uppercase">
          POLICIES & LEGAL GOVERNANCE
        </Text>

        {/* PRIVACY POLICY ROW */}
        <Pressable
          accessibilityLabel="Open Privacy Policy"
          accessibilityRole="button"
          onPress={openPrivacy}
          style={{ borderColor: colors.border }}
          className="flex-row items-center justify-between py-2 border-b active:opacity-70">
          <View className="flex-row items-center gap-3">
            <View className="w-8 h-8 rounded-xl bg-blue-500/10 items-center justify-center">
              <Ionicons name="shield-checkmark-outline" size={16} color="#55D6FF" />
            </View>
            <View>
              <Text className="text-on-surface font-bold text-sm">Privacy Policy</Text>
              <Text className="text-on-surface-variant text-[11px]">Local storage, offline safety & camera privacy</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={16} color={colors.secondaryText} />
        </Pressable>

        {/* TERMS OF SERVICE ROW */}
        <Pressable
          accessibilityLabel="Open Terms of Service"
          accessibilityRole="button"
          onPress={openTerms}
          style={{ borderColor: colors.border }}
          className="flex-row items-center justify-between py-2 border-b active:opacity-70">
          <View className="flex-row items-center gap-3">
            <View className="w-8 h-8 rounded-xl bg-emerald-500/10 items-center justify-center">
              <Ionicons name="document-text-outline" size={16} color="#39D98A" />
            </View>
            <View>
              <Text className="text-on-surface font-bold text-sm">Terms of Service</Text>
              <Text className="text-on-surface-variant text-[11px]">Usage rights, vector export & commercial rules</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={16} color={colors.secondaryText} />
        </Pressable>

        {/* OPEN SOURCE LICENSES ROW */}
        <Pressable
          accessibilityLabel="Open Software Licenses"
          accessibilityRole="button"
          onPress={openLicenses}
          className="flex-row items-center justify-between py-2 active:opacity-70">
          <View className="flex-row items-center gap-3">
            <View className="w-8 h-8 rounded-xl bg-violet-500/10 items-center justify-center">
              <Ionicons name="code-working-outline" size={16} color="#73B8FF" />
            </View>
            <View>
              <Text className="text-on-surface font-bold text-sm">Software & Open Source Licenses</Text>
              <Text className="text-on-surface-variant text-[11px]">Third-party libraries & MIT license attributions</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={16} color={colors.secondaryText} />
        </Pressable>
      </GlassCard>

      {/* POLICY MODAL DIALOG */}
      <GlassModal
        visible={!!activePolicy}
        onClose={closeModal}
        title={
          activePolicy === 'privacy'
            ? 'Privacy Policy'
            : activePolicy === 'terms'
            ? 'Terms of Service'
            : 'Software Licenses'
        }
        variant="sheet">
        <ScrollView className="max-h-[380px]" showsVerticalScrollIndicator={false}>
          {activePolicy === 'privacy' && (
            <View className="gap-3 py-2">
              <Text className="text-on-surface text-sm font-bold">1. Zero Cloud Data Collection</Text>
              <Text className="text-on-surface-variant text-xs leading-5">
                QRify operates 100% locally on your device. Your generated QR codes, payloads, WiFi keys, and contact cards are stored exclusively on your device using encrypted local storage. We do not track, collect, or transmit your data to remote servers.
              </Text>

              <Text className="text-on-surface text-sm font-bold mt-2">2. Camera & Flash Permissions</Text>
              <Text className="text-on-surface-variant text-xs leading-5">
                Camera access is requested solely for scanning physical QR codes via your camera lens. No video feed or images leave your device.
              </Text>

              <Text className="text-on-surface text-sm font-bold mt-2">3. Analytics & Telemetry</Text>
              <Text className="text-on-surface-variant text-xs leading-5">
                QRify does not embed third-party tracking SDKs, advertising IDs, or behavioral analytics software.
              </Text>
            </View>
          )}

          {activePolicy === 'terms' && (
            <View className="gap-3 py-2">
              <Text className="text-on-surface text-sm font-bold">1. Universal License</Text>
              <Text className="text-on-surface-variant text-xs leading-5">
                All QR codes generated within QRify (including SVG vector exports, PNG images, and PDF print sheets) belong entirely to you. You are free to use them for personal, educational, or commercial purposes.
              </Text>

              <Text className="text-on-surface text-sm font-bold mt-2">2. Disclaimer of Liability</Text>
              <Text className="text-on-surface-variant text-xs leading-5">
                QRify generates QR matrix structures based on your input strings. Please verify payload details (such as Wi-Fi passwords and bank links) before printing high-volume materials.
              </Text>
            </View>
          )}

          {activePolicy === 'licenses' && (
            <View className="gap-3 py-2">
              <Text className="text-on-surface text-sm font-bold">Open Source Attributions</Text>
              <Text className="text-on-surface-variant text-xs leading-5">
                QRify is built using open-source libraries:
              </Text>
              <View style={{ backgroundColor: colors.glassSurfaceSubtle, borderColor: colors.border }} className="p-3 rounded-2xl gap-1 border">
                <Text className="text-xs font-bold text-on-surface">• Expo SDK 57 (MIT License)</Text>
                <Text className="text-xs font-bold text-on-surface">• React Native 0.86 (MIT License)</Text>
                <Text className="text-xs font-bold text-on-surface">• React Native Reanimated 4 (MIT License)</Text>
                <Text className="text-xs font-bold text-on-surface">• React Native SVG & QRCode SVG (MIT License)</Text>
                <Text className="text-xs font-bold text-on-surface">• Expo Vector Icons & Ionicons (MIT License)</Text>
              </View>
            </View>
          )}
        </ScrollView>
      </GlassModal>
    </>
  );
});

PoliciesCard.displayName = 'PoliciesCard';
