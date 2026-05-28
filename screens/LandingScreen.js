import { Text, View, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "../context/ThemeContext";

export default function LandingScreen({ navigation }) {
  const { theme } = useTheme();
  const s = makeStyles(theme);

  return (
    <SafeAreaView style={s.container}>
      <StatusBar style={theme.statusBar} />
      <View style={s.logoSection}>
        <Text style={s.logo}>slate</Text>
        <Text style={s.tagline}>create. compete. rise.</Text>
      </View>
      <View style={s.buttonSection}>
        <TouchableOpacity
          style={s.signUpButton}
          activeOpacity={0.85}
          onPress={() => navigation.navigate("Onboarding")}
        >
          <Text style={s.signUpText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={s.logInButton}
          activeOpacity={0.85}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={s.logInText}>Log In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function makeStyles(theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.bg,
      paddingHorizontal: 32,
      paddingBottom: 48,
    },
    logoSection: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingBottom: 80,
    },
    logo: {
      fontSize: 80,
      fontWeight: "900",
      color: theme.text,
      letterSpacing: -3,
    },
    tagline: {
      fontSize: 13,
      fontWeight: "400",
      color: theme.text,
      letterSpacing: 4,
      marginTop: 14,
    },
    buttonSection: {
      gap: 12,
    },
    signUpButton: {
      backgroundColor: theme.accent,
      paddingVertical: 16,
      borderRadius: 6,
      alignItems: "center",
    },
    signUpText: {
      color: theme.accentText,
      fontSize: 15,
      fontWeight: "600",
      letterSpacing: 1,
    },
    logInButton: {
      backgroundColor: theme.bg,
      paddingVertical: 16,
      borderRadius: 6,
      alignItems: "center",
      borderWidth: 1.5,
      borderColor: theme.borderStrong,
    },
    logInText: {
      color: theme.text,
      fontSize: 15,
      fontWeight: "600",
      letterSpacing: 1,
    },
  });
}
