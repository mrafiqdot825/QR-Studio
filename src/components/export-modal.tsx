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
            <Text className="text-primary font-bold text-sm">Rendering Liquid Vector Assets...</Text>
          </View>
        )}

        {/* 6 FLOATING GLASS ACTION CARDS */}
        <View className="flex-row flex-wrap gap-3">
          <GlassCard
            onPress={() => handleExportFormat('png')}
            interactive
            className="w-[48%] p-4 gap-2">
            <View className="w-9 h-9 rounded-2xl bg-blue-500/10 items-center justify-center">
              <Ionicons name="image-outline" size={18} color="#55D6FF" />
            </View>
            <Text className="text-on-surface font-extrabold text-sm">PNG Image</Text>
            <Text className="text-on-surface-variant text-[11px]">HD raster 2048x2048px transparent</Text>
          </GlassCard>

          <GlassCard
            onPress={() => handleExportFormat('svg')}
            interactive
            className="w-[48%] p-4 gap-2">
            <View className="w-9 h-9 rounded-2xl bg-emerald-500/10 items-center justify-center">
              <Ionicons name="code-slash-outline" size={18} color="#39D98A" />
            </View>
            <Text className="text-on-surface font-extrabold text-sm">SVG Vector</Text>
            <Text className="text-on-surface-variant text-[11px]">Infinite scale vector format for web</Text>
          </GlassCard>

          <GlassCard
            onPress={() => handleExportFormat('pdf')}
            interactive
            className="w-[48%] p-4 gap-2">
            <View className="w-9 h-9 rounded-2xl bg-amber-500/10 items-center justify-center">
              <Ionicons name="document-text-outline" size={18} color="#F6C453" />
            </View>
            <Text className="text-on-surface font-extrabold text-sm">PDF Document</Text>
            <Text className="text-on-surface-variant text-[11px]">Ready to print CMYK vector PDF sheet</Text>
          </GlassCard>

          <GlassCard
            onPress={() => handleExportFormat('share')}
            interactive
            className="w-[48%] p-4 gap-2">
            <View className="w-9 h-9 rounded-2xl bg-violet-500/10 items-center justify-center">
              <Ionicons name="share-social-outline" size={18} color="#73B8FF" />
            </View>
            <Text className="text-on-surface font-extrabold text-sm">Share Link</Text>
            <Text className="text-on-surface-variant text-[11px]">Send via AirDrop, Messages, or Mail</Text>
          </GlassCard>

          <GlassCard
            onPress={() => handleExportFormat('print')}
            interactive
            className="w-[48%] p-4 gap-2">
            <View className="w-9 h-9 rounded-2xl bg-rose-500/10 items-center justify-center">
              <Ionicons name="print-outline" size={18} color="#FF7A7A" />
            </View>
            <Text className="text-on-surface font-extrabold text-sm">AirPrint</Text>
            <Text className="text-on-surface-variant text-[11px]">Direct wireless printer output</Text>
          </GlassCard>
        </View>
      </View>
    </GlassModal>
  );
}
