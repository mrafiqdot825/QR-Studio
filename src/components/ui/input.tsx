import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Pressable,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

import { LiquidGlassColors } from '@/constants/theme';

interface InputProps extends TextInputProps {
  label?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  error?: string;
  onClear?: () => void;
  className?: string;
}

export function Input({
  label,
  icon,
  error,
  onClear,
  value,
  className = '',
  placeholder,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className="w-full gap-1.5 my-1.5">
      {label && (
        <Text className="text-xs font-semibold text-on-surface-variant tracking-wide px-1">
          {label}
        </Text>
      )}

      <View
        className={`flex-row items-center px-4 py-3.5 rounded-2xl bg-white border overflow-hidden transition-all relative gap-3 ${
          error
            ? 'border-error shadow-sm shadow-error/10'
            : isFocused
            ? 'border-primary shadow-md shadow-primary/10'
            : 'border-black/[0.06]'
        } ${className}`}>
        {icon && (
          <Ionicons
            name={icon}
            size={18}
            color={
              error
                ? LiquidGlassColors.error
                : isFocused
                ? LiquidGlassColors.accentBlue
                : LiquidGlassColors.secondaryText
            }
          />
        )}

        <TextInput
          value={value}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          placeholderTextColor={LiquidGlassColors.secondaryText}
          className="flex-1 text-on-surface font-medium text-sm p-0 m-0"
          style={{ includeFontPadding: false }}
          {...props}
        />

        {onClear && value && value.length > 0 && (
          <Pressable onPress={onClear} className="p-1 rounded-full active:bg-black/5">
            <Ionicons name="close-circle" size={16} color={LiquidGlassColors.secondaryText} />
          </Pressable>
        )}
      </View>

      {error && (
        <Text className="text-xs font-medium text-error px-1 mt-0.5">
          {error}
        </Text>
      )}
    </View>
  );
}
