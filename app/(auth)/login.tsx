import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
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

export default function LoginScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const loginScale = useSharedValue(1);
  const loginAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: loginScale.value }],
  }));

  const canLogin = email.length > 0 && password.length > 0;

  return (
    <SafeAreaView
      className={`flex-1 ${isDark ? "bg-[#121212]" : "bg-[#FAFAFA]"}`}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 justify-center px-6"
      >
        {/* Back Button */}
        <Pressable
          onPress={() => router.back()}
          className={`absolute top-4 left-6 rounded-full p-3 ${isDark ? "bg-[#1E1E1E]" : "bg-white"}`}
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
          className="mb-10"
        >
          <Text
            className={`text-3xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}
          >
            Welcome Back
          </Text>
          <Text
            className={`mt-2 text-base ${isDark ? "text-gray-400" : "text-gray-500"}`}
          >
            Sign in to continue
          </Text>
        </Animated.View>

        {/* Form */}
        <View style={{ gap: 16 }}>
          {/* Email Input */}
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
                name="lock-closed-outline"
                size={20}
                color={isDark ? "#6B7280" : "#9CA3AF"}
              />
              <TextInput
                placeholder="Password"
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

          {/* Forgot Password */}
          <Animated.View
            entering={FadeInDown.delay(250).springify()}
            className="items-end"
          >
            <Pressable>
              <Text className="text-sm font-medium text-blue-500">
                Forgot Password?
              </Text>
            </Pressable>
          </Animated.View>

          {/* Login Button */}
          <Animated.View entering={FadeInDown.delay(300).springify()}>
            <AnimatedPressable
              style={loginAnimatedStyle}
              onPressIn={() => {
                loginScale.value = withSpring(0.98);
              }}
              onPressOut={() => {
                loginScale.value = withSpring(1);
              }}
              onPress={() => router.replace("/(tabs)")}
              disabled={!canLogin}
              className={`mt-4 rounded-2xl py-4 ${
                canLogin
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
                  canLogin
                    ? isDark
                      ? "text-[#1A1A1A]"
                      : "text-white"
                    : isDark
                      ? "text-gray-600"
                      : "text-gray-400"
                }`}
              >
                Sign In
              </Text>
            </AnimatedPressable>
          </Animated.View>

          {/* Divider */}
          <Animated.View
            entering={FadeInDown.delay(350).springify()}
            className="flex-row items-center my-6"
          >
            <View
              className={`flex-1 h-[1px] ${isDark ? "bg-[#2A2A2A]" : "bg-gray-200"}`}
            />
            <Text
              className={`mx-4 text-sm ${isDark ? "text-gray-500" : "text-gray-400"}`}
            >
              or
            </Text>
            <View
              className={`flex-1 h-[1px] ${isDark ? "bg-[#2A2A2A]" : "bg-gray-200"}`}
            />
          </Animated.View>

          {/* Social Login */}
          <Animated.View
            entering={FadeInDown.delay(400).springify()}
            className="flex-row"
            style={{ gap: 12 }}
          >
            <Pressable
              className={`flex-1 flex-row items-center justify-center rounded-2xl py-4 ${isDark ? "bg-[#1E1E1E]" : "bg-white"}`}
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: isDark ? 0 : 0.04,
                shadowRadius: 8,
              }}
            >
              <Ionicons
                name="logo-google"
                size={20}
                color={isDark ? "#fff" : "#1A1A1A"}
              />
              <Text
                className={`ml-2 font-medium ${isDark ? "text-white" : "text-gray-900"}`}
              >
                Google
              </Text>
            </Pressable>
            <Pressable
              className={`flex-1 flex-row items-center justify-center rounded-2xl py-4 ${isDark ? "bg-[#1E1E1E]" : "bg-white"}`}
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: isDark ? 0 : 0.04,
                shadowRadius: 8,
              }}
            >
              <Ionicons
                name="logo-apple"
                size={20}
                color={isDark ? "#fff" : "#1A1A1A"}
              />
              <Text
                className={`ml-2 font-medium ${isDark ? "text-white" : "text-gray-900"}`}
              >
                Apple
              </Text>
            </Pressable>
          </Animated.View>

          {/* Sign Up Link */}
          <Animated.View
            entering={FadeInDown.delay(450).springify()}
            className="flex-row justify-center mt-8"
          >
            <Text
              className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}
            >
              Don't have an account?{" "}
            </Text>
            <Pressable onPress={() => router.push("/(auth)/signup")}>
              <Text className="text-sm font-semibold text-blue-500">
                Sign Up
              </Text>
            </Pressable>
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
