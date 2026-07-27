import { Ionicons } from '@expo/vector-icons';
import { GlassButton } from '@/components/ui/glass-button';
import { Palette } from '@/constants/theme';
import { HistoryCard } from '@/features/history/components/history-card';
import { QRHistoryItem } from '@/types/history';
import React, { memo } from 'react';
import { Text, View } from 'react-native';

interface HistoryListProps {
  items: QRHistoryItem[];
  onEditItem: (item: QRHistoryItem) => void;
  onDeleteItem: (id: string, title: string) => void;
  onTogglePinItem: (id: string) => void;
  onCreateNew: () => void;
}

export const HistoryList: React.FC<HistoryListProps> = memo(({
  items,
  onEditItem,
  onDeleteItem,
  onTogglePinItem,
  onCreateNew,
}) => {
  if (items.length === 0) {
    return (
      <View className="items-center justify-center py-16 gap-3">
        <View className="w-20 h-20 rounded-full bg-white/80 border border-white/40 items-center justify-center mb-2 shadow-sm">
          <Ionicons name="qr-code-outline" size={44} color={Palette.secondaryText} />
        </View>
        <Text className="text-on-surface text-xl font-bold">No saved codes yet</Text>
        <Text className="text-on-surface-variant text-sm text-center max-w-[320px] leading-5">
          Your generated QR codes will appear here in floating cards with quick actions.
        </Text>
        <GlassButton
          title="Create New QR"
          icon="add"
          variant="primary"
          onPress={onCreateNew}
          className="mt-3"
        />
      </View>
    );
  }

  return (
    <View className="flex-row flex-wrap gap-4 my-2">
      {items.map((item) => (
        <HistoryCard
          key={item.id}
          item={item}
          onEdit={onEditItem}
          onDelete={onDeleteItem}
          onTogglePin={onTogglePinItem}
        />
      ))}
    </View>
  );
});

HistoryList.displayName = 'HistoryList';
