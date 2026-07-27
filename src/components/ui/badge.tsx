import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';

interface BadgeProps {
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
  variant?: 'blue' | 'emerald' | 'violet' | 'orange' | 'gold' | 'gray';
  size?: 'sm' | 'md';
  className?: string;
}

export function Badge({
  label,
  icon,
  variant = 'blue',
  size = 'md',
  className = '',
}: BadgeProps) {
  const variantStyles = {
    blue: 'bg-blue-50 text-blue-600 border-blue-100',
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    violet: 'bg-purple-50 text-purple-600 border-purple-100',
    orange: 'bg-amber-50 text-amber-600 border-amber-100',
    gold: 'bg-yellow-50 text-yellow-700 border-yellow-100',
    gray: 'bg-gray-100 text-gray-700 border-gray-200',
  }[variant];

  const iconColors = {
    blue: '#2563EB',
    emerald: '#10B981',
    violet: '#7C3AED',
    orange: '#F59E0B',
    gold: '#C9A227',
    gray: '#4B5563',
  }[variant];

  return (
    <View
      className={`flex-row items-center gap-1 border rounded-full self-start ${
        size === 'sm' ? 'px-2 py-0.5' : 'px-3 py-1'
      } ${variantStyles} ${className}`}>
      {icon && (
        <Ionicons name={icon} size={size === 'sm' ? 12 : 14} color={iconColors} />
      )}
      <Text
        className={`font-semibold ${
          size === 'sm' ? 'text-[10px]' : 'text-xs'
        }`}>
        {label}
      </Text>
    </View>
  );
}
