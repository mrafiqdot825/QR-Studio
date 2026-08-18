import { CustomizationOptions, MediaItem, PresetId, QRType } from '@/types/qr';
import { uploadAsync } from 'expo-file-system/legacy';
import * as ImagePicker from 'expo-image-picker';
import { useCallback, useMemo, useRef, useState } from 'react';
import { Platform } from 'react-native';

export interface UseQRGeneratorProps {
  initialType?: QRType;
  initialValue?: string;
}

export const useQRGenerator = (props?: UseQRGeneratorProps) => {
  const [selectedType, setSelectedType] = useState<QRType>(props?.initialType || 'url');
  const [prevType, setPrevType] = useState(props?.initialType);
  const [prevValue, setPrevValue] = useState(props?.initialValue);

  // Inputs
  const [url, setUrl] = useState(
    props?.initialType === 'url' && props?.initialValue
      ? props.initialValue
      : 'https://mrafiq.vercel.app'
  );
  const [text, setText] = useState(
    props?.initialType === 'text' && props?.initialValue
      ? props.initialValue
      : 'Hello from QR Studio! This is Muhammad Rafiq'
  );

  // Media state
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [mediaShareUrl, setMediaShareUrl] = useState<string>('');
  const [isUploadingMedia, setIsUploadingMedia] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'completed' | 'failed'>('idle');
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Sync state when props change
  if (props?.initialType !== prevType || props?.initialValue !== prevValue) {
    setPrevType(props?.initialType);
    setPrevValue(props?.initialValue);

    if (props?.initialType) {
      setSelectedType(props.initialType);
    }
    if (props?.initialValue) {
      if (props.initialType === 'text') {
        setText(props.initialValue);
      } else if (props.initialType === 'url') {
        setUrl(props.initialValue);
      }
    }
  }

  const [presetId, setPresetId] = useState<PresetId>('minimal-white');

  const [customOpts, setCustomOpts] = useState<CustomizationOptions>({
    bgColor: '#FFFFFF',
    moduleShape: 'rounded',
    eyeStyle: 'rounded',
    logo: 'none',
    padding: 16,
  });

  // WiFi
  const [wifiSSID, setWifiSSID] = useState('GuestOffice_5G');
  const [wifiPass, setWifiPass] = useState('LiquidGlass2026!');
  const [wifiEnc, setWifiEnc] = useState<'WPA' | 'WEP' | 'nopass'>('WPA');

  // VCard
  const [vName, setVName] = useState('Muhammad Rafiq');
  const [vPhone, setVPhone] = useState('+923129185825');
  const [vEmail, setVEmail] = useState('mrafiqdot825@gmail.com');
  const [vOrg, setVOrg] = useState('MRafiqDev');

  // Email
  const [emailTo, setEmailTo] = useState('mrafiqdot825@gmail.com');
  const [emailSubject, setEmailSubject] = useState('Inquiry via QR Studio');

  // Phone
  const [phoneNum, setPhoneNum] = useState('+923129185825');

  const qrRef = useRef<any>(null);

  // Helper to upload a single asset cleanly across iOS, Android, and Web
  const uploadSingleMediaAsset = async (item: MediaItem): Promise<string> => {
    const mimeType = item.mimeType || (item.type === 'video' ? 'video/mp4' : 'image/jpeg');

    // 1. Primary Host: tmpfiles.org
    try {
      if (Platform.OS !== 'web') {
        const uploadResult = await uploadAsync(
          'https://tmpfiles.org/api/v1/upload',
          item.uri,
          {
            fieldName: 'file',
            httpMethod: 'POST',
            uploadType: 1 as any,
            mimeType,
          }
        );

        if (uploadResult.status >= 200 && uploadResult.status < 300) {
          const responseJson = JSON.parse(uploadResult.body);
          if (responseJson && responseJson.data && responseJson.data.url) {
            return responseJson.data.url;
          }
        }
      } else {
        const blobRes = await fetch(item.uri);
        const fileBlob = await blobRes.blob();
        const formData = new FormData();
        formData.append('file', fileBlob, item.name);

        const webRes = await fetch('https://tmpfiles.org/api/v1/upload', {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json',
          },
        });

        if (webRes.ok) {
          const responseJson = await webRes.json();
          if (responseJson && responseJson.data && responseJson.data.url) {
            return responseJson.data.url;
          }
        }
      }
    } catch {
      // Fallthrough to Catbox fallback
    }

    // 2. Secondary Host: catbox.moe (Permanent CDN files, zero expiration)
    if (Platform.OS !== 'web') {
      const catboxResult = await uploadAsync(
        'https://catbox.moe/user/api.php',
        item.uri,
        {
          fieldName: 'fileToUpload',
          httpMethod: 'POST',
          uploadType: 1 as any,
          mimeType,
          parameters: {
            reqtype: 'fileupload',
          },
        }
      );

      if (catboxResult.status >= 200 && catboxResult.status < 300 && catboxResult.body) {
        const catboxUrl = catboxResult.body.trim();
        if (catboxUrl.startsWith('http://') || catboxUrl.startsWith('https://')) {
          return catboxUrl;
        }
      }
    }

    throw new Error(`Failed to upload ${item.name} to cloud. Please check network connection.`);
  };

  // Cloud Upload Worker
  const uploadItemsToCloud = useCallback(async (itemsToUpload: MediaItem[]) => {
    if (itemsToUpload.length === 0) return;

    setIsUploadingMedia(true);
    setUploadStatus('uploading');
    setUploadProgress(10);
    setUploadError(null);

    try {
      const uploadedUrls: string[] = [];

      for (let i = 0; i < itemsToUpload.length; i++) {
        const item = itemsToUpload[i];
        if (item.uploadUrl) {
          uploadedUrls.push(item.uploadUrl);
          continue;
        }

        const directUrl = await uploadSingleMediaAsset(item);
        item.uploadUrl = directUrl;
        uploadedUrls.push(directUrl);

        setUploadProgress(Math.round(((i + 1) / itemsToUpload.length) * 100));
      }

      if (uploadedUrls.length > 0) {
        const finalUrl = uploadedUrls.length === 1 ? uploadedUrls[0] : uploadedUrls.join('\n');
        setMediaShareUrl(finalUrl);
        setUploadStatus('completed');
      }
    } catch (err: any) {
      setUploadStatus('failed');
      setUploadError(err.message || 'Failed to upload media to cloud.');
    } finally {
      setIsUploadingMedia(false);
    }
  }, []);

  // Media Picker Handler
  const handlePickMedia = useCallback(async () => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        setUploadError('Permission to access photo gallery was denied.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images', 'videos'],
        allowsMultipleSelection: true,
        quality: 0.8,
        selectionLimit: 10,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const newItems: MediaItem[] = result.assets.map((asset, idx) => {
          const isVideo = asset.type === 'video';
          const name = asset.fileName || `${isVideo ? 'video' : 'image'}_${Date.now()}_${idx}${isVideo ? '.mp4' : '.jpg'}`;
          return {
            id: `${Date.now()}_${Math.random().toString(36).substr(2, 6)}_${idx}`,
            uri: asset.uri,
            name,
            type: isVideo ? 'video' : 'image',
            mimeType: asset.mimeType || (isVideo ? 'video/mp4' : 'image/jpeg'),
            fileSize: asset.fileSize,
            duration: asset.duration || undefined,
          };
        });

        setMediaItems((prev) => {
          const combined = [...prev, ...newItems];
          uploadItemsToCloud(combined);
          return combined;
        });
        setUploadError(null);
      }
    } catch (err: any) {
      setUploadError(err.message || 'Failed to pick media files.');
    }
  }, [uploadItemsToCloud]);

  const handleRemoveMediaItem = useCallback((id: string) => {
    setMediaItems((prev) => {
      const filtered = prev.filter((item) => item.id !== id);
      if (filtered.length === 0) {
        setMediaShareUrl('');
        setUploadStatus('idle');
      }
      return filtered;
    });
  }, []);

  const handleUploadMediaToCloud = useCallback(() => {
    uploadItemsToCloud(mediaItems);
  }, [mediaItems, uploadItemsToCloud]);

  const payloadValue = useMemo(() => {
    switch (selectedType) {
      case 'media':
        if (mediaShareUrl) {
          return mediaShareUrl;
        }
        if (mediaItems.length > 0) {
          const uploaded = mediaItems.filter((m) => m.uploadUrl).map((m) => m.uploadUrl as string);
          if (uploaded.length > 0) {
            return uploaded.join('\n');
          }
          const validHttp = mediaItems.filter((m) => m.uri.startsWith('http://') || m.uri.startsWith('https://')).map((m) => m.uri);
          if (validHttp.length > 0) {
            return validHttp.join('\n');
          }
          return `https://qrstudio.me/media-share?name=${encodeURIComponent(mediaItems[0].name)}`;
        }
        return 'https://qrstudio.me/media-gallery';
      case 'wifi':
        return `WIFI:S:${wifiSSID};T:${wifiEnc};P:${wifiPass};;`;
      case 'vcard':
        return `BEGIN:VCARD\nVERSION:3.0\nN:${vName}\nTEL:${vPhone}\nEMAIL:${vEmail}\nORG:${vOrg}\nEND:VCARD`;
      case 'email':
        return `mailto:${emailTo}?subject=${encodeURIComponent(emailSubject)}`;
      case 'phone':
        return `tel:${phoneNum}`;
      case 'text':
        return text;
      case 'url':
      default:
        return url;
    }
  }, [
    selectedType,
    url,
    text,
    wifiSSID,
    wifiPass,
    wifiEnc,
    vName,
    vPhone,
    vEmail,
    vOrg,
    emailTo,
    emailSubject,
    phoneNum,
    mediaShareUrl,
    mediaItems,
  ]);

  const handleClearInputs = useCallback(() => {
    setUrl('');
    setText('');
    setPhoneNum('');
    setWifiSSID('');
    setWifiPass('');
    setVName('');
    setVPhone('');
    setVEmail('');
    setVOrg('');
    setEmailTo('');
    setEmailSubject('');
    setMediaItems([]);
    setMediaShareUrl('');
    setUploadStatus('idle');
    setUploadError(null);
  }, []);

  return {
    selectedType,
    setSelectedType,
    presetId,
    setPresetId,
    customOpts,
    setCustomOpts,
    payloadValue,
    qrRef,
    handleClearInputs,
    // Media Controls
    mediaItems,
    mediaShareUrl,
    setMediaShareUrl,
    isUploadingMedia,
    uploadProgress,
    uploadStatus,
    uploadError,
    handlePickMedia,
    handleRemoveMediaItem,
    handleUploadMediaToCloud,
    // Input bindings
    formFields: useMemo(
      () => ({
        url,
        setUrl,
        text,
        setText,
        wifiSSID,
        setWifiSSID,
        wifiPass,
        setWifiPass,
        wifiEnc,
        setWifiEnc,
        vName,
        setVName,
        vPhone,
        setVPhone,
        vEmail,
        setVEmail,
        vOrg,
        setVOrg,
        emailTo,
        setEmailTo,
        emailSubject,
        setEmailSubject,
        phoneNum,
        setPhoneNum,
      }),
      [
        url,
        text,
        wifiSSID,
        wifiPass,
        wifiEnc,
        vName,
        vPhone,
        vEmail,
        vOrg,
        emailTo,
        emailSubject,
        phoneNum,
      ]
    ),
  };
};
