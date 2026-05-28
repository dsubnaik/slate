import { useEffect, useRef } from "react";
import { Text, View, StyleSheet, Animated } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "../context/ThemeContext";

export default function SplashScreen({ navigation }) {
  const { theme } = useTheme();
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.delay(1200),
      Animated.timing(opacity, { toValue: 0, duration: 400, useNativeDriver: true }),
    ]).start(() => navigation.replace("Landing"));
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <StatusBar style={theme.statusBar} />
      <Animated.Text style={[styles.logo, { opacity, color: theme.text }]}>
        slate
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    fontSize: 80,
    fontWeight: "900",
    letterSpacing: -3,
  },
});
