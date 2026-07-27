import { Platform } from 'react-native';

export const BlurTokens = {
  subtle: Platform.OS === 'ios' ? 16 : 40,
  card: Platform.OS === 'ios' ? 30 : 60,
  dock: Platform.OS === 'ios' ? 50 : 80,
  modal: Platform.OS === 'ios' ? 60 : 90,
  header: Platform.OS === 'ios' ? 45 : 75,
} as const;

export type BlurLevel = keyof typeof BlurTokens;
