import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";

const USERNAME = "Hidden Bear";

const STATS = { streak: 7, wins: 3, winRate: 43 };

const HISTORY = [
  { id: "1", challenge: "Urban Isolation", date: "Today",   votes: 42, won: true  },
  { id: "2", challenge: "Golden Hour",     date: "May 26",  votes: 31, won: false },
  { id: "3", challenge: "Texture Study",   date: "May 25",  votes: 18, won: false },
  { id: "4", challenge: "Blue Hour",       date: "May 24",  votes: 55, won: true  },
  { id: "5", challenge: "Still Life",      date: "May 23",  votes: 9,  won: false },
  { id: "6", challenge: "Neon Nights",     date: "May 22",  votes: 63, won: true  },
  { id: "7", challenge: "Empty Streets",   date: "May 21",  votes: 28, won: false },
];

function StatCell({ value, label, borderRight }) {
  return (
    <View style={[s.statCell, borderRight && s.statCellBorder]}>
      <Text style={s.statValue}>{value}</Text>
      <Text style={s.statLabel}>{label}</Text>
    </View>
  );
}

export default function ProfileScreen({ navigation }) {
  return (
    <SafeAreaView style={s.container}>
      <StatusBar style="dark" />

      <View style={s.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Text style={s.backButton}>← back</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7}>
          <Text style={s.gearIcon}>⚙</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={s.scroll}
      >
        {/* Identity */}
        <View style={s.identitySection}>
          <View style={s.usernameRow}>
            <Text style={s.username}>{USERNAME}</Text>
            <TouchableOpacity style={s.editBtn} activeOpacity={0.6}>
              <Text style={s.editIcon}>✏︎</Text>
            </TouchableOpacity>
          </View>
          <Text style={s.identityLabel}>your anonymous identity</Text>
        </View>

        {/* Stats */}
        <View style={s.statsRow}>
          <StatCell value={`🔥 ${STATS.streak}`} label="day streak"  borderRight />
          <StatCell value={`🏆 ${STATS.wins}`}   label="total wins"  borderRight />
          <StatCell value={`${STATS.winRate}%`}   label="win rate"               />
        </View>

        {/* History */}
        <Text style={s.sectionEyebrow}>past submissions</Text>
        <View style={s.historyList}>
          {HISTORY.map((item) => (
            <View key={item.id} style={s.historyRow}>
              <View style={s.thumb} />
              <View style={s.historyMid}>
                <Text style={s.challengeName}>
                  {item.won ? "👑  " : ""}{item.challenge}
                </Text>
                <Text style={s.historyDate}>{item.date}</Text>
              </View>
              <Text style={s.historyVotes}>{item.votes} 🔥</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 32,
    paddingTop: 16,
    paddingBottom: 8,
  },
  backButton: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
    letterSpacing: 0.5,
  },
  gearIcon: {
    fontSize: 22,
    color: "#000",
  },
  scroll: {
    paddingHorizontal: 32,
    paddingTop: 20,
    paddingBottom: 56,
  },

  // Identity
  identitySection: {
    marginBottom: 32,
  },
  usernameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 6,
  },
  username: {
    fontSize: 34,
    fontWeight: "900",
    color: "#000",
    letterSpacing: -1.5,
  },
  editBtn: {
    paddingTop: 4,
  },
  editIcon: {
    fontSize: 18,
    color: "#888",
  },
  identityLabel: {
    fontSize: 11,
    fontWeight: "400",
    color: "#888",
    letterSpacing: 2.5,
    textTransform: "uppercase",
  },

  // Stats
  statsRow: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#e8e8e8",
    borderRadius: 6,
    overflow: "hidden",
    marginBottom: 44,
  },
  statCell: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 18,
    gap: 4,
  },
  statCellBorder: {
    borderRightWidth: 1,
    borderRightColor: "#e8e8e8",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "800",
    color: "#000",
    letterSpacing: -0.5,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: "400",
    color: "#888",
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },

  // History
  sectionEyebrow: {
    fontSize: 11,
    fontWeight: "500",
    color: "#000",
    letterSpacing: 3,
    textTransform: "uppercase",
    marginBottom: 16,
  },
  historyList: {},
  historyRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    gap: 14,
  },
  thumb: {
    width: 52,
    height: 52,
    borderRadius: 4,
    backgroundColor: "#f2f2f2",
  },
  historyMid: {
    flex: 1,
    gap: 4,
  },
  challengeName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    letterSpacing: 0.1,
  },
  historyDate: {
    fontSize: 12,
    fontWeight: "400",
    color: "#888",
    letterSpacing: 0.5,
  },
  historyVotes: {
    fontSize: 13,
    fontWeight: "500",
    color: "#000",
    letterSpacing: 0.3,
  },
});
