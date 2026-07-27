import '@/global.css';
import { Platform } from 'react-native';
import { GlassColors } from './theme/colors';
export * from './theme/tokens';

export const LiquidGlassColors = GlassColors;

export const Colors = {
  light: {
    text: GlassColors.primaryText,
    background: GlassColors.background,
    backgroundElement: GlassColors.surface,
    backgroundSelected: GlassColors.secondaryBackground,
    textSecondary: GlassColors.secondaryText,
    primary: GlassColors.accentBlue,
    secondary: GlassColors.accentEmerald,
    accent: GlassColors.accentViolet,
    cardBg: GlassColors.glassSurface,
    border: GlassColors.border,
    glow: GlassColors.glowPrimary,
  },
  dark: {
    text: GlassColors.primaryText,
    background: GlassColors.background,
    backgroundElement: GlassColors.surface,
    backgroundSelected: GlassColors.secondaryBackground,
    textSecondary: GlassColors.secondaryText,
    primary: GlassColors.accentBlue,
    secondary: GlassColors.accentEmerald,
    accent: GlassColors.accentViolet,
    cardBg: GlassColors.glassSurface,
    border: GlassColors.border,
    glow: GlassColors.glowPrimary,
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const CinematicPresets = [
  {
    id: 'minimal-white',
    name: 'Minimal White',
    gradient: ['#FFFFFF', '#FAFAFA', '#F3F4F6'] as const,
    qrColor: '#111827',
    qrBg: '#FFFFFF',
    accentColor: '#2563EB',
    glowColor: 'rgba(37, 99, 235, 0.15)',
  },
  {
    id: 'ocean-blue',
    name: 'Ocean Blue',
    gradient: ['#EFF6FF', '#DBEAFE', '#BFDBFE'] as const,
    qrColor: '#1E40AF',
    qrBg: '#FFFFFF',
    accentColor: '#2563EB',
    glowColor: 'rgba(37, 99, 235, 0.2)',
  },
  {
    id: 'aurora',
    name: 'Aurora',
    gradient: ['#ECFDF5', '#F5F3FF', '#EFF6FF'] as const,
    qrColor: '#047857',
    qrBg: '#FFFFFF',
    accentColor: '#10B981',
    glowColor: 'rgba(16, 185, 129, 0.2)',
  },
  {
    id: 'luxury-gold',
    name: 'Luxury Gold',
    gradient: ['#FEFCE8', '#FEF08A', '#FDE047'] as const,
    qrColor: '#854D0E',
    qrBg: '#FFFFFF',
    accentColor: '#C9A227',
    glowColor: 'rgba(201, 162, 39, 0.25)',
  },
  {
    id: 'emerald',
    name: 'Emerald',
    gradient: ['#ECFDF5', '#D1FAE5', '#A7F3D0'] as const,
    qrColor: '#065F46',
    qrBg: '#FFFFFF',
    accentColor: '#10B981',
    glowColor: 'rgba(16, 185, 129, 0.2)',
  },
  {
    id: 'lavender',
    name: 'Lavender',
    gradient: ['#F5F3FF', '#EDE9FE', '#DDD6FE'] as const,
    qrColor: '#5B21B6',
    qrBg: '#FFFFFF',
    accentColor: '#7C3AED',
    glowColor: 'rgba(124, 58, 237, 0.2)',
  },
  {
    id: 'sunset',
    name: 'Sunset',
    gradient: ['#FFF7ED', '#FFEDD5', '#FED7AA'] as const,
    qrColor: '#C2410C',
    qrBg: '#FFFFFF',
    accentColor: '#F59E0B',
    glowColor: 'rgba(245, 158, 11, 0.2)',
  },
  {
    id: 'sky',
    name: 'Sky',
    gradient: ['#F0F9FF', '#E0F2FE', '#BAE6FD'] as const,
    qrColor: '#0369A1',
    qrBg: '#FFFFFF',
    accentColor: '#0284C7',
    glowColor: 'rgba(2, 132, 199, 0.2)',
  },
  {
    id: 'arctic',
    name: 'Arctic',
    gradient: ['#F8FAFC', '#F1F5F9', '#E2E8F0'] as const,
    qrColor: '#0F172A',
    qrBg: '#FFFFFF',
    accentColor: '#38BDF8',
    glowColor: 'rgba(56, 189, 248, 0.2)',
  },
  {
    id: 'pearl',
    name: 'Pearl',
    gradient: ['#FAF5FF', '#F3E8FF', '#E9D5FF'] as const,
    qrColor: '#6B21A8',
    qrBg: '#FFFFFF',
    accentColor: '#A855F7',
    glowColor: 'rgba(168, 85, 247, 0.2)',
  },
  {
    id: 'monochrome',
    name: 'Monochrome',
    gradient: ['#F9FAFB', '#F3F4F6', '#E5E7EB'] as const,
    qrColor: '#000000',
    qrBg: '#FFFFFF',
    accentColor: '#111827',
    glowColor: 'rgba(17, 24, 39, 0.15)',
  },
];

export type PresetId = typeof CinematicPresets[number]['id'];

export const Fonts = Platform.select({
  ios: {
    sans: 'SF Pro Display',
    serif: 'ui-serif',
    rounded: 'SF Pro Rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'Inter',
    serif: 'serif',
    rounded: 'Inter',
    mono: 'monospace',
  },
  web: {
    sans: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    serif: 'serif',
    rounded: 'Inter, sans-serif',
    mono: 'monospace',
  },
});

export const BottomTabInset = Platform.select({ ios: 70, android: 90 }) ?? 70;
export const MaxContentWidth = 1100;
