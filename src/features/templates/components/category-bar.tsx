import { GlassChip } from '@/components/ui/glass-chip';
import { TEMPLATE_CATEGORIES } from '@/features/templates/constants/templates';
import React, { memo } from 'react';
import { ScrollView } from 'react-native';

interface CategoryBarProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}

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
        <GlassChip
          key={cat}
          label={cat}
          selected={selectedCategory === cat}
          onPress={() => onSelectCategory(cat)}
        />
      ))}
    </ScrollView>
  );
});

CategoryBar.displayName = 'CategoryBar';
