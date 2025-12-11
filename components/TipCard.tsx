import { Ionicons } from "@expo/vector-icons";
import { useMemo } from "react";
import {
  Image,
  Pressable,
  Text,
  View,
  ViewStyle,
  useColorScheme,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export type Tip = {
  id: string;
  title: string;
  image: string;
  category: string;
  likes: number;
  author: {
    name: string;
    avatar: string;
  };
  aspectRatio?: number;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function TipCard({
  tip,
  onPress,
  style,
}: {
  tip: Tip;
  onPress: () => void;
  style?: ViewStyle;
}) {
  const ratio = useMemo(
    () => tip.aspectRatio || 0.8 + Math.random() * 0.5,
    [tip.aspectRatio]
  );
  const scale = useSharedValue(1);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.98, { damping: 20, stiffness: 400 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 20, stiffness: 400 });
  };

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[animatedStyle, style]}
      className="mb-4"
    >
      <View
        className={`overflow-hidden rounded-3xl ${
          isDark ? "bg-[#1E1E1E]" : "bg-white"
        }`}
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: isDark ? 0.3 : 0.06,
          shadowRadius: 12,
          elevation: 4,
        }}
      >
        {/* Image Container */}
        <View className="relative overflow-hidden">
          <Image
            source={{ uri: tip.image }}
            style={{ aspectRatio: ratio, width: "100%" }}
            className={`${isDark ? "bg-[#2A2A2A]" : "bg-gray-100"}`}
            resizeMode="cover"
          />
          {/* Category Tag - Scandinavian Style */}
          <View
            className={`absolute right-3 top-3 rounded-full px-3 py-1.5 ${
              isDark ? "bg-black/50" : "bg-white/90"
            }`}
            style={{
              backdropFilter: "blur(10px)",
            }}
          >
            <Text
              className={`text-xs font-semibold tracking-wide ${
                isDark ? "text-white" : "text-gray-800"
              }`}
            >
              {tip.category}
            </Text>
          </View>
        </View>

        {/* Content */}
        <View className="p-4">
          <Text
            className={`text-[15px] font-semibold leading-6 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
            numberOfLines={2}
          >
            {tip.title}
          </Text>

          <View className="mt-3 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Image
                source={{ uri: tip.author.avatar }}
                className="h-6 w-6 rounded-full"
              />
              <Text
                className={`ml-2 text-xs font-medium ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
                numberOfLines={1}
              >
                {tip.author.name}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons
                name="heart-outline"
                size={14}
                color={isDark ? "#9CA3AF" : "#6B7280"}
              />
              <Text
                className={`ml-1 text-xs font-medium ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {tip.likes}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </AnimatedPressable>
  );
}
