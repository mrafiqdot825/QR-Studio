export const APP_CONFIG = {
  name: 'QRify',
  version: '2.0.0',
  build: '1',
  scheme: 'qrify',
  supportEmail: 'mrafiqdot825@gmail.com',
  maxHistoryItems: 200,
  defaultQrSize: 200,
  exportMinSize: 512,
  exportMaxSize: 4096,
  storageKeys: {
    history: '@qrify/history_v2',
    settings: '@qrify/settings_v1',
  },
} as const;
