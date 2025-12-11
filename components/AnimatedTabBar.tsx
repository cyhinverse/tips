import { Ionicons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Pressable, View, useColorScheme } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type IconName = keyof typeof Ionicons.glyphMap;

const TAB_CONFIG: { name: string; icon: IconName; iconActive: IconName }[] = [
  { name: "index", icon: "home-outline", iconActive: "home" },
  { name: "categories", icon: "grid-outline", iconActive: "grid" },
  { name: "create", icon: "add", iconActive: "add" },
  { name: "saved", icon: "bookmark-outline", iconActive: "bookmark" },
  { name: "profile", icon: "person-outline", iconActive: "person" },
];

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function TabButton({
  isFocused,
  onPress,
  icon,
  iconActive,
  isCreate,
  isDark,
}: {
  isFocused: boolean;
  onPress: () => void;
  icon: IconName;
  iconActive: IconName;
  isCreate?: boolean;
  isDark: boolean;
}) {
  const scale = useSharedValue(1);
  const iconScale = useSharedValue(isFocused ? 1 : 0.9);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: withSpring(isFocused ? 1.1 : 1, { damping: 15, stiffness: 300 }),
      },
    ],
    opacity: withTiming(isFocused ? 1 : 0.5, { duration: 200 }),
  }));

  const dotStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: withSpring(isFocused ? 1 : 0, { damping: 15, stiffness: 400 }) },
    ],
    opacity: withTiming(isFocused ? 1 : 0, { duration: 150 }),
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.9, { damping: 15, stiffness: 400 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 400 });
  };

  const activeColor = isDark ? "#FFFFFF" : "#1A1A1A";
  const inactiveColor = isDark ? "#6B7280" : "#9CA3AF";

  if (isCreate) {
    return (
      <AnimatedPressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={animatedStyle}
        className="relative items-center justify-center"
      >
        <Animated.View
          style={iconAnimatedStyle}
          className={`h-12 w-12 items-center justify-center rounded-2xl ${
            isDark ? "bg-white" : "bg-[#1A1A1A]"
          }`}
        >
          <Ionicons
            name="add"
            size={24}
            color={isDark ? "#1A1A1A" : "#FFFFFF"}
          />
        </Animated.View>
      </AnimatedPressable>
    );
  }

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={animatedStyle}
      className="relative h-12 w-12 items-center justify-center"
    >
      <Animated.View style={iconAnimatedStyle}>
        <Ionicons
          name={isFocused ? iconActive : icon}
          size={24}
          color={isFocused ? activeColor : inactiveColor}
        />
      </Animated.View>
      {/* Active indicator dot */}
      <Animated.View
        style={dotStyle}
        className={`absolute -bottom-1 h-1 w-1 rounded-full ${
          isDark ? "bg-white" : "bg-[#1A1A1A]"
        }`}
      />
    </AnimatedPressable>
  );
}

export default function AnimatedTabBar({
  state,
  navigation,
}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View
      className="absolute bottom-0 left-0 right-0"
      style={{ paddingBottom: insets.bottom > 0 ? insets.bottom : 8 }}
    >
      <View
        className={`mx-4 overflow-hidden rounded-3xl ${
          isDark ? "bg-[#1E1E1E]/95" : "bg-white/95"
        }`}
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: isDark ? 0.3 : 0.08,
          shadowRadius: 20,
          elevation: 20,
        }}
      >
        <View className="flex-row items-center justify-around py-3">
          {TAB_CONFIG.map((tab, index) => {
            const isFocused = state.index === index;
            const isCreate = tab.name === "create";

            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: state.routes[index].key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(state.routes[index].name);
              }
            };

            return (
              <TabButton
                key={tab.name}
                isFocused={isFocused}
                onPress={onPress}
                icon={tab.icon}
                iconActive={tab.iconActive}
                isCreate={isCreate}
                isDark={isDark}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
}
