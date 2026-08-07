import { Ionicons } from "@expo/vector-icons";
import { GlassBadge } from "@/components/ui/glass-badge";
import { GlassButton } from "@/components/ui/glass-button";
import { GlassCard } from "@/components/ui/glass-card";
import { QRTemplate } from "@/features/templates/constants/templates";
import { useTheme } from "@/hooks/use-theme";
import { LinearGradient } from "expo-linear-gradient";
import React, { memo, useCallback } from "react";
import { Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg";

interface TemplateCardProps {
  template: QRTemplate;
  onUseTemplate: (template: QRTemplate) => void;
}

export const TemplateCard: React.FC<TemplateCardProps> = memo(
  ({ template, onUseTemplate }) => {
    const { colors } = useTheme();
    const handlePress = useCallback(() => {
      onUseTemplate(template);
    }, [onUseTemplate, template]);

    return (
      <GlassCard className="w-full p-5 gap-4">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-3">
            <LinearGradient
              colors={template.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="w-12 h-12 rounded-2xl items-center justify-center border border-black/[0.04]"
            >
              <Ionicons
                name={template.icon as any}
                size={22}
                color={template.color}
              />
            </LinearGradient>

            <View className="gap-1">
              <Text className="text-on-surface text-base font-extrabold">
                {template.title}
              </Text>
              <GlassBadge
                label={template.category.toUpperCase()}
                variant="primary"
              />
            </View>
          </View>
          <View style={{ borderColor: colors.border, borderWidth: 1 }} className="p-2 rounded-2xl bg-white shadow-sm">
            <QRCode
              value={template.sampleValue}
              size={48}
              color="#1E2A38"
              backgroundColor="transparent"
            />
          </View>
        </View>

        <Text className="text-on-surface-variant text-xs leading-5">
          {template.desc}
        </Text>

        <GlassButton
          accessibilityLabel={`Use ${template.title} template`}
          title="USE TEMPLATE"
          icon="arrow-forward"
          iconPosition="right"
          variant="glass"
          onPress={handlePress}
          className="rounded-2xl py-3"
        />
      </GlassCard>
    );
  },
);

TemplateCard.displayName = "TemplateCard";
