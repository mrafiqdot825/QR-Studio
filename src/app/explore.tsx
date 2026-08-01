import { GlassContainer } from "@/components/ui/glass-container";
import { CategoryBar } from "@/features/templates/components/category-bar";
import { TemplateCard } from "@/features/templates/components/template-card";
import {
  QRTemplate,
  TEMPLATES_LIST,
} from "@/features/templates/constants/templates";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ExploreScreen() {
  const router = useRouter();
  const [selectedCat, setSelectedCat] = useState("All");

  const filteredTemplates = useMemo(() => {
    if (selectedCat === "All") return TEMPLATES_LIST;
    return TEMPLATES_LIST.filter((t) => t.category === selectedCat);
  }, [selectedCat]);

  const handleUseTemplate = (template: QRTemplate) => {
    router.navigate({
      pathname: "/studio",
      params: { initialType: template.type },
    });
  };

  return (
    <GlassContainer>
      <SafeAreaView className="flex-1">
        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            alignItems: "center",
            paddingHorizontal: 20,
            paddingTop: 12,
            paddingBottom: 120,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View className="w-full max-w-[640px]">
            {/* Header Section */}
            <View className="my-3">
              <Text className="text-on-surface text-3xl font-extrabold tracking-tight">
                Template Gallery
              </Text>
              <Text className="text-on-surface-variant text-sm mt-1">
                Pre-designed luxury light templates for business, hospitality,
                and events.
              </Text>
            </View>
            {/* Category Filter Chips */}
            <CategoryBar
              selectedCategory={selectedCat}
              onSelectCategory={setSelectedCat}
            />
            {/* Template Cards List */}
            <View className="gap-4 my-3">
              {filteredTemplates.map((t) => (
                <TemplateCard
                  key={t.id}
                  template={t}
                  onUseTemplate={handleUseTemplate}
                />
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GlassContainer>
  );
}
