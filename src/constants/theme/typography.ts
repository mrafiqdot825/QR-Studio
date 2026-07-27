import { Platform } from 'react-native';

export const Typography = {
  family: Platform.select({
    ios: 'SF Pro Display',
    default: 'Inter',
    web: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  }),
  roundedFamily: Platform.select({
    ios: 'SF Pro Rounded',
    default: 'Inter',
    web: 'Inter, sans-serif',
  }),
  weights: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    heavy: '800',
  },
} as const;
