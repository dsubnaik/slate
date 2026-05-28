import { useEffect, useRef } from "react";
import { Text, View, StyleSheet, Animated } from "react-native";

export default function SplashScreen({ navigation }) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.delay(1200),
      Animated.timing(opacity, { toValue: 0, duration: 400, useNativeDriver: true }),
    ]).start(() => navigation.replace("Landing"));
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.logo, { opacity }]}>slate</Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    fontSize: 80,
    fontWeight: "900",
    color: "#000",
    letterSpacing: -3,
  },
});
