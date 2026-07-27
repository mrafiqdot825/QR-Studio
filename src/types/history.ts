import { PresetId, QRType } from './qr';

export interface QRHistoryItem {
  id: string;
  title: string;
  type: QRType;
  value: string;
  date: string;
  presetId: PresetId;
  svgData?: string;
  isPinned?: boolean;
}

export interface HistoryFilterOptions {
  searchQuery?: string;
  type?: QRType | 'all';
  pinnedOnly?: boolean;
}
