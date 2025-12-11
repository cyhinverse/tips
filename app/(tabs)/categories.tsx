import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
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

const CATEGORIES = [
  {
    id: "1",
    name: "Life",
    icon: "heart",
    color: "#ec4899",
    bgLight: "bg-pink-50",
    bgDark: "bg-pink-900/20",
    count: 156,
  },
  {
    id: "2",
    name: "Work",
    icon: "briefcase",
    color: "#6366f1",
    bgLight: "bg-indigo-50",
    bgDark: "bg-indigo-900/20",
    count: 89,
  },
  {
    id: "3",
    name: "Health",
    icon: "fitness",
    color: "#10b981",
    bgLight: "bg-emerald-50",
    bgDark: "bg-emerald-900/20",
    count: 234,
  },
  {
    id: "4",
    name: "Money",
    icon: "wallet",
    color: "#f59e0b",
    bgLight: "bg-amber-50",
    bgDark: "bg-amber-900/20",
    count: 67,
  },
  {
    id: "5",
    name: "Tech",
    icon: "phone-portrait",
    color: "#3b82f6",
    bgLight: "bg-blue-50",
    bgDark: "bg-blue-900/20",
    count: 112,
  },
  {
    id: "6",
    name: "Food",
    icon: "restaurant",
    color: "#ef4444",
    bgLight: "bg-red-50",
    bgDark: "bg-red-900/20",
    count: 78,
  },
  {
    id: "7",
    name: "Travel",
    icon: "airplane",
    color: "#8b5cf6",
    bgLight: "bg-violet-50",
    bgDark: "bg-violet-900/20",
    count: 45,
  },
  {
    id: "8",
    name: "Education",
    icon: "school",
    color: "#06b6d4",
    bgLight: "bg-cyan-50",
    bgDark: "bg-cyan-900/20",
    count: 123,
  },
  {
    id: "9",
    name: "Fitness",
    icon: "barbell",
    color: "#84cc16",
    bgLight: "bg-lime-50",
    bgDark: "bg-lime-900/20",
    count: 91,
  },
  {
    id: "10",
    name: "Home",
    icon: "home",
    color: "#f97316",
    bgLight: "bg-orange-50",
    bgDark: "bg-orange-900/20",
    count: 56,
  },
  {
    id: "11",
    name: "Fashion",
    icon: "shirt",
    color: "#a855f7",
    bgLight: "bg-purple-50",
    bgDark: "bg-purple-900/20",
    count: 34,
  },
  {
    id: "12",
    name: "Social",
    icon: "people",
    color: "#14b8a6",
    bgLight: "bg-teal-50",
    bgDark: "bg-teal-900/20",
    count: 87,
  },
];

export default function CategoriesScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const insets = useSafeAreaInsets();

  const CategoryCard = ({
    item,
    index,
  }: {
    item: (typeof CATEGORIES)[0];
    index: number;
  }) => {
    const scale = useSharedValue(1);
    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
    }));

    return (
      <AnimatedPressable
        entering={FadeInDown.delay(index * 50).springify()}
        style={[animatedStyle, { width: "48%" }]}
        onPressIn={() => {
          scale.value = withSpring(0.96);
        }}
        onPressOut={() => {
          scale.value = withSpring(1);
        }}
        className={`mb-4 rounded-3xl p-5 ${isDark ? "bg-[#1E1E1E]" : "bg-white"}`}
        // style={{
        //   shadowColor: "#000",
        //   shadowOffset: { width: 0, height: 4 },
        //   shadowOpacity: isDark ? 0 : 0.06,
        //   shadowRadius: 12,
        // }}
      >
        <View
          className={`mb-4 self-start rounded-2xl p-3 ${isDark ? item.bgDark : item.bgLight}`}
        >
          <Ionicons name={item.icon as any} size={24} color={item.color} />
        </View>
        <Text
          className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}
        >
          {item.name}
        </Text>
        <Text
          className={`text-sm ${isDark ? "text-gray-500" : "text-gray-400"}`}
        >
          {item.count} tips
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
          className="px-6 pt-2 pb-6"
        >
          <Text
            className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}
          >
            Categories
          </Text>
          <Text
            className={`text-sm mt-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}
          >
            Browse tips by category
          </Text>
        </Animated.View>

        {/* Categories Grid */}
        <View className="flex-row flex-wrap justify-between px-6">
          {CATEGORIES.map((item, index) => (
            <CategoryCard key={item.id} item={item} index={index} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
