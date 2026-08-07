import '@/global.css';
import { Platform } from 'react-native';
import { GlassColors } from './theme/colors';
export * from './theme/tokens';

export const LiquidGlassColors = GlassColors;

export const CinematicPresets = [
  {
    id: 'minimal-white',
    name: 'Minimal White',
    gradient: ['#FFFFFF', '#F4F8FC', '#EBF3FA'] as const,
    qrColor: '#1E2A38',
    qrBg: '#FFFFFF',
    accentColor: '#3E6FA6',
    glowColor: 'rgba(62, 111, 166, 0.08)',
  },
  {
    id: 'ocean-blue',
    name: 'Ocean Blue',
    gradient: ['#F0F8FF', '#E3F2FD', '#BBDEFB'] as const,
    qrColor: '#1E2A38',
    qrBg: '#FFFFFF',
    accentColor: '#3E6FA6',
    glowColor: 'rgba(62, 111, 166, 0.10)',
  },
  {
    id: 'aurora',
    name: 'Aurora',
    gradient: ['#F0FDF4', '#F4F8FC', '#E0F2FE'] as const,
    qrColor: '#1E2A38',
    qrBg: '#FFFFFF',
    accentColor: '#2E7D32',
    glowColor: 'rgba(46, 125, 50, 0.10)',
  },
  {
    id: 'luxury-gold',
    name: 'Luxury Gold',
    gradient: ['#FEFCE8', '#FEF08A', '#FDE047'] as const,
    qrColor: '#1E2A38',
    qrBg: '#FFFFFF',
    accentColor: '#ED6C02',
    glowColor: 'rgba(237, 108, 2, 0.10)',
  },
  {
    id: 'emerald',
    name: 'Emerald',
    gradient: ['#ECFDF5', '#D1FAE5', '#A7F3D0'] as const,
    qrColor: '#1E2A38',
    qrBg: '#FFFFFF',
    accentColor: '#2E7D32',
    glowColor: 'rgba(46, 125, 50, 0.10)',
  },
  {
    id: 'lavender',
    name: 'Lavender',
    gradient: ['#F5F3FF', '#EDE9FE', '#DDD6FE'] as const,
    qrColor: '#1E2A38',
    qrBg: '#FFFFFF',
    accentColor: '#6B46C1',
    glowColor: 'rgba(107, 70, 193, 0.10)',
  },
  {
    id: 'sunset',
    name: 'Sunset',
    gradient: ['#FFF7ED', '#FFEDD5', '#FED7AA'] as const,
    qrColor: '#1E2A38',
    qrBg: '#FFFFFF',
    accentColor: '#ED6C02',
    glowColor: 'rgba(237, 108, 2, 0.10)',
  },
  {
    id: 'sky',
    name: 'Sky',
    gradient: ['#F0F9FF', '#E0F2FE', '#BAE6FD'] as const,
    qrColor: '#1E2A38',
    qrBg: '#FFFFFF',
    accentColor: '#0284C7',
    glowColor: 'rgba(2, 132, 199, 0.10)',
  },
  {
    id: 'arctic',
    name: 'Arctic',
    gradient: ['#F8FAFC', '#F0F8FF', '#E2E8F0'] as const,
    qrColor: '#1E2A38',
    qrBg: '#FFFFFF',
    accentColor: '#3E6FA6',
    glowColor: 'rgba(62, 111, 166, 0.08)',
  },
  {
    id: 'pearl',
    name: 'Pearl',
    gradient: ['#FAF5FF', '#F3E8FF', '#E9D5FF'] as const,
    qrColor: '#1E2A38',
    qrBg: '#FFFFFF',
    accentColor: '#8B5CF6',
    glowColor: 'rgba(139, 92, 246, 0.10)',
  },
  {
    id: 'monochrome',
    name: 'Monochrome',
    gradient: ['#F9FAFB', '#F3F4F6', '#E5E7EB'] as const,
    qrColor: '#1E2A38',
    qrBg: '#FFFFFF',
    accentColor: '#1E2A38',
    glowColor: 'rgba(30, 42, 56, 0.08)',
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
