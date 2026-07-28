import { ActionButtons3D } from '@/components/action-buttons-3d';
import { CinematicInput } from '@/components/cinematic-input';
import { CustomizationStudioControls } from '@/components/customization-studio-controls';
import { ExportModal } from '@/components/export-modal';
import { QRStage3D } from '@/components/qr-stage-3d';
import { QRTypeSelector } from '@/components/qr-type-selector';
import { ThemePresetsBar } from '@/components/theme-presets-bar';
import { GlassContainer } from '@/components/ui/glass-container';
import { useQRGenerator } from '@/hooks/use-qr-generator';
import { QRType } from '@/types/qr';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function StudioScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ initialType?: string }>();
  const initialType = (params.initialType as QRType) || 'url';

  const {
    selectedType,
    setSelectedType,
    presetId,
    setPresetId,
    customOpts,
    setCustomOpts,
    payloadValue,
    qrRef,
    handleClearInputs,
    formFields,
  } = useQRGenerator({ initialType });

  const [exportOpen, setExportOpen] = useState(false);

  return (
    <GlassContainer>
      <SafeAreaView className="flex-1">

        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingTop: 12,
            paddingBottom: 120,
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <View className="w-full max-w-[640px]">
            {/* Header Section */}
            <View className="my-3">
              <Text className="text-on-surface text-3xl font-extrabold tracking-tight">Generator & Studio</Text>
              <Text className="text-on-surface-variant text-sm mt-1">
                Configure data payloads and customize live 3D visual styles.
              </Text>
            </View>

            {/* Type selector pills */}
            <QRTypeSelector
              selectedType={selectedType}
              onSelectType={setSelectedType}
              variant="pills"
            />

            {/* Form Input Card */}
            <CinematicInput
              type={selectedType}
              value={selectedType === 'text' ? formFields.text : formFields.url}
              onChangeValue={selectedType === 'text' ? formFields.setText : formFields.setUrl}
              wifiSSID={formFields.wifiSSID}
              setWifiSSID={formFields.setWifiSSID}
              wifiPass={formFields.wifiPass}
              setWifiPass={formFields.setWifiPass}
              wifiEnc={formFields.wifiEnc}
              setWifiEnc={formFields.setWifiEnc}
              vName={formFields.vName}
              setVName={formFields.setVName}
              vPhone={formFields.vPhone}
              setVPhone={formFields.setVPhone}
              vEmail={formFields.vEmail}
              setVEmail={formFields.setVEmail}
              vOrg={formFields.vOrg}
              setVOrg={formFields.setVOrg}
              emailTo={formFields.emailTo}
              setEmailTo={formFields.setEmailTo}
              emailSubject={formFields.emailSubject}
              setEmailSubject={formFields.setEmailSubject}
              phoneNum={formFields.phoneNum}
              setPhoneNum={formFields.setPhoneNum}
              onClear={handleClearInputs}
            />

            {/* Live 3D Stage Hero */}
            <QRStage3D
              value={payloadValue}
              presetId={presetId}
              qrRef={qrRef}
              typeLabel={selectedType}
              title="Live QR Preview"
              fgColor={customOpts.fgColor}
              onExport={() => setExportOpen(true)}
            />

            {/* Action Buttons */}
            <ActionButtons3D
              qrRef={qrRef}
              payloadValue={payloadValue}
              typeLabel={selectedType}
              presetId={presetId}
              onOpenExport={() => setExportOpen(true)}
            />

            {/* Workspace Customization Studio */}
            <CustomizationStudioControls
              options={customOpts}
              onChangeOptions={setCustomOpts}
            />

            {/* Theme Gallery & Color Picker */}
            <ThemePresetsBar
              selectedPresetId={presetId}
              onSelectPreset={(id) => setPresetId(id)}
              selectedColor={customOpts.fgColor}
              onSelectColor={(color) => setCustomOpts((prev) => ({ ...prev, fgColor: color }))}
            />
          </View>
        </ScrollView>

        {/* EXPORT MODAL */}
        <ExportModal
          visible={exportOpen}
          onClose={() => setExportOpen(false)}
          payloadValue={payloadValue}
          qrRef={qrRef}
          presetId={presetId}
          typeLabel={selectedType}
          fgColor={customOpts.fgColor}
        />
      </SafeAreaView>
    </GlassContainer>
  );
}
