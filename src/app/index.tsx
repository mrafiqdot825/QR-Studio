import { CinematicHeader } from '@/components/cinematic-header';
import { QRTypeSelector } from '@/components/qr-type-selector';
import { GlassButton } from '@/components/ui/glass-button';
import { GlassCard } from '@/components/ui/glass-card';
import { GlassContainer } from '@/components/ui/glass-container';
import { Palette } from '@/constants/theme';
import { useModals } from '@/hooks/use-modals';
import { QRType } from '@/types/qr';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useRef } from 'react';
import {
  Dimensions,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const heroQrRef = useRef<unknown>(null);
  const { openScanner, openSettings } = useModals();

  const handleSelectType = (type: QRType) => {
    router.navigate({
      pathname: '/studio',
      params: { initialType: type },
    });
  };

  return (
    <GlassContainer>
      <SafeAreaView className="flex-1">
        <CinematicHeader
          title="QRify"
          onOpenScanner={openScanner}
          onOpenSettings={openSettings}
        />

        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingTop: 16,
            paddingBottom: 120,
          }}
          showsVerticalScrollIndicator={false}>
          <View className="w-full max-w-[640px]">

            {/* HERO LANDING SECTION */}
            <View className="my-4 gap-6">
              <View className="gap-3">

                <Text className="text-on-surface text-4xl font-extrabold leading-tight tracking-tight">
                  Create Beautiful{'\n'}
                  <Text className="text-primary">QR Codes</Text>
                </Text>
                <Text className="text-on-surface-variant text-base leading-6">
                  Generate stunning QR codes in seconds with complete customization and physical depth.
                </Text>

                <View className="flex-row flex-wrap gap-3 mt-2">
                  <GlassButton
                    title="Get Started"
                    icon="arrow-forward"
                    iconPosition="right"
                    variant="primary"
                    onPress={() => router.navigate('/studio')}
                  />

                  <GlassButton
                    title="View Templates"
                    variant="secondary"
                    onPress={() => router.navigate('/explore')}
                  />
                </View>
              </View>

              {/* HERO FLOATING PREMIUM QR CARD */}
              <View className="items-center justify-center my-4">
                <GlassCard className="w-full max-w-[360px] p-6 items-center shadow-2xl">
                  <View className="bg-white p-5 rounded-4xl mb-5 shadow-lg border border-black/[0.04]">
                    <QRCode
                      value="https://qrify.me/business-pro"
                      size={Math.min(width * 0.5, 200)}
                      color={Palette.accentBlue}
                      backgroundColor="transparent"
                      getRef={(ref) => {
                        heroQrRef.current = ref;
                      }}
                    />
                  </View>

                  <View className="flex-row items-center justify-between w-full px-2">
                    <View>
                      <Text className="text-on-surface text-sm font-bold">Dynamic URL</Text>
                      <Text className="text-on-surface-variant text-xs">qrify.me/business-pro</Text>
                    </View>
                    <View className="flex-row gap-1.5">
                      <View className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                      <View className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                    </View>
                  </View>
                </GlassCard>
              </View>
            </View>

            {/* ACTION CARDS GRID SECTION */}
            <View className="flex-row items-end justify-between mt-8 mb-2">
              <View>
                <Text className="text-on-surface text-2xl font-bold">Create Data Code</Text>
                <Text className="text-on-surface-variant text-sm mt-0.5">Select a category to customize your QR code.</Text>
              </View>

              <Pressable
                accessibilityLabel="Open studio"
                accessibilityRole="button"
                onPress={() => router.navigate('/studio')}
                className="flex-row items-center gap-1">
                <Text className="text-primary text-sm font-semibold">Studio</Text>
                <Ionicons name="arrow-forward" size={14} color={Palette.accentBlue} />
              </Pressable>
            </View>

            <QRTypeSelector selectedType="url" onSelectType={handleSelectType} variant="grid" />

            {/* PRO BANNER SECTION */}
            <View className="mt-8 mb-4">
              <GlassCard className="p-8 items-center text-center gap-4 shadow-xl">
                <Text className="text-on-surface text-xl font-bold text-center">Ready to upgrade your QR experience?</Text>
                <Text className="text-on-surface-variant text-sm text-center leading-5 max-w-sm">
                  Generate vector SVG, ultra HD PDF exports, custom eye shapes, and center badges.
                </Text>

                <GlassButton
                  title="Open Studio"
                  variant="primary"
                  onPress={() => router.navigate('/studio')}
                />
              </GlassCard>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GlassContainer>
  );
}
