import { GlassContainer } from "@/components/ui/glass-container";
import { CategoryBar } from "@/features/templates/components/category-bar";
import { TemplateCard } from "@/features/templates/components/template-card";
import {
  QRTemplate,
  TEMPLATES_LIST,
} from "@/features/templates/constants/templates";
import { useRouter } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { FlatList, Platform, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ExploreScreen() {
  const router = useRouter();
  const [selectedCat, setSelectedCat] = useState("All");

  const filteredTemplates = useMemo(() => {
    if (selectedCat === "All") return TEMPLATES_LIST;
    return TEMPLATES_LIST.filter((t) => t.category === selectedCat);
  }, [selectedCat]);

  const handleUseTemplate = useCallback(
    (template: QRTemplate) => {
      router.navigate({
        pathname: "/studio",
        params: { initialType: template.type },
      });
    },
    [router],
  );

  const renderItem = useCallback(
    ({ item }: { item: QRTemplate }) => (
      <View
        style={{ width: "100%", maxWidth: 640, alignSelf: "center" }}
        className="mb-4"
      >
        <TemplateCard template={item} onUseTemplate={handleUseTemplate} />
      </View>
    ),
    [handleUseTemplate],
  );

  const keyExtractor = useCallback((item: QRTemplate) => item.id, []);

  const ListHeaderComponent = useMemo(
    () => (
      <View style={{ width: "100%", maxWidth: 640, alignSelf: "center" }}>
        {/* Header Section */}
        <View className="my-3 w-full">
          <Text className="text-on-surface text-3xl font-extrabold tracking-tight">
            Template Gallery
          </Text>
          <Text className="text-on-surface-variant text-sm mt-1 leading-5">
            Pre-designed luxury light templates for business, hospitality, and
            events.
          </Text>
        </View>
        {/* Category Filter Chips */}
        <CategoryBar
          selectedCategory={selectedCat}
          onSelectCategory={setSelectedCat}
        />
        <View className="h-3" />
      </View>
    ),
    [selectedCat],
  );

  return (
    <GlassContainer>
      <SafeAreaView className="flex-1">
        <FlatList
          data={filteredTemplates}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ListHeaderComponent={ListHeaderComponent}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingTop: 12,
            paddingBottom: 120,
          }}
          showsVerticalScrollIndicator={false}
          initialNumToRender={4}
          maxToRenderPerBatch={4}
          windowSize={5}
          removeClippedSubviews={Platform.OS !== "web"}
        />
      </SafeAreaView>
    </GlassContainer>
  );
}
