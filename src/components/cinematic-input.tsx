import React from 'react';
import { View } from 'react-native';

import { GlassCard } from '@/components/ui/glass-card';
import { GlassInput } from '@/components/ui/glass-input';
import { QRType } from '@/types/qr';

interface CinematicInputProps {
  type: QRType;
  value: string;
  onChangeValue: (text: string) => void;

  // WiFi
  wifiSSID?: string;
  setWifiSSID?: (text: string) => void;
  wifiPass?: string;
  setWifiPass?: (text: string) => void;
  wifiEnc?: 'WPA' | 'WEP' | 'nopass';
  setWifiEnc?: (type: 'WPA' | 'WEP' | 'nopass') => void;

  // VCard
  vName?: string;
  setVName?: (text: string) => void;
  vPhone?: string;
  setVPhone?: (text: string) => void;
  vEmail?: string;
  setVEmail?: (text: string) => void;
  vOrg?: string;
  setVOrg?: (text: string) => void;

  // Email
  emailTo?: string;
  setEmailTo?: (text: string) => void;
  emailSubject?: string;
  setEmailSubject?: (text: string) => void;

  // Phone
  phoneNum?: string;
  setPhoneNum?: (text: string) => void;

  onClear?: () => void;
}

export const CinematicInput = React.memo(function CinematicInput({
  type,
  value,
  onChangeValue,
  wifiSSID = '',
  setWifiSSID,
  wifiPass = '',
  setWifiPass,
  vName = '',
  setVName,
  vPhone = '',
  setVPhone,
  vEmail = '',
  setVEmail,
  vOrg = '',
  setVOrg,
  emailTo = '',
  setEmailTo,
  emailSubject = '',
  setEmailSubject,
  phoneNum = '',
  setPhoneNum,
  onClear,
}: CinematicInputProps) {
  return (
    <GlassCard className="p-5 my-3 w-full">
      <View className="gap-4">
        {type === 'url' && (
          <GlassInput
            label="WEBSITE URL"
            icon="link-outline"
            placeholder="https://yourwebsite.com"
            value={value}
            onChangeText={onChangeValue}
            autoCapitalize="none"
            keyboardType="url"
            onClear={onClear}
          />
        )}

        {type === 'text' && (
          <GlassInput
            label="CUSTOM MESSAGE"
            icon="document-text-outline"
            placeholder="Type your announcement or note..."
            value={value}
            onChangeText={onChangeValue}
            multiline
            numberOfLines={3}
            onClear={onClear}
          />
        )}

        {type === 'wifi' && (
          <View className="gap-3">
            <GlassInput
              label="NETWORK NAME (SSID)"
              icon="wifi-outline"
              placeholder="e.g. Office_Guest_5G"
              value={wifiSSID}
              onChangeText={setWifiSSID}
            />
            <GlassInput
              label="PASSWORD"
              icon="lock-closed-outline"
              placeholder="Enter Wi-Fi password"
              value={wifiPass}
              onChangeText={setWifiPass}
              secureTextEntry
            />
          </View>
        )}

        {type === 'vcard' && (
          <View className="gap-3">
            <GlassInput
              label="FULL NAME"
              icon="person-outline"
              placeholder="Alex Morgan"
              value={vName}
              onChangeText={setVName}
            />
            <GlassInput
              label="PHONE NUMBER"
              icon="call-outline"
              placeholder="+1 (555) 000-1122"
              value={vPhone}
              onChangeText={setVPhone}
              keyboardType="phone-pad"
            />
            <GlassInput
              label="EMAIL ADDRESS"
              icon="mail-outline"
              placeholder="alex@company.com"
              value={vEmail}
              onChangeText={setVEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <GlassInput
              label="ORGANIZATION"
              icon="briefcase-outline"
              placeholder="Design Studio"
              value={vOrg}
              onChangeText={setVOrg}
            />
          </View>
        )}

        {type === 'email' && (
          <View className="gap-3">
            <GlassInput
              label="RECIPIENT EMAIL"
              icon="mail-outline"
              placeholder="contact@qrstudio.me"
              value={emailTo}
              onChangeText={setEmailTo}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <GlassInput
              label="SUBJECT LINE"
              icon="create-outline"
              placeholder="Inquiry regarding QR Studio"
              value={emailSubject}
              onChangeText={setEmailSubject}
            />
          </View>
        )}

        {type === 'phone' && (
          <GlassInput
            label="TARGET PHONE NUMBER"
            icon="call-outline"
            placeholder="+1 415 555 0199"
            value={phoneNum}
            onChangeText={setPhoneNum}
            keyboardType="phone-pad"
            onClear={onClear}
          />
        )}
      </View>
    </GlassCard>
  );
});
