import { Storage } from '@/services/storage/storage.service';
import { QRHistoryItem } from '@/types/history';

export type { QRHistoryItem };

export const getHistory = (): QRHistoryItem[] => Storage.getHistory();
export const addHistoryItem = (item: Omit<QRHistoryItem, 'id' | 'date'>) =>
  Storage.addHistoryItem(item);
export const saveHistoryItem = addHistoryItem;
export const deleteHistoryItem = (id: string) => Storage.deleteHistoryItem(id);
export const clearHistory = () => Storage.clearHistory();
export const subscribeHistory = (listener: () => void) => Storage.subscribe(listener);
export const togglePinHistoryItem = (id: string) => Storage.togglePinItem(id);
