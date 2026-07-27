import { CinematicHeader } from '@/components/cinematic-header';
import { GlassContainer } from '@/components/ui/glass-container';
import { GlassInput } from '@/components/ui/glass-input';
import { HistoryList } from '@/features/history/components/history-list';
import { useHistory } from '@/hooks/use-history';
import { useModals } from '@/hooks/use-modals';
import { QRHistoryItem } from '@/types/history';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HistoryScreen() {
  const router = useRouter();
  const { history, deleteHistory, togglePin } = useHistory();
  const { openScanner, openSettings } = useModals();

  const [searchQuery, setSearchQuery] = useState('');

  const handleDelete = (id: string, title: string) => {
    Alert.alert('Delete Code', `Are you sure you want to remove "${title}" from history?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => deleteHistory(id),
      },
    ]);
  };

  const handleEdit = (item: QRHistoryItem) => {
    router.navigate({
      pathname: '/studio',
      params: { initialType: item.type },
    });
  };

  const filteredItems = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return history;
    return history.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.value.toLowerCase().includes(q) ||
        item.type.toLowerCase().includes(q)
    );
  }, [history, searchQuery]);

  return (
    <GlassContainer>
      <SafeAreaView className="flex-1">
        <CinematicHeader
          title="History"
          onOpenScanner={openScanner}
          onOpenSettings={openSettings}
        />

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
              <Text className="text-on-surface text-3xl font-extrabold tracking-tight">History & Library</Text>
              <Text className="text-on-surface-variant text-sm mt-1">
                Your collection of customized QR access points and generated codes.
              </Text>
            </View>

            {/* Search Glass Bar */}
            <View className="my-3">
              <GlassInput
                placeholder="Search codes, tags, or links..."
                icon="search"
                value={searchQuery}
                onChangeText={setSearchQuery}
                onClear={() => setSearchQuery('')}
              />
            </View>

            {/* History List */}
            <HistoryList
              items={filteredItems}
              onEditItem={handleEdit}
              onDeleteItem={handleDelete}
              onTogglePinItem={togglePin}
              onCreateNew={() => router.navigate('/studio')}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </GlassContainer>
  );
}
