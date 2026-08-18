import { PlainTextEditorModal } from '@/components/plain-text-editor-modal';
import { GlassCard } from '@/components/ui/glass-card';
import { GlassInput } from '@/components/ui/glass-input';
import { Palette } from '@/constants/theme';
import { MediaItem, QRType } from '@/types/qr';
import { openInDefaultTextEditor } from '@/utils/qr-exporter';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import * as Haptics from 'expo-haptics';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Platform, Pressable, ScrollView, Text, View } from 'react-native';

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

  // Media
  mediaItems?: MediaItem[];
  mediaShareUrl?: string;
  isUploadingMedia?: boolean;
  uploadProgress?: number;
  uploadStatus?: 'idle' | 'uploading' | 'completed' | 'failed';
  uploadError?: string | null;
  onPickMedia?: () => void;
  onRemoveMediaItem?: (id: string) => void;
  onUploadMediaToCloud?: () => void;

  onClear?: () => void;
}

const formatFileSize = (bytes?: number) => {
  if (!bytes) return '';
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

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
  mediaItems = [],
  mediaShareUrl = '',
  isUploadingMedia = false,
  uploadProgress = 0,
  uploadStatus = 'idle',
  uploadError = null,
  onPickMedia,
  onRemoveMediaItem,
  onUploadMediaToCloud,
  onClear,
}: CinematicInputProps) {
  const [editorOpen, setEditorOpen] = useState(false);

  const openEditor = useCallback(() => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    }
    setEditorOpen(true);
  }, []);

  const closeEditor = useCallback(() => {
    setEditorOpen(false);
  }, []);

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

        {type === 'media' && (
          <View className="gap-4">
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-on-surface font-extrabold text-sm uppercase tracking-wider">
                  MEDIA & GALLERY UPLOAD
                </Text>
                <Text className="text-on-surface-variant text-xs mt-0.5">
                  Attach photos/videos to encode into a QR Code.
                </Text>
              </View>

              {mediaItems.length > 0 && (
                <View className="px-2.5 py-1 rounded-full bg-accent/15 border border-accent/30">
                  <Text className="text-accent text-xs font-extrabold">
                    {mediaItems.length} {mediaItems.length === 1 ? 'file' : 'files'}
                  </Text>
                </View>
              )}
            </View>

            {/* PICK & UPLOAD ACTION BUTTONS */}
            <View className="flex-row flex-wrap gap-2">
              <Pressable
                accessibilityLabel="Select photos or videos"
                accessibilityRole="button"
                onPress={() => {
                  if (Platform.OS !== 'web') {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
                  }
                  onPickMedia?.();
                }}
                className="flex-1 flex-row items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-accent border border-accent/40 active:scale-98">
                <Ionicons name="images-outline" size={18} color="#FFFFFF" />
                <Text className="text-white font-extrabold text-xs">
                  {mediaItems.length === 0 ? 'Pick Photos & Videos' : 'Add More Assets'}
                </Text>
              </Pressable>

              {mediaItems.length > 0 && (
                <Pressable
                  accessibilityLabel="Upload media to cloud"
                  accessibilityRole="button"
                  onPress={() => {
                    if (Platform.OS !== 'web') {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
                    }
                    onUploadMediaToCloud?.();
                  }}
                  disabled={isUploadingMedia}
                  className={`flex-row items-center justify-center gap-2 py-3 px-4 rounded-2xl border active:scale-98 ${
                    uploadStatus === 'completed'
                      ? 'bg-emerald-500/20 border-emerald-500/40'
                      : 'bg-accent/15 border-accent/40'
                  }`}>
                  {isUploadingMedia ? (
                    <ActivityIndicator size="small" color={Palette.cyan} />
                  ) : (
                    <Ionicons
                      name={uploadStatus === 'completed' ? 'cloud-done-outline' : 'cloud-upload-outline'}
                      size={18}
                      color={uploadStatus === 'completed' ? Palette.emerald : Palette.cyan}
                    />
                  )}
                  <Text
                    className={`font-extrabold text-xs ${
                      uploadStatus === 'completed' ? 'text-emerald-400' : 'text-accent'
                    }`}>
                    {isUploadingMedia
                      ? `Uploading ${uploadProgress}%`
                      : uploadStatus === 'completed'
                      ? 'Cloud Synced'
                      : 'Upload to Cloud'}
                  </Text>
                </Pressable>
              )}
            </View>

            {/* ERROR CARD */}
            {uploadError && (
              <View className="p-3 rounded-2xl bg-red-500/15 border border-red-500/30 flex-row items-center gap-2">
                <Ionicons name="alert-circle-outline" size={18} color="#EF4444" />
                <Text className="text-red-400 text-xs font-semibold flex-1">{uploadError}</Text>
              </View>
            )}

            {/* CLOUD SHARE STATUS */}
            {uploadStatus === 'completed' && mediaShareUrl && (
              <View className="p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 gap-1.5">
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center gap-1.5">
                    <Ionicons name="checkmark-circle" size={16} color={Palette.emerald} />
                    <Text className="text-emerald-400 font-extrabold text-xs">
                      Hosted Cloud Link Ready
                    </Text>
                  </View>
                  <Text className="text-emerald-300/70 text-[10px]">Scannable Anywhere</Text>
                </View>
                <Text className="text-on-surface text-xs font-mono select-all" numberOfLines={2}>
                  {mediaShareUrl}
                </Text>
              </View>
            )}

            {/* SELECTED MEDIA THUMBNAILS GRID */}
            {mediaItems.length > 0 ? (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 10, paddingVertical: 4 }}>
                {mediaItems.map((item) => (
                  <View
                    key={item.id}
                    className="relative w-28 h-32 rounded-2xl overflow-hidden bg-surface-variant border border-white/10 items-center justify-center">
                    {item.type === 'image' ? (
                      <Image
                        source={{ uri: item.uri }}
                        className="w-full h-full"
                        contentFit="cover"
                      />
                    ) : (
                      <View className="w-full h-full bg-slate-800 items-center justify-center gap-1">
                        <View className="w-10 h-10 rounded-full bg-accent/30 items-center justify-center">
                          <Ionicons name="play" size={20} color="#FFFFFF" />
                        </View>
                        <Text className="text-white text-[10px] font-bold uppercase tracking-wide">
                          VIDEO
                        </Text>
                      </View>
                    )}

                    {/* FILE TYPE BADGE */}
                    <View className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-md bg-black/60 backdrop-blur-md">
                      <Text className="text-white text-[9px] font-extrabold uppercase">
                        {item.type}
                      </Text>
                    </View>

                    {/* SIZE BADGE */}
                    {item.fileSize && (
                      <View className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded-md bg-black/60 backdrop-blur-md">
                        <Text className="text-white/80 text-[9px] font-medium">
                          {formatFileSize(item.fileSize)}
                        </Text>
                      </View>
                    )}

                    {/* REMOVE BUTTON */}
                    <Pressable
                      accessibilityLabel={`Remove ${item.name}`}
                      accessibilityRole="button"
                      onPress={() => onRemoveMediaItem?.(item.id)}
                      className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/70 items-center justify-center active:scale-90">
                      <Ionicons name="close" size={14} color="#FFFFFF" />
                    </Pressable>
                  </View>
                ))}
              </ScrollView>
            ) : (
              <View className="p-6 rounded-2xl border border-dashed border-white/20 items-center justify-center gap-2 bg-surface-variant/30">
                <View className="w-12 h-12 rounded-full bg-accent/10 items-center justify-center">
                  <Ionicons name="images-outline" size={24} color={Palette.cyan} />
                </View>
                <Text className="text-on-surface font-extrabold text-xs text-center">
                  No images or videos attached
                </Text>
                <Text className="text-on-surface-variant text-[11px] text-center max-w-[240px]">
                  {'Tap "Pick Photos & Videos" above to select multiple files from your device gallery.'}
                </Text>
              </View>
            )}
          </View>
        )}

        {type === 'text' && (
          <View className="gap-2">
            <GlassInput
              label="CUSTOM MESSAGE"
              icon="document-text-outline"
              placeholder="Type your announcement, note or plain text..."
              value={value}
              onChangeText={onChangeValue}
              multiline
              numberOfLines={3}
              onClear={onClear}
            />

            <View className="flex-row items-center justify-between pt-1">
              <Text className="text-on-surface-variant text-xs">
                {value ? `${value.length} characters` : '0 characters'}
              </Text>

              <View className="flex-row items-center gap-2">
                <Pressable
                  accessibilityLabel="Open in Phone Default Text Editor"
                  accessibilityRole="button"
                  onPress={() => {
                    if (Platform.OS !== 'web') {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
                    }
                    openInDefaultTextEditor(value);
                  }}
                  className="flex-row items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 active:scale-95">
                  <Ionicons name="open-outline" size={14} color={Palette.emerald} />
                  <Text className="text-emerald-400 text-xs font-bold">Open in Phone Editor</Text>
                </Pressable>

                <Pressable
                  accessibilityLabel="Expand full text editor"
                  accessibilityRole="button"
                  onPress={openEditor}
                  className="flex-row items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/15 border border-accent/30 active:scale-95">
                  <Ionicons name="expand-outline" size={14} color={Palette.cyan} />
                  <Text className="text-accent text-xs font-bold">Expand Editor</Text>
                </Pressable>
              </View>
            </View>

            <PlainTextEditorModal
              visible={editorOpen}
              onClose={closeEditor}
              value={value}
              onChangeValue={onChangeValue}
            />
          </View>
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
              placeholder="MRafiqdot"
              value={vName}
              onChangeText={setVName}
            />
            <GlassInput
              label="PHONE NUMBER"
              icon="call-outline"
              placeholder="+923129185825"
              value={vPhone}
              onChangeText={setVPhone}
              keyboardType="phone-pad"
            />
            <GlassInput
              label="EMAIL ADDRESS"
              icon="mail-outline"
              placeholder="mrafiqdot825@gmail.com"
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
              placeholder="mrafiqdot825@gmail.com"
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
            placeholder="+923129185825"
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
