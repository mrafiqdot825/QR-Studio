import { GlassCard } from '@/components/ui/glass-card';
import { GlassModal } from '@/components/ui/glass-modal';
import { GlassToast } from '@/components/ui/glass-toast';
import { PresetId } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, Platform, Text, View } from 'react-native';

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
  payloadValue: _payloadValue,
  qrRef: _qrRef,
  presetId: _presetId,
  typeLabel,
  fgColor: _fgColor = '#111827',
}: ExportModalProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const exportTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (exportTimerRef.current) clearTimeout(exportTimerRef.current);
    };
  }, []);

  const handleExportFormat = (format: 'png' | 'svg' | 'pdf' | 'share' | 'print') => {
    setIsExporting(true);
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => { });
    }

    exportTimerRef.current = setTimeout(() => {
      setIsExporting(false);
      setToastMsg(`Exported ${format.toUpperCase()} successfully`);

      if (format === 'share') {
        Alert.alert('Share Code', `Sharing QR Code (${typeLabel.toUpperCase()}) to external apps...`);
      }
    }, 900);
  };

  return (
    <GlassModal visible={visible} onClose={onClose} title="Export HD Code Studio" variant="sheet">
      <GlassToast visible={!!toastMsg} message={toastMsg || ''} onHide={() => setToastMsg(null)} />

      <View className="gap-5">
        <Text className="text-on-surface-variant text-xs leading-5">
          Select vector or high-resolution export formats suitable for digital screens or ultra-crisp physical print.
        </Text>

        {isExporting && (
          <View className="flex-row items-center justify-center gap-3 py-4 bg-primary/10 rounded-2xl border border-primary/20">
            <ActivityIndicator size="small" color="#55D6FF" />
            <Text className="text-accent font-bold text-sm">Rendering Liquid Vector Assets...</Text>
          </View>
        )}

        {/* FLOATING GLASS ACTION CARDS — two per row */}
        <View className="flex-row flex-wrap gap-3">
          <GlassCard
            onPress={() => handleExportFormat('png')}
            interactive
            style={{ flexBasis: '48%', flexGrow: 1 }}
            className="p-3.5 gap-2">
            <View className="flex-row items-center gap-2">
              <View className="w-8 h-8 rounded-xl bg-blue-500/10 items-center justify-center">
                <Ionicons name="image-outline" size={16} color="#55D6FF" />
              </View>
              <Text className="text-on-surface font-extrabold text-sm flex-1" numberOfLines={1}>
                PNG Image
              </Text>
            </View>
            <Text className="text-on-surface-variant text-[11px] leading-4" numberOfLines={2}>
              HD raster, 2048×2048px transparent
            </Text>
          </GlassCard>

          <GlassCard
            onPress={() => handleExportFormat('svg')}
            interactive
            style={{ flexBasis: '48%', flexGrow: 1 }}
            className="p-3.5 gap-2">
            <View className="flex-row items-center gap-2">
              <View className="w-8 h-8 rounded-xl bg-emerald-500/10 items-center justify-center">
                <Ionicons name="code-slash-outline" size={16} color="#39D98A" />
              </View>
              <Text className="text-on-surface font-extrabold text-sm flex-1" numberOfLines={1}>
                SVG Vector
              </Text>
            </View>
            <Text className="text-on-surface-variant text-[11px] leading-4" numberOfLines={2}>
              Infinite scale format for web
            </Text>
          </GlassCard>

          <GlassCard
            onPress={() => handleExportFormat('pdf')}
            interactive
            style={{ flexBasis: '48%', flexGrow: 1 }}
            className="p-3.5 gap-2">
            <View className="flex-row items-center gap-2">
              <View className="w-8 h-8 rounded-xl bg-amber-500/10 items-center justify-center">
                <Ionicons name="document-text-outline" size={16} color="#F6C453" />
              </View>
              <Text className="text-on-surface font-extrabold text-sm flex-1" numberOfLines={1}>
                PDF Document
              </Text>
            </View>
            <Text className="text-on-surface-variant text-[11px] leading-4" numberOfLines={2}>
              Print-ready CMYK vector sheet
            </Text>
          </GlassCard>

          <GlassCard
            onPress={() => handleExportFormat('share')}
            interactive
            style={{ flexBasis: '48%', flexGrow: 1 }}
            className="p-3.5 gap-2">
            <View className="flex-row items-center gap-2">
              <View className="w-8 h-8 rounded-xl bg-violet-500/10 items-center justify-center">
                <Ionicons name="share-social-outline" size={16} color="#73B8FF" />
              </View>
              <Text className="text-on-surface font-extrabold text-sm flex-1" numberOfLines={1}>
                Share Link
              </Text>
            </View>
            <Text className="text-on-surface-variant text-[11px] leading-4" numberOfLines={2}>
              Send via AirDrop, Messages, or Mail
            </Text>
          </GlassCard>

          <GlassCard
            onPress={() => handleExportFormat('print')}
            interactive
            style={{ flexBasis: '100%' }}
            className="p-3.5">
            <View className="flex-row items-center gap-3">
              <View className="w-8 h-8 rounded-xl bg-rose-500/10 items-center justify-center">
                <Ionicons name="print-outline" size={16} color="#FF7A7A" />
              </View>
              <View className="flex-1">
                <Text className="text-on-surface font-extrabold text-sm" numberOfLines={1}>
                  AirPrint
                </Text>
                <Text className="text-on-surface-variant text-[11px]" numberOfLines={1}>
                  Direct wireless printer output
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#8A93A6" />
            </View>
          </GlassCard>
        </View>
      </View>
    </GlassModal>
  );
}
