import { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "../context/ThemeContext";
import BottomNav from "../components/BottomNav";

const WINNER = { name: "Hidden Bear", votes: 42 };

const LEADERBOARD = [
  { rank: 1, name: "Hidden Bear", votes: 42 },
  { rank: 2, name: "Silent Raccoon", votes: 31 },
  { rank: 3, name: "Cryptic Narwhal", votes: 29 },
  { rank: 4, name: "Anonymous Penguin", votes: 24 },
  { rank: 5, name: "Mystery Fox", votes: 17 },
];

function formatCountdown(ms) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const sec = total % 60;
  return [h, m, sec].map((n) => String(n).padStart(2, "0")).join(":");
}

function msUntilHour(targetHour) {
  const now = new Date();
  const target = new Date(now);
  target.setHours(targetHour, 0, 0, 0);
  if (target <= now) target.setDate(target.getDate() + 1);
  return target - now;
}

export default function ResultsScreen({ navigation }) {
  const { theme } = useTheme();
  const s = makeStyles(theme);
  const [ms, setMs] = useState(() => msUntilHour(6));

  useEffect(() => {
    const id = setInterval(() => setMs(msUntilHour(6)), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <SafeAreaView style={s.container}>
      <StatusBar style={theme.statusBar} />

      <View style={s.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Text style={s.backButton}>← back</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={s.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={s.scrollContent}
      >
        <Text style={s.eyebrow}>today's challenge — Urban Isolation</Text>
        <Text style={s.pageTitle}>winner.</Text>

        <View style={s.winnerCard}>
          <View style={s.winnerImage} />
          <View style={s.winnerMeta}>
            <Text style={s.winnerName}>👑  {WINNER.name}</Text>
            <Text style={s.winnerVotes}>{WINNER.votes} votes</Text>
          </View>
        </View>

        <View style={s.countdownBlock}>
          <Text style={s.countdownLabel}>next challenge drops at 6am</Text>
          <Text style={s.countdownTimer}>{formatCountdown(ms)}</Text>
        </View>

        <Text style={s.sectionEyebrow}>leaderboard</Text>
        <View style={s.leaderboard}>
          {LEADERBOARD.map((item) => (
            <View key={item.rank} style={s.rankRow}>
              <Text style={s.rankNum}>{item.rank}</Text>
              <View style={s.rankThumb} />
              <Text style={s.rankName}>{item.name}</Text>
              <Text style={s.rankVotes}>{item.votes}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={s.viewAllButton} activeOpacity={0.7}>
          <Text style={s.viewAllText}>View All Submissions</Text>
        </TouchableOpacity>
      </ScrollView>
      <BottomNav navigation={navigation} active="home" />
    </SafeAreaView>
  );
}

function makeStyles(theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.bg,
    },
    topBar: {
      paddingHorizontal: 32,
      paddingTop: 16,
      paddingBottom: 8,
    },
    backButton: {
      fontSize: 14,
      fontWeight: "500",
      color: theme.text,
      letterSpacing: 0.5,
    },
    scroll: {
      flex: 1,
    },
    scrollContent: {
      paddingHorizontal: 32,
      paddingTop: 12,
      paddingBottom: 32,
    },

    eyebrow: {
      fontSize: 11,
      fontWeight: "500",
      color: theme.textMuted,
      letterSpacing: 2.5,
      textTransform: "uppercase",
      marginBottom: 10,
    },
    pageTitle: {
      fontSize: 64,
      fontWeight: "900",
      color: theme.text,
      letterSpacing: -3,
      lineHeight: 68,
      marginBottom: 28,
    },

    winnerCard: {
      borderWidth: 1.5,
      borderColor: theme.borderStrong,
      borderRadius: 6,
      overflow: "hidden",
      marginBottom: 40,
    },
    winnerImage: {
      height: 300,
      backgroundColor: theme.surface,
    },
    winnerMeta: {
      paddingHorizontal: 16,
      paddingVertical: 16,
      backgroundColor: theme.bg,
    },
    winnerName: {
      fontSize: 20,
      fontWeight: "700",
      color: theme.text,
      letterSpacing: -0.3,
      marginBottom: 4,
    },
    winnerVotes: {
      fontSize: 12,
      fontWeight: "400",
      color: theme.textMuted,
      letterSpacing: 1.5,
      textTransform: "uppercase",
    },

    countdownBlock: {
      marginBottom: 48,
      paddingTop: 8,
      borderTopWidth: 1,
      borderTopColor: theme.divider,
    },
    countdownLabel: {
      fontSize: 11,
      fontWeight: "400",
      color: theme.textMuted,
      letterSpacing: 2,
      textTransform: "uppercase",
      marginBottom: 8,
      marginTop: 16,
    },
    countdownTimer: {
      fontSize: 48,
      fontWeight: "900",
      color: theme.text,
      letterSpacing: -2,
    },

    sectionEyebrow: {
      fontSize: 11,
      fontWeight: "500",
      color: theme.text,
      letterSpacing: 3,
      textTransform: "uppercase",
      marginBottom: 16,
    },
    leaderboard: {
      marginBottom: 40,
    },
    rankRow: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.divider,
      gap: 12,
    },
    rankNum: {
      fontSize: 13,
      fontWeight: "900",
      color: theme.text,
      width: 20,
    },
    rankThumb: {
      width: 44,
      height: 44,
      borderRadius: 4,
      backgroundColor: theme.surface,
    },
    rankName: {
      flex: 1,
      fontSize: 14,
      fontWeight: "500",
      color: theme.text,
      letterSpacing: 0.2,
    },
    rankVotes: {
      fontSize: 13,
      fontWeight: "400",
      color: theme.textMuted,
      letterSpacing: 1,
    },

    viewAllButton: {
      borderWidth: 1.5,
      borderColor: theme.borderStrong,
      borderRadius: 6,
      paddingVertical: 16,
      alignItems: "center",
    },
    viewAllText: {
      fontSize: 15,
      fontWeight: "600",
      color: theme.text,
      letterSpacing: 1,
    },
  });
}
