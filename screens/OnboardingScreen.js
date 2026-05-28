import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";

const ADJECTIVES = [
  "Anonymous", "Mystery", "Hidden", "Silent", "Shadow",
  "Phantom", "Cryptic", "Unknown", "Masked", "Cloudy",
  "Distant", "Wandering", "Quiet", "Fleeting", "Cosmic",
];

const ANIMALS = [
  "Penguin", "Fox", "Raccoon", "Owl", "Bear",
  "Wolf", "Narwhal", "Capybara", "Lynx", "Platypus",
  "Salamander", "Crane", "Viper", "Mantis", "Pangolin",
];

function randomUsername(exclude = "") {
  let name;
  do {
    const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
    const animal = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];
    name = `${adj} ${animal}`;
  } while (name === exclude);
  return name;
}

const STEPS = [
  {
    num: "01",
    emoji: "🌅",
    title: "A challenge drops every day at 6AM",
    body: "Each morning a fresh creative prompt is revealed. Everyone gets the same challenge.",
  },
  {
    num: "02",
    emoji: "🎭",
    title: "Submit your entry anonymously before 6PM",
    body: "Draw, photograph, or write — your name stays hidden. Pure creativity, no bias.",
  },
  {
    num: "03",
    emoji: "🔥",
    title: "Vote on others and see who wins at 11PM",
    body: "You get 10 votes to spread across submissions. The winner is revealed at 11PM.",
  },
];

export default function OnboardingScreen({ navigation }) {
  const [username, setUsername] = useState(() => randomUsername());

  function handleRefresh() {
    setUsername((prev) => randomUsername(prev));
  }

  function handleLetsGo() {
    navigation.reset({ index: 0, routes: [{ name: "Home" }] });
  }

  return (
    <SafeAreaView style={s.container}>
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={s.scroll}
      >
        {/* Welcome */}
        <View style={s.welcomeSection}>
          <Text style={s.welcomeEyebrow}>welcome to</Text>
          <Text style={s.welcomeTitle}>slate.</Text>
          <Text style={s.welcomeSub}>a daily anonymous creative competition</Text>
        </View>

        {/* Steps */}
        <View style={s.steps}>
          {STEPS.map((step, i) => (
            <View key={step.num} style={[s.stepCard, i > 0 && s.stepCardGap]}>
              <View style={s.stepHeader}>
                <Text style={s.stepNum}>step {step.num}</Text>
                <Text style={s.stepEmoji}>{step.emoji}</Text>
              </View>
              <Text style={s.stepTitle}>{step.title}</Text>
              <Text style={s.stepBody}>{step.body}</Text>
            </View>
          ))}
        </View>

        {/* Username */}
        <View style={s.usernameSection}>
          <Text style={s.usernameEyebrow}>your anonymous identity</Text>
          <View style={s.usernameCard}>
            <Text style={s.usernameText}>{username}</Text>
            <TouchableOpacity
              style={s.refreshBtn}
              activeOpacity={0.6}
              onPress={handleRefresh}
            >
              <Text style={s.refreshIcon}>↻</Text>
            </TouchableOpacity>
          </View>
          <Text style={s.usernameHint}>
            This is how others will see you. Tap ↻ to get a different one.
          </Text>
        </View>
      </ScrollView>

      {/* CTA */}
      <View style={s.footer}>
        <TouchableOpacity
          style={s.letsGoButton}
          activeOpacity={0.85}
          onPress={handleLetsGo}
        >
          <Text style={s.letsGoText}>Let's Go</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scroll: {
    paddingHorizontal: 32,
    paddingTop: 32,
    paddingBottom: 16,
  },

  // Welcome
  welcomeSection: {
    marginBottom: 40,
  },
  welcomeEyebrow: {
    fontSize: 14,
    fontWeight: "400",
    color: "#888",
    letterSpacing: 2,
    marginBottom: 4,
  },
  welcomeTitle: {
    fontSize: 64,
    fontWeight: "900",
    color: "#000",
    letterSpacing: -3,
    lineHeight: 68,
    marginBottom: 12,
  },
  welcomeSub: {
    fontSize: 13,
    fontWeight: "400",
    color: "#888",
    letterSpacing: 1.5,
  },

  // Steps
  steps: {
    marginBottom: 40,
  },
  stepCard: {
    borderWidth: 1,
    borderColor: "#e8e8e8",
    borderRadius: 6,
    padding: 20,
  },
  stepCardGap: {
    marginTop: 12,
  },
  stepHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  stepNum: {
    fontSize: 10,
    fontWeight: "600",
    color: "#bbb",
    letterSpacing: 3,
    textTransform: "uppercase",
  },
  stepEmoji: {
    fontSize: 22,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
    letterSpacing: -0.3,
    lineHeight: 22,
    marginBottom: 8,
  },
  stepBody: {
    fontSize: 13,
    fontWeight: "400",
    color: "#888",
    lineHeight: 20,
    letterSpacing: 0.2,
  },

  // Username
  usernameSection: {
    marginBottom: 8,
  },
  usernameEyebrow: {
    fontSize: 11,
    fontWeight: "500",
    color: "#000",
    letterSpacing: 3,
    textTransform: "uppercase",
    marginBottom: 10,
  },
  usernameCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1.5,
    borderColor: "#000",
    borderRadius: 6,
    paddingHorizontal: 18,
    paddingVertical: 16,
    marginBottom: 10,
  },
  usernameText: {
    fontSize: 20,
    fontWeight: "800",
    color: "#000",
    letterSpacing: -0.5,
  },
  refreshBtn: {
    padding: 4,
  },
  refreshIcon: {
    fontSize: 24,
    color: "#000",
    lineHeight: 26,
  },
  usernameHint: {
    fontSize: 12,
    fontWeight: "400",
    color: "#aaa",
    letterSpacing: 0.3,
    lineHeight: 18,
  },

  // Footer
  footer: {
    paddingHorizontal: 32,
    paddingBottom: 32,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    backgroundColor: "#fff",
  },
  letsGoButton: {
    backgroundColor: "#000",
    paddingVertical: 16,
    borderRadius: 6,
    alignItems: "center",
  },
  letsGoText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    letterSpacing: 1,
  },
});
