import { Ionicons } from '@expo/vector-icons';
import { GlassBadge } from '@/components/ui/glass-badge';
import { GlassCard } from '@/components/ui/glass-card';
import { Palette } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { QRHistoryItem } from '@/types/history';
import React, { memo } from 'react';
import { Dimensions, Pressable, Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const { width } = Dimensions.get('window');

interface HistoryCardProps {
  item: QRHistoryItem;
  onEdit: (item: QRHistoryItem) => void;
  onDelete: (id: string, title: string) => void;
  onTogglePin: (id: string) => void;
}

export const HistoryCard: React.FC<HistoryCardProps> = memo(({
  item,
  onEdit,
  onDelete,
  onTogglePin,
}) => {
  const { colors } = useTheme();
  const isPinned = !!item.isPinned;

  return (
    <GlassCard
      hasGlow={isPinned}
      style={isPinned ? { borderColor: Palette.cyan, borderWidth: 2 } : undefined}
      className="w-[47%] p-4 gap-3">
      {/* QR Code Container */}
      <View style={{ borderColor: colors.border }} className="bg-white p-3.5 rounded-3xl items-center justify-center border">
        <QRCode
          value={item.value || 'https://qrify.me'}
          size={Math.min(width * 0.34, 130)}
          color="#111827"
          backgroundColor="transparent"
        />
      </View>

      {/* Title & Metadata */}
      <View className="gap-1">
        <View className="flex-row items-center justify-between">
          <Text className="text-on-surface text-sm font-extrabold flex-1 mr-1" numberOfLines={1}>
            {item.title}
          </Text>
          <Pressable
            accessibilityLabel={isPinned ? 'Unpin item' : 'Pin item'}
            accessibilityRole="button"
            onPress={() => onTogglePin(item.id)}
            className="p-1">
            <Ionicons
              name={isPinned ? 'bookmark' : 'bookmark-outline'}
              size={16}
              color={isPinned ? Palette.cyan : colors.secondaryText}
            />
          </Pressable>
        </View>

        <View className="flex-row items-center justify-between mt-1">
          <GlassBadge label={item.type.toUpperCase()} variant="primary" />
          <Text className="text-on-surface-variant text-[10px]">{item.date}</Text>
        </View>
      </View>

      {/* Action Row */}
      <View className="flex-row gap-2 items-center">
        <Pressable
          accessibilityLabel={`Edit ${item.title}`}
          accessibilityRole="button"
          onPress={() => onEdit(item)}
          className="flex-1 flex-row items-center justify-center gap-1 py-2 rounded-xl bg-primary/10 active:scale-95">
          <Ionicons name="create-outline" size={14} color={Palette.cyan} />
          <Text className="text-accent text-xs font-bold">Edit</Text>
        </Pressable>

        <Pressable
          accessibilityLabel={`Delete ${item.title}`}
          accessibilityRole="button"
          onPress={() => onDelete(item.id, item.title)}
          className="w-8 h-8 rounded-xl items-center justify-center bg-red-50 border border-red-100 active:scale-95">
          <Ionicons name="trash-outline" size={16} color={Palette.error} />
        </Pressable>
      </View>
    </GlassCard>
  );
});

HistoryCard.displayName = 'HistoryCard';
