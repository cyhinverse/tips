import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
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
import TipCard from "../../components/TipCard";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const CATEGORIES = [
  { id: "1", name: "All", icon: "apps" },
  { id: "2", name: "Life", icon: "heart" },
  { id: "3", name: "Work", icon: "briefcase" },
  { id: "4", name: "Health", icon: "fitness" },
  { id: "5", name: "Money", icon: "wallet" },
  { id: "6", name: "Tech", icon: "phone-portrait" },
];

const TIPS = [
  {
    id: "1",
    title: "Morning Routine Tips for a Productive Day",
    category: "Life",
    author: {
      name: "Sarah",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    likes: 234,
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=400",
  },
  {
    id: "2",
    title: "How to Save Money on Groceries",
    category: "Money",
    author: {
      name: "Mike",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    likes: 189,
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400",
  },
  {
    id: "3",
    title: "5 Exercises You Can Do at Your Desk",
    category: "Health",
    author: {
      name: "Emma",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    likes: 312,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400",
  },
  {
    id: "4",
    title: "Best Apps for Time Management",
    category: "Tech",
    author: {
      name: "Alex",
      avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    },
    likes: 156,
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400",
  },
  {
    id: "5",
    title: "Work From Home Productivity Hacks",
    category: "Work",
    author: {
      name: "Lisa",
      avatar: "https://randomuser.me/api/portraits/women/89.jpg",
    },
    likes: 278,
    image: "https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=400",
  },
  {
    id: "6",
    title: "Simple Meditation for Beginners",
    category: "Health",
    author: {
      name: "David",
      avatar: "https://randomuser.me/api/portraits/men/52.jpg",
    },
    likes: 421,
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400",
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState("1");
  const [searchQuery, setSearchQuery] = useState("");

  const CategoryButton = ({
    item,
    isSelected,
  }: {
    item: (typeof CATEGORIES)[0];
    isSelected: boolean;
  }) => {
    const scale = useSharedValue(1);
    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
    }));

    return (
      <AnimatedPressable
        style={[
          animatedStyle,
          {
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: isSelected ? 0.1 : 0.04,
            shadowRadius: 8,
          },
        ]}
        onPressIn={() => {
          scale.value = withSpring(0.95);
        }}
        onPressOut={() => {
          scale.value = withSpring(1);
        }}
        onPress={() => setSelectedCategory(item.id)}
        className={`mr-3 flex-row items-center rounded-2xl px-4 py-3 ${
          isSelected
            ? isDark
              ? "bg-white"
              : "bg-[#1A1A1A]"
            : isDark
              ? "bg-[#1E1E1E]"
              : "bg-white"
        }`}
      >
        <Ionicons
          name={item.icon as any}
          size={18}
          color={
            isSelected
              ? isDark
                ? "#1A1A1A"
                : "#fff"
              : isDark
                ? "#9CA3AF"
                : "#6B7280"
          }
        />
        <Text
          className={`ml-2 font-medium ${
            isSelected
              ? isDark
                ? "text-[#1A1A1A]"
                : "text-white"
              : isDark
                ? "text-gray-400"
                : "text-gray-600"
          }`}
        >
          {item.name}
        </Text>
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
          className="flex-row items-center justify-between px-6 pt-2 pb-4"
        >
          <View>
            <Text
              className={`text-sm font-medium ${isDark ? "text-gray-400" : "text-gray-500"}`}
            >
              Good Morning 👋
            </Text>
            <Text
              className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}
            >
              Discover Tips
            </Text>
          </View>
          <View className="flex-row" style={{ gap: 12 }}>
            <Pressable
              className={`rounded-full p-3 ${isDark ? "bg-[#1E1E1E]" : "bg-white"}`}
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: isDark ? 0 : 0.04,
                shadowRadius: 8,
              }}
            >
              <Ionicons
                name="notifications-outline"
                size={22}
                color={isDark ? "#fff" : "#1A1A1A"}
              />
            </Pressable>
            <Image
              source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }}
              className="h-11 w-11 rounded-full"
            />
          </View>
        </Animated.View>

        {/* Search Bar */}
        <Animated.View
          entering={FadeInDown.delay(150).springify()}
          className="mx-6 mb-6"
        >
          <View
            className={`flex-row items-center rounded-2xl px-4 py-3.5 ${isDark ? "bg-[#1E1E1E]" : "bg-white"}`}
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: isDark ? 0 : 0.04,
              shadowRadius: 8,
            }}
          >
            <Ionicons
              name="search"
              size={20}
              color={isDark ? "#6B7280" : "#9CA3AF"}
            />
            <TextInput
              placeholder="Search tips..."
              placeholderTextColor={isDark ? "#6B7280" : "#9CA3AF"}
              value={searchQuery}
              onChangeText={setSearchQuery}
              className={`ml-3 flex-1 text-base ${isDark ? "text-white" : "text-gray-900"}`}
            />
            {searchQuery.length > 0 && (
              <Pressable onPress={() => setSearchQuery("")}>
                <Ionicons
                  name="close-circle"
                  size={20}
                  color={isDark ? "#6B7280" : "#9CA3AF"}
                />
              </Pressable>
            )}
          </View>
        </Animated.View>

        {/* Categories */}
        <Animated.View entering={FadeInDown.delay(200).springify()}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 8 }}
          >
            {CATEGORIES.map((item) => (
              <CategoryButton
                key={item.id}
                item={item}
                isSelected={selectedCategory === item.id}
              />
            ))}
          </ScrollView>
        </Animated.View>

        {/* Tips Section */}
        <Animated.View
          entering={FadeInDown.delay(250).springify()}
          className="mt-6"
        >
          <View className="flex-row items-center justify-between px-6 mb-4">
            <Text
              className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}
            >
              Trending Tips
            </Text>
            <Pressable>
              <Text className="text-sm font-medium text-blue-500">See All</Text>
            </Pressable>
          </View>

          <View className="px-6" style={{ gap: 16 }}>
            {TIPS.map((tip) => (
              <TipCard
                key={tip.id}
                tip={tip}
                onPress={() => router.push(`/tip/${tip.id}`)}
              />
            ))}
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}
