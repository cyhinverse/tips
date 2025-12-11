import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  Text,
  useColorScheme,
  View,
} from "react-native";
import Animated, {
  FadeInDown,
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const { width, height } = Dimensions.get("window");

const TIPS_DATA: Record<
  string,
  {
    title: string;
    category: string;
    author: string;
    authorAvatar: string;
    likes: number;
    image: string;
    content: string;
    tags: string[];
  }
> = {
  "1": {
    title: "Morning Routine Tips for a Productive Day",
    category: "Life",
    author: "Sarah Johnson",
    authorAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
    likes: 234,
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800",
    content: `Start your day with intention and watch your productivity soar. Here are my top morning routine tips that have transformed my life:

**1. Wake up at the same time every day**
Consistency is key. Your body loves routine, and waking up at the same time helps regulate your circadian rhythm.

**2. Avoid checking your phone immediately**
Give yourself at least 30 minutes before diving into emails and social media. This time is for you.

**3. Hydrate first thing**
Drink a full glass of water as soon as you wake up. Your body has been fasting for 7-8 hours and needs hydration.

**4. Move your body**
Even 10 minutes of stretching or light exercise can energize you for the entire day.

**5. Set your top 3 priorities**
Before starting work, identify the three most important tasks you need to accomplish.`,
    tags: ["productivity", "morning", "habits", "wellness"],
  },
  "2": {
    title: "How to Save Money on Groceries",
    category: "Money",
    author: "Mike Chen",
    authorAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    likes: 189,
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800",
    content: `Saving money on groceries doesn't mean sacrificing quality. Here's how I cut my grocery bill by 40%:

**1. Plan your meals weekly**
Before shopping, plan what you'll eat for the week. This prevents impulse buys and food waste.

**2. Make a list and stick to it**
Write down exactly what you need and resist the temptation to add extra items.

**3. Buy seasonal produce**
Seasonal fruits and vegetables are not only fresher but also significantly cheaper.

**4. Use store loyalty programs**
Most grocery stores offer rewards programs that can save you hundreds annually.

**5. Consider generic brands**
Many store brands are made by the same manufacturers as name brands but cost much less.`,
    tags: ["budgeting", "groceries", "savings", "frugal"],
  },
};

export default function TipDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const insets = useSafeAreaInsets();

  const tip = TIPS_DATA[id || "1"] || TIPS_DATA["1"];

  const likeScale = useSharedValue(1);
  const saveScale = useSharedValue(1);

  const likeAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: likeScale.value }],
  }));

  const saveAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: saveScale.value }],
  }));

  return (
    <View className={`flex-1 ${isDark ? "bg-[#121212]" : "bg-[#FAFAFA]"}`}>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Hero Image */}
        <View style={{ height: height * 0.4 }}>
          <Image
            source={{ uri: tip.image }}
            className="h-full w-full"
            resizeMode="cover"
          />
          {/* Gradient Overlay */}
          <View
            className="absolute inset-0"
            style={{
              backgroundColor: isDark ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.2)",
            }}
          />

          {/* Header Buttons */}
          <SafeAreaView className="absolute top-0 left-0 right-0">
            <View className="flex-row items-center justify-between px-6 pt-2">
              <Pressable
                onPress={() => router.back()}
                className="rounded-full p-3 bg-black/30"
                style={{ backdropFilter: "blur(10px)" }}
              >
                <Ionicons name="arrow-back" size={22} color="#fff" />
              </Pressable>
              <View className="flex-row" style={{ gap: 12 }}>
                <Pressable className="rounded-full p-3 bg-black/30">
                  <Ionicons name="share-outline" size={22} color="#fff" />
                </Pressable>
                <Pressable className="rounded-full p-3 bg-black/30">
                  <Ionicons name="ellipsis-horizontal" size={22} color="#fff" />
                </Pressable>
              </View>
            </View>
          </SafeAreaView>
        </View>

        {/* Content */}
        <Animated.View
          entering={FadeInUp.delay(100).springify()}
          className={`-mt-8 rounded-t-[32px] px-6 pt-8 pb-32 ${isDark ? "bg-[#121212]" : "bg-[#FAFAFA]"}`}
        >
          {/* Category Tag */}
          <View
            className={`self-start rounded-full px-4 py-2 mb-4 ${isDark ? "bg-[#1E1E1E]" : "bg-white"}`}
          >
            <Text
              className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-600"}`}
            >
              {tip.category}
            </Text>
          </View>

          {/* Title */}
          <Text
            className={`text-2xl font-bold leading-tight ${isDark ? "text-white" : "text-gray-900"}`}
          >
            {tip.title}
          </Text>

          {/* Author */}
          <View className="flex-row items-center mt-6 mb-8">
            <Image
              source={{ uri: tip.authorAvatar }}
              className="h-12 w-12 rounded-full"
            />
            <View className="ml-3 flex-1">
              <Text
                className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}
              >
                {tip.author}
              </Text>
              <Text
                className={`text-sm ${isDark ? "text-gray-500" : "text-gray-400"}`}
              >
                2 days ago
              </Text>
            </View>
            <Pressable
              className={`rounded-full px-5 py-2.5 ${isDark ? "bg-white" : "bg-[#1A1A1A]"}`}
            >
              <Text
                className={`font-semibold ${isDark ? "text-[#1A1A1A]" : "text-white"}`}
              >
                Follow
              </Text>
            </Pressable>
          </View>

          {/* Content */}
          <Text
            className={`text-base leading-7 ${isDark ? "text-gray-300" : "text-gray-600"}`}
          >
            {tip.content}
          </Text>

          {/* Tags */}
          <View className="flex-row flex-wrap mt-8" style={{ gap: 8 }}>
            {tip.tags.map((tag) => (
              <View
                key={tag}
                className={`rounded-full px-4 py-2 ${isDark ? "bg-[#1E1E1E]" : "bg-gray-100"}`}
              >
                <Text
                  className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}
                >
                  #{tag}
                </Text>
              </View>
            ))}
          </View>
        </Animated.View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <Animated.View
        entering={FadeInDown.delay(200).springify()}
        className={`absolute bottom-0 left-0 right-0 flex-row items-center justify-between px-6 py-4 ${isDark ? "bg-[#1E1E1E]" : "bg-white"}`}
        style={{
          paddingBottom: insets.bottom + 16,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: isDark ? 0.3 : 0.08,
          shadowRadius: 12,
        }}
      >
        <View className="flex-row items-center" style={{ gap: 20 }}>
          <AnimatedPressable
            style={likeAnimatedStyle}
            onPressIn={() => {
              likeScale.value = withSpring(0.9);
            }}
            onPressOut={() => {
              likeScale.value = withSpring(1);
            }}
            className="flex-row items-center"
          >
            <Ionicons
              name="heart-outline"
              size={26}
              color={isDark ? "#fff" : "#1A1A1A"}
            />
            <Text
              className={`ml-2 font-semibold ${isDark ? "text-white" : "text-gray-900"}`}
            >
              {tip.likes}
            </Text>
          </AnimatedPressable>

          <Pressable className="flex-row items-center">
            <Ionicons
              name="chatbubble-outline"
              size={24}
              color={isDark ? "#fff" : "#1A1A1A"}
            />
            <Text
              className={`ml-2 font-semibold ${isDark ? "text-white" : "text-gray-900"}`}
            >
              24
            </Text>
          </Pressable>
        </View>

        <AnimatedPressable
          style={saveAnimatedStyle}
          onPressIn={() => {
            saveScale.value = withSpring(0.9);
          }}
          onPressOut={() => {
            saveScale.value = withSpring(1);
          }}
          className={`rounded-2xl px-6 py-3 ${isDark ? "bg-white" : "bg-[#1A1A1A]"}`}
        >
          <View className="flex-row items-center">
            <Ionicons
              name="bookmark-outline"
              size={18}
              color={isDark ? "#1A1A1A" : "#fff"}
            />
            <Text
              className={`ml-2 font-semibold ${isDark ? "text-[#1A1A1A]" : "text-white"}`}
            >
              Save
            </Text>
          </View>
        </AnimatedPressable>
      </Animated.View>
    </View>
  );
}
