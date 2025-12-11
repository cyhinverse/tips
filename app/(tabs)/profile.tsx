import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import { useState } from "react";
import {
  Image,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const router = useRouter();
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const [notifications, setNotifications] = useState(true);
  const toggleNotifications = () => setNotifications((prev) => !prev);

  return (
    <SafeAreaView className="flex-1 bg-[#F9FAFB] dark:bg-black">
      <ScrollView className="flex-1">
        {/* Scandinavian Profile Header */}
        <View className="items-center py-10">
          <View className="shadow-sm shadow-gray-200 dark:shadow-none">
            <Image
              source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }}
              className="h-28 w-28 rounded-full bg-gray-100"
            />
          </View>
          <Text className="mt-4 text-2xl font-semibold text-gray-900 dark:text-white">
            John Doe
          </Text>
          <Text className="text-sm font-medium text-gray-500 dark:text-gray-400">
            @johndoe
          </Text>

          <View className="mt-6 flex-row space-x-4">
            <TouchableOpacity className="rounded-full bg-gray-900 px-6 py-2.5 shadow-sm shadow-gray-200 dark:bg-white dark:shadow-none">
              <Text className="font-medium text-white dark:text-black">
                Edit Profile
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="rounded-full bg-white px-3 py-2.5 shadow-sm border border-gray-100 dark:bg-[#1C1C1E] dark:border-gray-800">
              <Ionicons
                name="share-outline"
                size={20}
                color={colorScheme === "dark" ? "#fff" : "#000"}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Soft Stats Grid */}
        <View className="mx-6 mb-8 flex-row justify-between rounded-3xl bg-white p-6 shadow-sm shadow-gray-100 dark:bg-[#1C1C1E] dark:shadow-none">
          <View className="items-center flex-1">
            <Text className="text-lg font-bold text-gray-900 dark:text-white">
              128
            </Text>
            <Text className="text-xs font-medium text-gray-400 uppercase tracking-wide">
              Tips
            </Text>
          </View>
          <View className="h-full w-[1px] bg-gray-100 dark:bg-gray-800" />
          <View className="items-center flex-1">
            <Text className="text-lg font-bold text-gray-900 dark:text-white">
              4.2k
            </Text>
            <Text className="text-xs font-medium text-gray-400 uppercase tracking-wide">
              Likes
            </Text>
          </View>
          <View className="h-full w-[1px] bg-gray-100 dark:bg-gray-800" />
          <View className="items-center flex-1">
            <Text className="text-lg font-bold text-gray-900 dark:text-white">
              15
            </Text>
            <Text className="text-xs font-medium text-gray-400 uppercase tracking-wide">
              Saved
            </Text>
          </View>
        </View>

        {/* Minimal Settings List */}
        <View className="px-6 space-y-4">
          <Text className="ml-1 text-sm font-semibold text-gray-400 uppercase tracking-wider">
            Preferences
          </Text>

          <View className="overflow-hidden rounded-3xl bg-white dark:bg-[#1C1C1E] shadow-sm shadow-gray-100 dark:shadow-none">
            <View className="flex-row items-center justify-between px-5 py-4 border-b border-gray-50 dark:border-gray-800">
              <View className="flex-row items-center space-x-3">
                <View className="rounded-full bg-indigo-50 p-2 dark:bg-indigo-900/20">
                  <Ionicons name="moon-outline" size={20} color="#6366f1" />
                </View>
                <Text className="text-base font-medium text-gray-900 dark:text-white">
                  Dark Mode
                </Text>
              </View>
              <Switch
                value={colorScheme === "dark"}
                onValueChange={toggleColorScheme}
                trackColor={{ false: "#E5E7EB", true: "#6366f1" }}
              />
            </View>

            <View className="flex-row items-center justify-between px-5 py-4">
              <View className="flex-row items-center space-x-3">
                <View className="rounded-full bg-emerald-50 p-2 dark:bg-emerald-900/20">
                  <Ionicons
                    name="notifications-outline"
                    size={20}
                    color="#10b981"
                  />
                </View>
                <Text className="text-base font-medium text-gray-900 dark:text-white">
                  Notifications
                </Text>
              </View>
              <Switch
                value={notifications}
                onValueChange={toggleNotifications}
                trackColor={{ false: "#E5E7EB", true: "#10b981" }}
              />
            </View>
          </View>

          <TouchableOpacity
            className="mt-6 mb-10 rounded-3xl bg-red-50 py-4 dark:bg-red-900/10"
            onPress={() => router.replace("/onboarding")}
            activeOpacity={0.7}
          >
            <Text className="text-center font-semibold text-red-500">
              Log Out
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
