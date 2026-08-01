import { GlassCard } from '@/components/ui/glass-card';
import { GlassChip } from '@/components/ui/glass-chip';
import { Palette } from '@/constants/theme';
import { QRType } from '@/types/qr';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';

export type { QRType };

interface QRTypeConfig {
  id: QRType;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  desc: string;
}

export const QR_TYPES: QRTypeConfig[] = [
  { id: 'url', label: 'Website Link', icon: 'link-outline', desc: 'Direct visitors to any website or landing page.' },
  { id: 'wifi', label: 'Wi-Fi Network', icon: 'wifi-outline', desc: 'Allow guests to join Wi-Fi without typing passwords.' },
  { id: 'vcard', label: 'Digital VCard', icon: 'person-outline', desc: 'Share your contact card, phone, and company info.' },
  { id: 'email', label: 'Send Email', icon: 'mail-outline', desc: 'Compose pre-filled emails to your target address.' },
  { id: 'phone', label: 'Phone Call', icon: 'call-outline', desc: 'Prompt immediate dialer action on mobile devices.' },
  { id: 'text', label: 'Plain Text', icon: 'document-text-outline', desc: 'Encode custom messages, instructions, or notes.' },
];

interface QRTypeSelectorProps {
  selectedType: QRType;
  onSelectType: (type: QRType) => void;
  variant?: 'grid' | 'pills' | 'carousel';
}

export const QRTypeSelector = React.memo(function QRTypeSelector({
  selectedType,
  onSelectType,
  variant = 'pills',
}: QRTypeSelectorProps) {
  if (variant === 'pills') {
    return (
      <View className="flex-row flex-wrap gap-2 my-2">
        {QR_TYPES.map((typeObj) => {
          const isSelected = selectedType === typeObj.id;
          return (
            <GlassChip
              key={typeObj.id}
              label={typeObj.label}
              icon={typeObj.icon}
              selected={isSelected}
              onPress={() => onSelectType(typeObj.id)}
              style={{ flexBasis: '48%', flexGrow: 1 }}
            />
          );
        })}
      </View>
    );
  }

  const renderCard = (typeObj: QRTypeConfig, extraStyle: object) => {
    const isSelected = selectedType === typeObj.id;
    return (
      <GlassCard
        key={typeObj.id}
        onPress={() => onSelectType(typeObj.id)}
        interactive
        hasGlow={isSelected}
        style={[extraStyle, isSelected ? { borderColor: Palette.cyan } : undefined]}
        className={`p-4 transition-all ${
          isSelected ? 'border-primary ring-2 ring-primary/20' : ''
        }`}>
        <View className="gap-2">
          <View className="flex-row items-center justify-between">
            <View
              className={`w-10 h-10 rounded-2xl items-center justify-center ${
                isSelected ? 'bg-primary' : 'bg-primary/10'
              }`}>
              <Ionicons
                name={typeObj.icon}
                size={20}
                color={isSelected ? '#FFFFFF' : '#55D6FF'}
              />
            </View>

            {isSelected && (
              <View className="w-2.5 h-2.5 rounded-full bg-primary" />
            )}
          </View>

          <Text className="text-on-surface font-extrabold text-sm mt-1">{typeObj.label}</Text>
          <Text className="text-on-surface-variant text-xs leading-4" numberOfLines={2}>
            {typeObj.desc}
          </Text>
        </View>
      </GlassCard>
    );
  };

  if (variant === 'carousel') {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 12, paddingVertical: 4 }}
        className="my-2">
        {QR_TYPES.map((typeObj) => renderCard(typeObj, { width: 168 }))}
      </ScrollView>
    );
  }

  return (
    <View className="flex-row flex-wrap gap-3 my-2 w-full">
      {QR_TYPES.map((typeObj) => renderCard(typeObj, { flexBasis: '48%', flexGrow: 1 }))}
    </View>
  );
});
