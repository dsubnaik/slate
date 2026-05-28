import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";

export default function BottomNav({ navigation, active }) {
  const { theme } = useTheme();
  const s = makeStyles(theme);

  return (
    <View style={s.container}>
      <TouchableOpacity
        style={s.item}
        activeOpacity={0.7}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={[s.emoji, active !== "home" && s.dim]}>🏠</Text>
        {active === "home" && <View style={s.dot} />}
      </TouchableOpacity>

      <TouchableOpacity
        style={s.item}
        activeOpacity={0.7}
        onPress={() => navigation.navigate("Leaderboard")}
      >
        <Text style={[s.emoji, active !== "leaderboard" && s.dim]}>🏆</Text>
        {active === "leaderboard" && <View style={s.dot} />}
      </TouchableOpacity>

      <TouchableOpacity
        style={s.item}
        activeOpacity={0.7}
        onPress={() => navigation.navigate("Profile")}
      >
        <View style={[s.avatar, active !== "profile" && s.avatarDim]}>
          <Text style={s.avatarText}>HB</Text>
        </View>
        {active === "profile" && <View style={s.dot} />}
      </TouchableOpacity>
    </View>
  );
}

function makeStyles(theme) {
  return StyleSheet.create({
    container: {
      flexDirection: "row",
      borderTopWidth: 1,
      borderTopColor: theme.border,
      paddingTop: 12,
      paddingBottom: 10,
      paddingHorizontal: 16,
      backgroundColor: theme.bg,
    },
    item: {
      flex: 1,
      alignItems: "center",
      gap: 5,
    },
    emoji: {
      fontSize: 24,
    },
    dim: {
      opacity: 0.3,
    },
    dot: {
      width: 4,
      height: 4,
      borderRadius: 2,
      backgroundColor: theme.text,
    },
    avatar: {
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: theme.accent,
      alignItems: "center",
      justifyContent: "center",
    },
    avatarDim: {
      backgroundColor: theme.avatarInactive,
    },
    avatarText: {
      fontSize: 11,
      fontWeight: "700",
      color: theme.accentText,
      letterSpacing: 0.5,
    },
  });
}
