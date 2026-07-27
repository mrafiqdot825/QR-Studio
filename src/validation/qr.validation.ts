import { QRType } from '@/types/qr';

export interface ValidationResult {
  isValid: boolean;
  errorMessage?: string;
}

export const validateQRPayload = (type: QRType, value: string): ValidationResult => {
  if (!value || value.trim().length === 0) {
    return { isValid: false, errorMessage: 'Content value cannot be empty.' };
  }

  switch (type) {
    case 'url': {
      try {
        const urlStr = value.startsWith('http://') || value.startsWith('https://')
          ? value
          : `https://${value}`;
        new URL(urlStr);
        return { isValid: true };
      } catch {
        return { isValid: false, errorMessage: 'Please enter a valid URL address.' };
      }
    }
    case 'email': {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const mailtoMatch = value.match(/mailto:([^\s?]+)/);
      const emailToTest = mailtoMatch ? mailtoMatch[1] : value;
      if (emailRegex.test(emailToTest)) {
        return { isValid: true };
      }
      return { isValid: false, errorMessage: 'Please enter a valid email address.' };
    }
    case 'phone': {
      const phoneRegex = /^\+?[0-9\s\-()]{7,20}$/;
      const telMatch = value.match(/tel:(.+)/);
      const phoneToTest = telMatch ? telMatch[1] : value;
      if (phoneRegex.test(phoneToTest)) {
        return { isValid: true };
      }
      return { isValid: false, errorMessage: 'Please enter a valid phone number.' };
    }
    case 'wifi':
    case 'vcard':
    case 'text':
    default:
      return { isValid: true };
  }
};
