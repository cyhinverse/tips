import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  useColorScheme,
  View,
} from "react-native";
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const SAVED_TIPS = [
  {
    id: "1",
    title: "Morning Routine Tips for a Productive Day",
    category: "Life",
    author: "Sarah",
    authorAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
    savedAt: "2 days ago",
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=400",
  },
  {
    id: "2",
    title: "How to Save Money on Groceries",
    category: "Money",
    author: "Mike",
    authorAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    savedAt: "1 week ago",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400",
  },
  {
    id: "3",
    title: "5 Exercises You Can Do at Your Desk",
    category: "Health",
    author: "Emma",
    authorAvatar: "https://randomuser.me/api/portraits/women/68.jpg",
    savedAt: "2 weeks ago",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400",
  },
];

const COLLECTIONS = [
  { id: "1", name: "Favorites", count: 12, color: "#ec4899" },
  { id: "2", name: "Read Later", count: 8, color: "#6366f1" },
  { id: "3", name: "Work Tips", count: 5, color: "#10b981" },
];

export default function SavedScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const insets = useSafeAreaInsets();

  const SavedTipCard = ({
    tip,
    index,
  }: {
    tip: (typeof SAVED_TIPS)[0];
    index: number;
  }) => {
    const scale = useSharedValue(1);
    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
    }));

    return (
      <AnimatedPressable
        entering={FadeInDown.delay(index * 100 + 200).springify()}
        style={animatedStyle}
        onPressIn={() => {
          scale.value = withSpring(0.98);
        }}
        onPressOut={() => {
          scale.value = withSpring(1);
        }}
        onPress={() => router.push(`/tip/${tip.id}`)}
        className={`mb-4 flex-row rounded-3xl p-4 ${isDark ? "bg-[#1E1E1E]" : "bg-white"}`}
        // style={{
        //   shadowColor: "#000",
        //   shadowOffset: { width: 0, height: 4 },
        //   shadowOpacity: isDark ? 0 : 0.06,
        //   shadowRadius: 12,
        // }}
      >
        <Image source={{ uri: tip.image }} className="h-20 w-20 rounded-2xl" />
        <View className="ml-4 flex-1 justify-center">
          <View
            className={`mb-2 self-start rounded-full px-2.5 py-1 ${isDark ? "bg-[#2A2A2A]" : "bg-gray-100"}`}
          >
            <Text
              className={`text-xs font-medium ${isDark ? "text-gray-400" : "text-gray-500"}`}
            >
              {tip.category}
            </Text>
          </View>
          <Text
            numberOfLines={2}
            className={`text-base font-semibold ${isDark ? "text-white" : "text-gray-900"}`}
          >
            {tip.title}
          </Text>
          <Text
            className={`mt-1 text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}
          >
            Saved {tip.savedAt}
          </Text>
        </View>
        <Pressable className="self-start p-2">
          <Ionicons name="bookmark" size={20} color="#3b82f6" />
        </Pressable>
      </AnimatedPressable>
    );
  };

  return (
    <SafeAreaView
      className={`flex-1 ${isDark ? "bg-[#121212]" : "bg-[#FAFAFA]"}`}
    >
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Animated.View
          entering={FadeInDown.delay(100).springify()}
          className="px-6 pt-2 pb-6"
        >
          <Text
            className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}
          >
            Saved
          </Text>
          <Text
            className={`text-sm mt-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}
          >
            Your bookmarked tips
          </Text>
        </Animated.View>

        {/* Collections */}
        <Animated.View entering={FadeInDown.delay(150).springify()}>
          <Text
            className={`px-6 mb-3 text-sm font-semibold ${isDark ? "text-gray-400" : "text-gray-500"}`}
          >
            Collections
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24 }}
          >
            {/* Add Collection Button */}
            <Pressable
              className={`mr-3 items-center justify-center rounded-2xl p-4 ${isDark ? "bg-[#1E1E1E]" : "bg-white"}`}
              style={{
                width: 100,
                height: 80,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: isDark ? 0 : 0.04,
                shadowRadius: 8,
              }}
            >
              <Ionicons
                name="add-circle-outline"
                size={28}
                color={isDark ? "#6B7280" : "#9CA3AF"}
              />
              <Text
                className={`mt-1 text-xs font-medium ${isDark ? "text-gray-500" : "text-gray-400"}`}
              >
                New
              </Text>
            </Pressable>

            {COLLECTIONS.map((collection) => (
              <Pressable
                key={collection.id}
                className={`mr-3 rounded-2xl p-4 ${isDark ? "bg-[#1E1E1E]" : "bg-white"}`}
                style={{
                  width: 100,
                  height: 80,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: isDark ? 0 : 0.04,
                  shadowRadius: 8,
                }}
              >
                <View
                  className="mb-2 h-8 w-8 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${collection.color}20` }}
                >
                  <Ionicons name="folder" size={18} color={collection.color} />
                </View>
                <Text
                  numberOfLines={1}
                  className={`text-xs font-semibold ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  {collection.name}
                </Text>
                <Text
                  className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}
                >
                  {collection.count} tips
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </Animated.View>

        {/* Saved Tips */}
        <View className="mt-6 px-6">
          <Text
            className={`mb-4 text-sm font-semibold ${isDark ? "text-gray-400" : "text-gray-500"}`}
          >
            All Saved ({SAVED_TIPS.length})
          </Text>
          {SAVED_TIPS.map((tip, index) => (
            <SavedTipCard key={tip.id} tip={tip} index={index} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
