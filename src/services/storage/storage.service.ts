import AsyncStorage from '@react-native-async-storage/async-storage';
import { APP_CONFIG } from '@/config/app.config';
import { Logger } from '@/services/logger/logger.service';
import { QRHistoryItem } from '@/types/history';

const DEFAULT_HISTORY: QRHistoryItem[] = [
  {
    id: '1',
    title: 'Portfolio Link',
    type: 'url',
    value: 'https://qrify.me/portfolio',
    date: 'Oct 24, 2023',
    presetId: 'cyber-cyan',
    isPinned: true,
  },
  {
    id: '2',
    title: 'Office Guest WiFi',
    type: 'wifi',
    value: 'WIFI:S:GuestOffice;T:WPA;P:Welcome2023!;;',
    date: 'Oct 22, 2023',
    presetId: 'emerald-matrix',
    isPinned: false,
  },
  {
    id: '3',
    title: 'Business Card',
    type: 'vcard',
    value: 'BEGIN:VCARD\nVERSION:3.0\nN:Alex Morgan\nTEL:+123456789\nEND:VCARD',
    date: 'Oct 15, 2023',
    presetId: 'imperial-gold',
    isPinned: false,
  },
];

type StorageListener = () => void;

class StorageService {
  private memoryHistory: QRHistoryItem[] = [...DEFAULT_HISTORY];
  private listeners: Set<StorageListener> = new Set();
  private isInitialized = false;

  constructor() {
    this.initStorage();
  }

  private async initStorage(): Promise<void> {
    try {
      const storedData = await AsyncStorage.getItem(APP_CONFIG.storageKeys.history);
      if (storedData) {
        const parsed = JSON.parse(storedData);
        if (Array.isArray(parsed) && parsed.length > 0) {
          this.memoryHistory = parsed;
        }
      }
    } catch (error) {
      Logger.error('Failed to load history from persistent storage:', error);
    } finally {
      this.isInitialized = true;
      this.notifyListeners();
    }
  }

  private async persist(): Promise<void> {
    try {
      await AsyncStorage.setItem(
        APP_CONFIG.storageKeys.history,
        JSON.stringify(this.memoryHistory)
      );
    } catch (error) {
      Logger.error('Failed to persist history to storage:', error);
    }
  }

  public getHistory(): QRHistoryItem[] {
    return [...this.memoryHistory];
  }

  public async addHistoryItem(
    item: Omit<QRHistoryItem, 'id' | 'date'>
  ): Promise<QRHistoryItem> {
    const newItem: QRHistoryItem = {
      ...item,
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      isPinned: false,
    };

    this.memoryHistory = [newItem, ...this.memoryHistory].slice(
      0,
      APP_CONFIG.maxHistoryItems
    );
    this.notifyListeners();
    await this.persist();
    return newItem;
  }

  public async togglePinItem(id: string): Promise<void> {
    this.memoryHistory = this.memoryHistory.map((item) =>
      item.id === id ? { ...item, isPinned: !item.isPinned } : item
    );
    this.notifyListeners();
    await this.persist();
  }

  public async deleteHistoryItem(id: string): Promise<void> {
    this.memoryHistory = this.memoryHistory.filter((item) => item.id !== id);
    this.notifyListeners();
    await this.persist();
  }

  public async clearHistory(): Promise<void> {
    this.memoryHistory = [];
    this.notifyListeners();
    await this.persist();
  }

  public subscribe(listener: StorageListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach((listener) => {
      try {
        listener();
      } catch (err) {
        Logger.error('Error executing storage listener:', err);
      }
    });
  }
}

export const Storage = new StorageService();
