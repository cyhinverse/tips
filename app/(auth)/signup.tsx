import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
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
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function SignupScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const signupScale = useSharedValue(1);
  const signupAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: signupScale.value }],
  }));

  const canSignup = name.length > 0 && email.length > 0 && password.length >= 6;

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
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            paddingHorizontal: 24,
          }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Back Button */}
          <Pressable
            onPress={() => router.back()}
            className={`absolute top-4 left-0 rounded-full p-3 ${isDark ? "bg-[#1E1E1E]" : "bg-white"}`}
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: isDark ? 0 : 0.04,
              shadowRadius: 8,
            }}
          >
            <Ionicons
              name="arrow-back"
              size={22}
              color={isDark ? "#fff" : "#1A1A1A"}
            />
          </Pressable>

          {/* Header */}
          <Animated.View
            entering={FadeInDown.delay(100).springify()}
            className="mb-10 mt-16"
          >
            <Text
              className={`text-3xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}
            >
              Create Account
            </Text>
            <Text
              className={`mt-2 text-base ${isDark ? "text-gray-400" : "text-gray-500"}`}
            >
              Sign up to get started
            </Text>
          </Animated.View>

          {/* Form */}
          <View style={{ gap: 16 }}>
            {/* Name Input */}
            <Animated.View entering={FadeInDown.delay(150).springify()}>
              <View
                className={`flex-row items-center rounded-2xl px-5 py-4 ${isDark ? "bg-[#1E1E1E]" : "bg-white"}`}
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: isDark ? 0 : 0.04,
                  shadowRadius: 8,
                }}
              >
                <Ionicons
                  name="person-outline"
                  size={20}
                  color={isDark ? "#6B7280" : "#9CA3AF"}
                />
                <TextInput
                  placeholder="Full name"
                  placeholderTextColor={isDark ? "#6B7280" : "#9CA3AF"}
                  value={name}
                  onChangeText={setName}
                  className={`ml-3 flex-1 text-base ${isDark ? "text-white" : "text-gray-900"}`}
                />
              </View>
            </Animated.View>

            {/* Email Input */}
            <Animated.View entering={FadeInDown.delay(200).springify()}>
              <View
                className={`flex-row items-center rounded-2xl px-5 py-4 ${isDark ? "bg-[#1E1E1E]" : "bg-white"}`}
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: isDark ? 0 : 0.04,
                  shadowRadius: 8,
                }}
              >
                <Ionicons
                  name="mail-outline"
                  size={20}
                  color={isDark ? "#6B7280" : "#9CA3AF"}
                />
                <TextInput
                  placeholder="Email address"
                  placeholderTextColor={isDark ? "#6B7280" : "#9CA3AF"}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  className={`ml-3 flex-1 text-base ${isDark ? "text-white" : "text-gray-900"}`}
                />
              </View>
            </Animated.View>

            {/* Password Input */}
            <Animated.View entering={FadeInDown.delay(250).springify()}>
              <View
                className={`flex-row items-center rounded-2xl px-5 py-4 ${isDark ? "bg-[#1E1E1E]" : "bg-white"}`}
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: isDark ? 0 : 0.04,
                  shadowRadius: 8,
                }}
              >
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color={isDark ? "#6B7280" : "#9CA3AF"}
                />
                <TextInput
                  placeholder="Password (min 6 characters)"
                  placeholderTextColor={isDark ? "#6B7280" : "#9CA3AF"}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  className={`ml-3 flex-1 text-base ${isDark ? "text-white" : "text-gray-900"}`}
                />
                <Pressable onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={20}
                    color={isDark ? "#6B7280" : "#9CA3AF"}
                  />
                </Pressable>
              </View>
            </Animated.View>

            {/* Signup Button */}
            <Animated.View entering={FadeInDown.delay(300).springify()}>
              <AnimatedPressable
                style={signupAnimatedStyle}
                onPressIn={() => {
                  signupScale.value = withSpring(0.98);
                }}
                onPressOut={() => {
                  signupScale.value = withSpring(1);
                }}
                onPress={() => router.replace("/(tabs)")}
                disabled={!canSignup}
                className={`mt-4 rounded-2xl py-4 ${
                  canSignup
                    ? isDark
                      ? "bg-white"
                      : "bg-[#1A1A1A]"
                    : isDark
                      ? "bg-[#2A2A2A]"
                      : "bg-gray-200"
                }`}
              >
                <Text
                  className={`text-center font-semibold text-base ${
                    canSignup
                      ? isDark
                        ? "text-[#1A1A1A]"
                        : "text-white"
                      : isDark
                        ? "text-gray-600"
                        : "text-gray-400"
                  }`}
                >
                  Create Account
                </Text>
              </AnimatedPressable>
            </Animated.View>

            {/* Terms */}
            <Animated.View
              entering={FadeInDown.delay(350).springify()}
              className="mt-4"
            >
              <Text
                className={`text-center text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}
              >
                By signing up, you agree to our{" "}
                <Text className="text-blue-500">Terms of Service</Text> and{" "}
                <Text className="text-blue-500">Privacy Policy</Text>
              </Text>
            </Animated.View>

            {/* Sign In Link */}
            <Animated.View
              entering={FadeInDown.delay(400).springify()}
              className="flex-row justify-center mt-8"
            >
              <Text
                className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}
              >
                Already have an account?{" "}
              </Text>
              <Pressable onPress={() => router.push("/(auth)/login")}>
                <Text className="text-sm font-semibold text-blue-500">
                  Sign In
                </Text>
              </Pressable>
            </Animated.View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
