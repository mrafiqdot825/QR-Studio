import { GlassChip } from '@/components/ui/glass-chip';
import { TEMPLATE_CATEGORIES } from '@/features/templates/constants/templates';
import React, { memo } from 'react';
import { ScrollView } from 'react-native';

interface CategoryBarProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}

const CategoryChipItem = React.memo(
  ({
    category,
    isSelected,
    onSelect,
  }: {
    category: string;
    isSelected: boolean;
    onSelect: (cat: string) => void;
  }) => {
    const handlePress = React.useCallback(() => {
      onSelect(category);
    }, [category, onSelect]);

    return (
      <GlassChip
        label={category}
        selected={isSelected}
        onPress={handlePress}
      />
    );
  }
);
CategoryChipItem.displayName = 'CategoryChipItem';

export const CategoryBar: React.FC<CategoryBarProps> = memo(({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 8, paddingVertical: 8 }}>
      {TEMPLATE_CATEGORIES.map((cat) => (
        <CategoryChipItem
          key={cat}
          category={cat}
          isSelected={selectedCategory === cat}
          onSelect={onSelectCategory}
        />
      ))}
    </ScrollView>
  );
});

CategoryBar.displayName = 'CategoryBar';
