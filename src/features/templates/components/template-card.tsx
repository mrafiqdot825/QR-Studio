import { Ionicons } from '@expo/vector-icons';
import { GlassBadge } from '@/components/ui/glass-badge';
import { GlassCard } from '@/components/ui/glass-card';
import { Palette } from '@/constants/theme';
import { QRTemplate } from '@/features/templates/constants/templates';
import { LinearGradient } from 'expo-linear-gradient';
import React, { memo } from 'react';
import { Pressable, Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

interface TemplateCardProps {
  template: QRTemplate;
  onUseTemplate: (template: QRTemplate) => void;
}

export const TemplateCard: React.FC<TemplateCardProps> = memo(({
  template,
  onUseTemplate,
}) => {
  return (
    <GlassCard className="w-full p-5 gap-4">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-3">
          <LinearGradient
            colors={template.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="w-12 h-12 rounded-2xl items-center justify-center border border-black/[0.04]">
            <Ionicons name={template.icon as any} size={22} color={template.color} />
          </LinearGradient>

          <View className="gap-1">
            <Text className="text-on-surface text-base font-extrabold">{template.title}</Text>
            <GlassBadge label={template.category.toUpperCase()} variant="primary" />
          </View>
        </View>

        <View className="p-2 rounded-2xl bg-white border border-black/[0.04] shadow-xs">
          <QRCode
            value={template.sampleValue}
            size={48}
            color="#111827"
            backgroundColor="transparent"
          />
        </View>
      </View>

      <Text className="text-on-surface-variant text-xs leading-5">{template.desc}</Text>

      <Pressable
        accessibilityLabel={`Use ${template.title} template`}
        accessibilityRole="button"
        onPress={() => onUseTemplate(template)}
        className="w-full py-3 rounded-2xl bg-primary/10 border border-primary/20 flex-row items-center justify-center gap-2 active:scale-98">
        <Text className="text-primary font-extrabold text-xs">USE TEMPLATE</Text>
        <Ionicons name="arrow-forward" size={14} color={Palette.accentBlue} />
      </Pressable>
    </GlassCard>
  );
});

TemplateCard.displayName = 'TemplateCard';
