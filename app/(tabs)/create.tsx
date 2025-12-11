import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
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

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const CATEGORIES = [
  { id: "1", name: "Life", icon: "heart", color: "#ec4899" },
  { id: "2", name: "Work", icon: "briefcase", color: "#6366f1" },
  { id: "3", name: "Health", icon: "fitness", color: "#10b981" },
  { id: "4", name: "Money", icon: "wallet", color: "#f59e0b" },
  { id: "5", name: "Tech", icon: "phone-portrait", color: "#3b82f6" },
  { id: "6", name: "Food", icon: "restaurant", color: "#ef4444" },
];

export default function CreateScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const insets = useSafeAreaInsets();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const submitScale = useSharedValue(1);
  const submitAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: submitScale.value }],
  }));

  const canSubmit =
    title.length > 0 && content.length > 0 && selectedCategory !== null;

  return (
    <SafeAreaView
      className={`flex-1 ${isDark ? "bg-[#121212]" : "bg-[#FAFAFA]"}`}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <Animated.View
            entering={FadeInDown.delay(100).springify()}
            className="flex-row items-center justify-between px-6 pt-2 pb-6"
          >
            <View>
              <Text
                className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}
              >
                Create Tip
              </Text>
              <Text
                className={`text-sm mt-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}
              >
                Share your knowledge
              </Text>
            </View>
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
                name="image-outline"
                size={22}
                color={isDark ? "#fff" : "#1A1A1A"}
              />
            </Pressable>
          </Animated.View>

          {/* Form */}
          <View className="px-6" style={{ gap: 20 }}>
            {/* Title Input */}
            <Animated.View entering={FadeInDown.delay(150).springify()}>
              <Text
                className={`mb-2 text-sm font-medium ${isDark ? "text-gray-400" : "text-gray-500"}`}
              >
                Title
              </Text>
              <View
                className={`rounded-2xl px-5 py-4 ${isDark ? "bg-[#1E1E1E]" : "bg-white"}`}
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: isDark ? 0 : 0.04,
                  shadowRadius: 8,
                }}
              >
                <TextInput
                  placeholder="Give your tip a catchy title..."
                  placeholderTextColor={isDark ? "#6B7280" : "#9CA3AF"}
                  value={title}
                  onChangeText={setTitle}
                  className={`text-base ${isDark ? "text-white" : "text-gray-900"}`}
                />
              </View>
            </Animated.View>

            {/* Category Selection */}
            <Animated.View entering={FadeInDown.delay(200).springify()}>
              <Text
                className={`mb-3 text-sm font-medium ${isDark ? "text-gray-400" : "text-gray-500"}`}
              >
                Category
              </Text>
              <View className="flex-row flex-wrap" style={{ gap: 10 }}>
                {CATEGORIES.map((category) => {
                  const isSelected = selectedCategory === category.id;
                  return (
                    <Pressable
                      key={category.id}
                      onPress={() => setSelectedCategory(category.id)}
                      className={`flex-row items-center rounded-2xl px-4 py-3 ${
                        isSelected
                          ? isDark
                            ? "bg-white"
                            : "bg-[#1A1A1A]"
                          : isDark
                            ? "bg-[#1E1E1E]"
                            : "bg-white"
                      }`}
                      style={{
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: isDark ? 0 : 0.04,
                        shadowRadius: 8,
                      }}
                    >
                      <Ionicons
                        name={category.icon as any}
                        size={16}
                        color={
                          isSelected
                            ? isDark
                              ? "#1A1A1A"
                              : "#fff"
                            : category.color
                        }
                      />
                      <Text
                        className={`ml-2 font-medium ${
                          isSelected
                            ? isDark
                              ? "text-[#1A1A1A]"
                              : "text-white"
                            : isDark
                              ? "text-gray-300"
                              : "text-gray-700"
                        }`}
                      >
                        {category.name}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </Animated.View>

            {/* Content Input */}
            <Animated.View entering={FadeInDown.delay(250).springify()}>
              <Text
                className={`mb-2 text-sm font-medium ${isDark ? "text-gray-400" : "text-gray-500"}`}
              >
                Content
              </Text>
              <View
                className={`rounded-2xl px-5 py-4 ${isDark ? "bg-[#1E1E1E]" : "bg-white"}`}
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: isDark ? 0 : 0.04,
                  shadowRadius: 8,
                  minHeight: 200,
                }}
              >
                <TextInput
                  placeholder="Write your tip here..."
                  placeholderTextColor={isDark ? "#6B7280" : "#9CA3AF"}
                  value={content}
                  onChangeText={setContent}
                  multiline
                  textAlignVertical="top"
                  className={`text-base ${isDark ? "text-white" : "text-gray-900"}`}
                  style={{ minHeight: 180 }}
                />
              </View>
              <Text
                className={`mt-2 text-right text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}
              >
                {content.length}/500
              </Text>
            </Animated.View>

            {/* Submit Button */}
            <Animated.View entering={FadeInDown.delay(300).springify()}>
              <AnimatedPressable
                style={submitAnimatedStyle}
                onPressIn={() => {
                  submitScale.value = withSpring(0.98);
                }}
                onPressOut={() => {
                  submitScale.value = withSpring(1);
                }}
                disabled={!canSubmit}
                className={`mt-4 rounded-2xl py-4 ${
                  canSubmit
                    ? isDark
                      ? "bg-white"
                      : "bg-[#1A1A1A]"
                    : isDark
                      ? "bg-[#2A2A2A]"
                      : "bg-gray-200"
                }`}
              >
                <Text
                  className={`text-center font-semibold ${
                    canSubmit
                      ? isDark
                        ? "text-[#1A1A1A]"
                        : "text-white"
                      : isDark
                        ? "text-gray-600"
                        : "text-gray-400"
                  }`}
                >
                  Publish Tip
                </Text>
              </AnimatedPressable>
            </Animated.View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
