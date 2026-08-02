import { GlassCard } from '@/components/ui/glass-card';
import { GlassModal } from '@/components/ui/glass-modal';
import { GlassToast } from '@/components/ui/glass-toast';
import { PresetId } from '@/constants/theme';
import {
  ExportFormat,
  saveToGallery,
  shareGeneral,
  shareToInstagram,
  shareToWhatsApp,
} from '@/utils/qr-exporter';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Platform, Text, View } from 'react-native';

interface ExportModalProps {
  visible: boolean;
  onClose: () => void;
  payloadValue: string;
  qrRef: React.RefObject<unknown>;
  presetId: PresetId;
  typeLabel: string;
  fgColor?: string;
}

export function ExportModal({
  visible,
  onClose,
  payloadValue,
  qrRef,
  presetId: _presetId,
  typeLabel: _typeLabel,
  fgColor = '#111827',
}: ExportModalProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [exportingText, setExportingText] = useState('Rendering QR Code...');
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>('png');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const triggerHaptics = useCallback(() => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    }
  }, []);

  const handleSelectFormat = useCallback(
    (format: ExportFormat) => {
      triggerHaptics();
      setSelectedFormat(format);
    },
    [triggerHaptics]
  );

  const handleSaveGallery = async () => {
    triggerHaptics();
    setIsExporting(true);
    setExportingText('Saving QR image to photo gallery...');

    const res = await saveToGallery(qrRef as any);
    setIsExporting(false);
    setToastMsg(res.message);
  };

  const handleShareWhatsApp = async () => {
    triggerHaptics();
    setIsExporting(true);
    setExportingText('Preparing WhatsApp share...');

    const res = await shareToWhatsApp(qrRef as any, payloadValue);
    setIsExporting(false);
    setToastMsg(res.message);
  };

  const handleShareInstagram = async () => {
    triggerHaptics();
    setIsExporting(true);
    setExportingText('Preparing Instagram share...');

    const res = await shareToInstagram(qrRef as any);
    setIsExporting(false);
    setToastMsg(res.message);
  };

  const handleShareSystem = async (formatOverride?: ExportFormat) => {
    triggerHaptics();
    const fmt = formatOverride || selectedFormat;
    setIsExporting(true);
    setExportingText(`Exporting ${fmt.toUpperCase()} format...`);

    const res = await shareGeneral(qrRef as any, fmt, payloadValue, fgColor);
    setIsExporting(false);
    setToastMsg(res.message);
  };

  return (
    <GlassModal visible={visible} onClose={onClose} title="Export & Share Code Studio" variant="sheet">
      <GlassToast visible={!!toastMsg} message={toastMsg || ''} onHide={() => setToastMsg(null)} />

      <View className="gap-5">
        <Text className="text-on-surface-variant text-xs leading-5">
          Select vector or high-resolution format, then choose to save directly to your gallery or share to social apps.
        </Text>

        {isExporting && (
          <View className="flex-row items-center justify-center gap-3 py-4 bg-primary/10 rounded-2xl border border-primary/20">
            <ActivityIndicator size="small" color="#55D6FF" />
            <Text className="text-accent font-bold text-sm">{exportingText}</Text>
          </View>
        )}

        {/* EXPORT FORMAT CATEGORIES */}
        <View className="gap-2">
          <Text className="text-on-surface text-xs font-bold uppercase tracking-wider">
            1. Select Export Format Category
          </Text>
          <View className="flex-row gap-2.5">
            <GlassCard
              onPress={() => handleSelectFormat('png')}
              interactive
              style={{
                flex: 1,
                borderColor: selectedFormat === 'png' ? '#55D6FF' : 'transparent',
                borderWidth: selectedFormat === 'png' ? 1.5 : 0,
              }}
              className="p-3 items-center gap-1.5"
            >
              <Ionicons
                name="image-outline"
                size={20}
                color={selectedFormat === 'png' ? '#55D6FF' : '#8A93A6'}
              />
              <Text
                className={`text-xs font-bold ${
                  selectedFormat === 'png' ? 'text-accent' : 'text-on-surface-variant'
                }`}
              >
                PNG Image
              </Text>
              <Text className="text-[10px] text-on-surface-variant text-center" numberOfLines={1}>
                HD 2048px
              </Text>
            </GlassCard>

            <GlassCard
              onPress={() => handleSelectFormat('svg')}
              interactive
              style={{
                flex: 1,
                borderColor: selectedFormat === 'svg' ? '#39D98A' : 'transparent',
                borderWidth: selectedFormat === 'svg' ? 1.5 : 0,
              }}
              className="p-3 items-center gap-1.5"
            >
              <Ionicons
                name="code-slash-outline"
                size={20}
                color={selectedFormat === 'svg' ? '#39D98A' : '#8A93A6'}
              />
              <Text
                className={`text-xs font-bold ${
                  selectedFormat === 'svg' ? 'text-emerald-400' : 'text-on-surface-variant'
                }`}
              >
                SVG Vector
              </Text>
              <Text className="text-[10px] text-on-surface-variant text-center" numberOfLines={1}>
                Infinite scale
              </Text>
            </GlassCard>

            <GlassCard
              onPress={() => handleSelectFormat('pdf')}
              interactive
              style={{
                flex: 1,
                borderColor: selectedFormat === 'pdf' ? '#F6C453' : 'transparent',
                borderWidth: selectedFormat === 'pdf' ? 1.5 : 0,
              }}
              className="p-3 items-center gap-1.5"
            >
              <Ionicons
                name="document-text-outline"
                size={20}
                color={selectedFormat === 'pdf' ? '#F6C453' : '#8A93A6'}
              />
              <Text
                className={`text-xs font-bold ${
                  selectedFormat === 'pdf' ? 'text-amber-400' : 'text-on-surface-variant'
                }`}
              >
                PDF Document
              </Text>
              <Text className="text-[10px] text-on-surface-variant text-center" numberOfLines={1}>
                Print ready
              </Text>
            </GlassCard>
          </View>
        </View>

        {/* SHARE & SAVE DESTINATION OPTIONS */}
        <View className="gap-2 mt-1">
          <Text className="text-on-surface text-xs font-bold uppercase tracking-wider">
            2. Choose Share or Save Destination
          </Text>

          <View className="flex-row flex-wrap gap-3">
            {/* SAVE TO GALLERY */}
            <GlassCard
              onPress={handleSaveGallery}
              interactive
              style={{ flexBasis: '48%', flexGrow: 1 }}
              className="p-3.5 gap-2"
            >
              <View className="flex-row items-center gap-2.5">
                <View className="w-9 h-9 rounded-xl bg-blue-500/15 items-center justify-center">
                  <Ionicons name="download-outline" size={18} color="#55D6FF" />
                </View>
                <View className="flex-1">
                  <Text className="text-on-surface font-extrabold text-sm" numberOfLines={1}>
                    Save to Gallery
                  </Text>
                  <Text className="text-on-surface-variant text-[11px]" numberOfLines={1}>
                    Store in Photos / Camera Roll
                  </Text>
                </View>
              </View>
            </GlassCard>

            {/* WHATSAPP */}
            <GlassCard
              onPress={handleShareWhatsApp}
              interactive
              style={{ flexBasis: '48%', flexGrow: 1 }}
              className="p-3.5 gap-2"
            >
              <View className="flex-row items-center gap-2.5">
                <View className="w-9 h-9 rounded-xl bg-emerald-500/15 items-center justify-center">
                  <Ionicons name="logo-whatsapp" size={18} color="#25D366" />
                </View>
                <View className="flex-1">
                  <Text className="text-on-surface font-extrabold text-sm" numberOfLines={1}>
                    WhatsApp
                  </Text>
                  <Text className="text-on-surface-variant text-[11px]" numberOfLines={1}>
                    Share to chat or status
                  </Text>
                </View>
              </View>
            </GlassCard>

            {/* INSTAGRAM */}
            <GlassCard
              onPress={handleShareInstagram}
              interactive
              style={{ flexBasis: '48%', flexGrow: 1 }}
              className="p-3.5 gap-2"
            >
              <View className="flex-row items-center gap-2.5">
                <View className="w-9 h-9 rounded-xl bg-pink-500/15 items-center justify-center">
                  <Ionicons name="logo-instagram" size={18} color="#E1306C" />
                </View>
                <View className="flex-1">
                  <Text className="text-on-surface font-extrabold text-sm" numberOfLines={1}>
                    Instagram
                  </Text>
                  <Text className="text-on-surface-variant text-[11px]" numberOfLines={1}>
                    Post to Stories or DM
                  </Text>
                </View>
              </View>
            </GlassCard>

            {/* GENERAL SHARE SYSTEM SHEET */}
            <GlassCard
              onPress={() => handleShareSystem()}
              interactive
              style={{ flexBasis: '48%', flexGrow: 1 }}
              className="p-3.5 gap-2"
            >
              <View className="flex-row items-center gap-2.5">
                <View className="w-9 h-9 rounded-xl bg-violet-500/15 items-center justify-center">
                  <Ionicons name="share-social-outline" size={18} color="#A78BFA" />
                </View>
                <View className="flex-1">
                  <Text className="text-on-surface font-extrabold text-sm" numberOfLines={1}>
                    System Share Sheet
                  </Text>
                  <Text className="text-on-surface-variant text-[11px]" numberOfLines={1}>
                    AirDrop, Mail, or More
                  </Text>
                </View>
              </View>
            </GlassCard>
          </View>
        </View>
      </View>
    </GlassModal>
  );
}
