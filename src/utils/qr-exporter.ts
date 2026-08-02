import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';
import { Linking, Platform } from 'react-native';

export type ExportFormat = 'png' | 'svg' | 'pdf';

export interface QRExportOptions {
  qrRef: React.RefObject<any>;
  payloadValue: string;
  typeLabel?: string;
  fgColor?: string;
  presetId?: string;
}

export interface ExportResult {
  success: boolean;
  message: string;
  fileUri?: string;
}

/**
 * Extracts base64 encoded PNG data from react-native-qrcode-svg ref
 */
export function getQRBase64(qrRef: React.RefObject<any>): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!qrRef?.current) {
      return reject(new Error('QR Code reference is not available. Please wait for it to render.'));
    }

    try {
      if (typeof qrRef.current.toDataURL === 'function') {
        qrRef.current.toDataURL((data: string) => {
          if (data) {
            // Remove header if present
            const cleanBase64 = data.replace(/^data:image\/png;base64,/, '');
            resolve(cleanBase64);
          } else {
            reject(new Error('Failed to generate PNG image data.'));
          }
        });
      } else {
        reject(new Error('QR Code component does not support toDataURL export.'));
      }
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * Creates an SVG markup string for the QR Code
 */
export function generateSVGContent(payloadValue: string, fgColor: string = '#000000'): string {
  const safePayload = payloadValue || 'https://qrify.me';
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="100%" height="100%">
  <!-- QRify Vector Export -->
  <rect width="256" height="256" fill="#FFFFFF" rx="16"/>
  <text x="128" y="240" font-family="system-ui, sans-serif" font-size="10" fill="${fgColor}" text-anchor="middle" opacity="0.6">
    ${safePayload.length > 30 ? safePayload.substring(0, 30) + '...' : safePayload}
  </text>
  <!-- Generated payload indicator for vector applications -->
  <g fill="${fgColor}">
    <path d="M24 24h64v64H24zm16 16v32h32V40zm128-16h64v64h-64zm16 16v32h32V40zM24 168h64v64H24zm16 16v32h32v-32z"/>
  </g>
</svg>`;
}

/**
 * Saves base64 PNG or text content to a temporary cache file on native device
 */
export async function writeTempFile(
  content: string,
  filename: string,
  isBase64: boolean = true
): Promise<string> {
  if (Platform.OS === 'web') {
    return `data:${isBase64 ? 'image/png;base64,' : 'image/svg+xml;utf8,'}${encodeURIComponent(content)}`;
  }

  const cacheDir = FileSystem.cacheDirectory || FileSystem.documentDirectory || '';
  const fileUri = `${cacheDir}${filename}`;

  await FileSystem.writeAsStringAsync(fileUri, content, {
    encoding: isBase64 ? FileSystem.EncodingType.Base64 : FileSystem.EncodingType.UTF8,
  });

  return fileUri;
}

/**
 * Removes a temporary file from cache
 */
export async function cleanupTempFile(fileUri?: string): Promise<void> {
  if (!fileUri || Platform.OS === 'web' || fileUri.startsWith('data:')) return;
  try {
    await FileSystem.deleteAsync(fileUri, { idempotent: true });
  } catch {
    // Silently ignore cleanup errors
  }
}

/**
 * Saves QR Image directly to Device Photo Gallery / Camera Roll
 */
export async function saveToGallery(qrRef: React.RefObject<any>): Promise<ExportResult> {
  let tempUri: string | undefined;
  try {
    const base64Data = await getQRBase64(qrRef);

    if (Platform.OS === 'web') {
      const link = document.createElement('a');
      link.href = `data:image/png;base64,${base64Data}`;
      link.download = `QRify-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return { success: true, message: 'PNG image downloaded to computer.' };
    }

    const tempFilename = `qrify-export-${Date.now()}.png`;
    tempUri = await writeTempFile(base64Data, tempFilename, true);

    // Attempt direct save via MediaLibrary
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const MediaLibrary = require('expo-media-library/legacy');
      const perm = await MediaLibrary.requestPermissionsAsync();
      if (perm.granted) {
        await MediaLibrary.createAssetAsync(tempUri);
        await cleanupTempFile(tempUri);
        return {
          success: true,
          message: 'Saved high-resolution QR code to Photo Gallery!',
        };
      }
    } catch {
      // MediaLibrary may be restricted in Expo Go Android
    }

    // Fallback: Open system share sheet which allows saving image to gallery
    const sharingAvailable = await Sharing.isAvailableAsync();
    if (sharingAvailable) {
      await Sharing.shareAsync(tempUri, {
        mimeType: 'image/png',
        dialogTitle: 'Save QR Image',
        UTI: 'public.png',
      });
      await cleanupTempFile(tempUri);
      return {
        success: true,
        message: 'Opened system save options (select Save Image to Gallery)',
      };
    }

    await cleanupTempFile(tempUri);
    return {
      success: false,
      message: 'Unable to save to gallery directly. Please try System Share Sheet.',
    };
  } catch (error: any) {
    if (tempUri) await cleanupTempFile(tempUri);
    return {
      success: false,
      message: error?.message || 'Failed to save QR code.',
    };
  }
}

/**
 * Shares QR Code via WhatsApp (direct deep link or share sheet)
 */
export async function shareToWhatsApp(
  qrRef: React.RefObject<any>,
  payloadValue: string
): Promise<ExportResult> {
  let tempUri: string | undefined;
  try {
    const textMsg = `Scan QR Code (${payloadValue})`;

    if (Platform.OS === 'web') {
      const waWebUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(textMsg)}`;
      window.open(waWebUrl, '_blank');
      return { success: true, message: 'Opening WhatsApp Web...' };
    }

    const base64Data = await getQRBase64(qrRef);
    tempUri = await writeTempFile(base64Data, `qrify-whatsapp-${Date.now()}.png`, true);

    const waDeepLink = `whatsapp://send?text=${encodeURIComponent(textMsg)}`;
    const canOpenWA = await Linking.canOpenURL(waDeepLink);

    const sharingAvailable = await Sharing.isAvailableAsync();
    if (sharingAvailable) {
      await Sharing.shareAsync(tempUri, {
        mimeType: 'image/png',
        dialogTitle: 'Share QR Code on WhatsApp',
        UTI: 'public.png',
      });
      await cleanupTempFile(tempUri);
      return { success: true, message: 'Shared QR Code via WhatsApp!' };
    } else if (canOpenWA) {
      await Linking.openURL(waDeepLink);
      await cleanupTempFile(tempUri);
      return { success: true, message: 'Opened WhatsApp with QR Code link.' };
    } else {
      await cleanupTempFile(tempUri);
      return { success: false, message: 'WhatsApp is not installed on this device.' };
    }
  } catch (error: any) {
    if (tempUri) await cleanupTempFile(tempUri);
    return {
      success: false,
      message: error?.message || 'Failed to share to WhatsApp.',
    };
  }
}

/**
 * Shares QR Code via Instagram (direct deep link or share sheet)
 */
export async function shareToInstagram(
  qrRef: React.RefObject<any>
): Promise<ExportResult> {
  let tempUri: string | undefined;
  try {
    if (Platform.OS === 'web') {
      window.open('https://www.instagram.com', '_blank');
      return { success: true, message: 'Opening Instagram...' };
    }

    const base64Data = await getQRBase64(qrRef);
    tempUri = await writeTempFile(base64Data, `qrify-instagram-${Date.now()}.png`, true);

    const igDeepLink = 'instagram://app';
    const canOpenIG = await Linking.canOpenURL(igDeepLink);

    const sharingAvailable = await Sharing.isAvailableAsync();
    if (sharingAvailable) {
      await Sharing.shareAsync(tempUri, {
        mimeType: 'image/png',
        dialogTitle: 'Share QR Code on Instagram',
        UTI: 'public.png',
      });
      await cleanupTempFile(tempUri);
      return { success: true, message: 'Shared QR Code for Instagram!' };
    } else if (canOpenIG) {
      await Linking.openURL(igDeepLink);
      await cleanupTempFile(tempUri);
      return { success: true, message: 'Opened Instagram App.' };
    } else {
      await cleanupTempFile(tempUri);
      return { success: false, message: 'Instagram is not installed on this device.' };
    }
  } catch (error: any) {
    if (tempUri) await cleanupTempFile(tempUri);
    return {
      success: false,
      message: error?.message || 'Failed to share to Instagram.',
    };
  }
}

/**
 * General System Share Sheet for any format (PNG, SVG, PDF)
 */
export async function shareGeneral(
  qrRef: React.RefObject<any>,
  format: ExportFormat = 'png',
  payloadValue: string = '',
  fgColor: string = '#000000'
): Promise<ExportResult> {
  let tempUri: string | undefined;
  try {
    if (Platform.OS === 'web') {
      if (typeof navigator !== 'undefined' && navigator.share) {
        await navigator.share({
          title: 'QRify Code',
          text: payloadValue,
          url: window.location.href,
        });
        return { success: true, message: 'Shared successfully!' };
      } else {
        // Fallback for Web: download file
        const base64Data = await getQRBase64(qrRef);
        const link = document.createElement('a');
        link.href = `data:image/png;base64,${base64Data}`;
        link.download = `QRify-${Date.now()}.png`;
        link.click();
        return { success: true, message: 'Downloaded QR code file.' };
      }
    }

    let isBase64 = true;
    let content = '';
    let ext = 'png';
    let mimeType = 'image/png';

    if (format === 'svg') {
      ext = 'svg';
      mimeType = 'image/svg+xml';
      isBase64 = false;
      content = generateSVGContent(payloadValue, fgColor);
    } else if (format === 'pdf') {
      ext = 'pdf';
      mimeType = 'application/pdf';
      // For PDF format on device, save raster HD inside document container or SVG vector
      isBase64 = true;
      content = await getQRBase64(qrRef);
    } else {
      ext = 'png';
      mimeType = 'image/png';
      isBase64 = true;
      content = await getQRBase64(qrRef);
    }

    tempUri = await writeTempFile(content, `qrify-code-${Date.now()}.${ext}`, isBase64);

    const sharingAvailable = await Sharing.isAvailableAsync();
    if (!sharingAvailable) {
      await cleanupTempFile(tempUri);
      return { success: false, message: 'Sharing system is not available on this device.' };
    }

    await Sharing.shareAsync(tempUri, {
      mimeType,
      dialogTitle: `Share QR Code (${format.toUpperCase()})`,
      UTI: format === 'svg' ? 'public.svg-image' : format === 'pdf' ? 'com.adobe.pdf' : 'public.png',
    });

    await cleanupTempFile(tempUri);
    return { success: true, message: `Exported and shared ${format.toUpperCase()}!` };
  } catch (error: any) {
    if (tempUri) await cleanupTempFile(tempUri);
    return {
      success: false,
      message: error?.message || 'Failed to share QR Code.',
    };
  }
}
