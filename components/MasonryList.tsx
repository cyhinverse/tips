import { router } from "expo-router";
import { RefreshControl, ScrollView, View, useColorScheme } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TipCard, { Tip } from "./TipCard";

interface MasonryListProps {
  data: Tip[];
  onRefresh?: () => void;
  refreshing?: boolean;
}

export default function MasonryList({
  data,
  onRefresh,
  refreshing = false,
}: MasonryListProps) {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  // Split data into two columns
  const evenItems = data.filter((_, index) => index % 2 === 0);
  const oddItems = data.filter((_, index) => index % 2 !== 0);

  return (
    <ScrollView
      contentContainerStyle={{
        paddingTop: 8,
        paddingBottom: insets.bottom + 100, // Extra padding for floating tab bar
        paddingHorizontal: 16,
      }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={isDark ? "#fff" : "#1A1A1A"}
        />
      }
      showsVerticalScrollIndicator={false}
    >
      <View className="flex-row" style={{ gap: 12 }}>
        <View className="flex-1">
          {evenItems.map((item) => (
            <TipCard
              key={item.id}
              tip={item}
              onPress={() =>
                router.push({ pathname: "/tip/[id]", params: { id: item.id } })
              }
            />
          ))}
        </View>
        <View className="flex-1">
          {oddItems.map((item) => (
            <TipCard
              key={item.id}
              tip={item}
              onPress={() =>
                router.push({ pathname: "/tip/[id]", params: { id: item.id } })
              }
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
