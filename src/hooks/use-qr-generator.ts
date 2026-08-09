import { CustomizationOptions, PresetId, QRType } from '@/types/qr';
import { useCallback, useMemo, useRef, useState } from 'react';

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
      : 'Hello from QR Studio! This is  Muhammad Rafiq'
  );

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

  const payloadValue = useMemo(() => {
    switch (selectedType) {
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
