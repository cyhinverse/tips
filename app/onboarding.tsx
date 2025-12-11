import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Dimensions,
  Pressable,
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
import { SafeAreaView } from "react-native-safe-area-context";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const { width } = Dimensions.get("window");

export default function OnboardingScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const getStartedScale = useSharedValue(1);
  const loginScale = useSharedValue(1);

  const getStartedAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: getStartedScale.value }],
  }));

  const loginAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: loginScale.value }],
  }));

  return (
    <SafeAreaView
      className={`flex-1 ${isDark ? "bg-[#121212]" : "bg-[#FAFAFA]"}`}
    >
      <View className="flex-1 justify-between px-6 py-10">
        {/* Logo & Illustration */}
        <Animated.View
          entering={FadeInDown.delay(100).springify()}
          className="flex-1 items-center justify-center"
        >
          <View
            className={`mb-8 rounded-full p-8 ${isDark ? "bg-[#1E1E1E]" : "bg-white"}`}
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: isDark ? 0 : 0.08,
              shadowRadius: 24,
            }}
          >
            <Ionicons name="bulb" size={80} color="#f59e0b" />
          </View>

          <Text
            className={`text-4xl font-bold text-center ${isDark ? "text-white" : "text-gray-900"}`}
          >
            Tips
          </Text>
          <Text
            className={`mt-3 text-center text-base ${isDark ? "text-gray-400" : "text-gray-500"}`}
          >
            Discover and share life tips
          </Text>
        </Animated.View>

        {/* Features */}
        <Animated.View
          entering={FadeInDown.delay(200).springify()}
          className="mb-10"
        >
          <View className="flex-row items-center mb-4">
            <View
              className={`rounded-2xl p-3 ${isDark ? "bg-emerald-900/20" : "bg-emerald-50"}`}
            >
              <Ionicons name="sparkles" size={24} color="#10b981" />
            </View>
            <View className="ml-4 flex-1">
              <Text
                className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}
              >
                Discover New Tips
              </Text>
              <Text
                className={`text-sm ${isDark ? "text-gray-500" : "text-gray-400"}`}
              >
                Browse thousands of useful tips
              </Text>
            </View>
          </View>

          <View className="flex-row items-center mb-4">
            <View
              className={`rounded-2xl p-3 ${isDark ? "bg-blue-900/20" : "bg-blue-50"}`}
            >
              <Ionicons name="bookmark" size={24} color="#3b82f6" />
            </View>
            <View className="ml-4 flex-1">
              <Text
                className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}
              >
                Save Your Favorites
              </Text>
              <Text
                className={`text-sm ${isDark ? "text-gray-500" : "text-gray-400"}`}
              >
                Create collections of tips
              </Text>
            </View>
          </View>

          <View className="flex-row items-center">
            <View
              className={`rounded-2xl p-3 ${isDark ? "bg-purple-900/20" : "bg-purple-50"}`}
            >
              <Ionicons name="create" size={24} color="#8b5cf6" />
            </View>
            <View className="ml-4 flex-1">
              <Text
                className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}
              >
                Share Your Knowledge
              </Text>
              <Text
                className={`text-sm ${isDark ? "text-gray-500" : "text-gray-400"}`}
              >
                Help others with your tips
              </Text>
            </View>
          </View>
        </Animated.View>

        {/* Buttons */}
        <Animated.View
          entering={FadeInDown.delay(300).springify()}
          style={{ gap: 12 }}
        >
          <AnimatedPressable
            style={getStartedAnimatedStyle}
            onPressIn={() => {
              getStartedScale.value = withSpring(0.98);
            }}
            onPressOut={() => {
              getStartedScale.value = withSpring(1);
            }}
            onPress={() => router.push("/(auth)/signup")}
            className={`rounded-2xl py-4 ${isDark ? "bg-white" : "bg-[#1A1A1A]"}`}
          >
            <Text
              className={`text-center font-semibold text-base ${isDark ? "text-[#1A1A1A]" : "text-white"}`}
            >
              Get Started
            </Text>
          </AnimatedPressable>

          <AnimatedPressable
            style={loginAnimatedStyle}
            onPressIn={() => {
              loginScale.value = withSpring(0.98);
            }}
            onPressOut={() => {
              loginScale.value = withSpring(1);
            }}
            onPress={() => router.push("/(auth)/login")}
            className={`rounded-2xl py-4 border-2 ${isDark ? "border-[#333] bg-transparent" : "border-gray-200 bg-transparent"}`}
          >
            <Text
              className={`text-center font-semibold text-base ${isDark ? "text-white" : "text-[#1A1A1A]"}`}
            >
              I Already Have an Account
            </Text>
          </AnimatedPressable>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}
