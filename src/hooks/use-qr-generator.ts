import { PresetId, CustomizationOptions, QRType } from '@/types/qr';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export interface UseQRGeneratorProps {
  initialType?: QRType;
}

export const useQRGenerator = (props?: UseQRGeneratorProps) => {
  const [selectedType, setSelectedType] = useState<QRType>(props?.initialType || 'url');

  useEffect(() => {
    if (props?.initialType) {
      setSelectedType(props.initialType);
    }
  }, [props?.initialType]);
  const [presetId, setPresetId] = useState<PresetId>('minimal-white');

  const [customOpts, setCustomOpts] = useState<CustomizationOptions>({
    bgColor: '#FFFFFF',
    moduleShape: 'rounded',
    eyeStyle: 'rounded',
    logo: 'qrstudio',
    padding: 16,
  });

  // Inputs
  const [url, setUrl] = useState('https://qrstudio.me/business-pro');
  const [text, setText] = useState('Hello from Liquid Glass Studio');

  // WiFi
  const [wifiSSID, setWifiSSID] = useState('GuestOffice_5G');
  const [wifiPass, setWifiPass] = useState('LiquidGlass2026!');
  const [wifiEnc, setWifiEnc] = useState<'WPA' | 'WEP' | 'nopass'>('WPA');

  // VCard
  const [vName, setVName] = useState('Alex Morgan');
  const [vPhone, setVPhone] = useState('+1 415 555 0199');
  const [vEmail, setVEmail] = useState('alex.morgan@qrstudio.me');
  const [vOrg, setVOrg] = useState('Liquid Design Studio');

  // Email
  const [emailTo, setEmailTo] = useState('contact@qrstudio.me');
  const [emailSubject, setEmailSubject] = useState('Inquiry via QR Studio');

  // Phone
  const [phoneNum, setPhoneNum] = useState('+1 415 555 0199');

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
