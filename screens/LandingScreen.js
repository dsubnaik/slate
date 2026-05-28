import { Text, View, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";

export default function LandingScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoSection}>
        <Text style={styles.logo}>slate</Text>
        <Text style={styles.tagline}>create. compete. rise.</Text>
      </View>
      <View style={styles.buttonSection}>
        <TouchableOpacity
          style={styles.signUpButton}
          activeOpacity={0.85}
          onPress={() => navigation.navigate("Onboarding")}
        >
          <Text style={styles.signUpText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.logInButton}
          activeOpacity={0.85}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.logInText}>Log In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    color: "#000",
    letterSpacing: -3,
  },
  tagline: {
    fontSize: 13,
    fontWeight: "400",
    color: "#000",
    letterSpacing: 4,
    marginTop: 14,
  },
  buttonSection: {
    gap: 12,
  },
  signUpButton: {
    backgroundColor: "#000",
    paddingVertical: 16,
    borderRadius: 6,
    alignItems: "center",
  },
  signUpText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    letterSpacing: 1,
  },
  logInButton: {
    backgroundColor: "#fff",
    paddingVertical: 16,
    borderRadius: 6,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#000",
  },
  logInText: {
    color: "#000",
    fontSize: 15,
    fontWeight: "600",
    letterSpacing: 1,
  },
});
