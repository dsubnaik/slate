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
import BottomNav from "../components/BottomNav";

const TABS = ["This Week", "All Time"];

const MEDAL = { 1: "🥇", 2: "🥈", 3: "🥉" };

const THIS_WEEK = [
  { rank: 1,  name: "Cryptic Narwhal",   wins: 5, votes: 241, isMe: false },
  { rank: 2,  name: "Silent Raccoon",    wins: 4, votes: 198, isMe: false },
  { rank: 3,  name: "Phantom Wolf",      wins: 3, votes: 189, isMe: false },
  { rank: 4,  name: "Hidden Bear",       wins: 3, votes: 177, isMe: true  },
  { rank: 5,  name: "Mystery Fox",       wins: 2, votes: 134, isMe: false },
  { rank: 6,  name: "Shadow Owl",        wins: 2, votes: 119, isMe: false },
  { rank: 7,  name: "Anonymous Penguin", wins: 1, votes: 95,  isMe: false },
  { rank: 8,  name: "Unknown Capybara",  wins: 1, votes: 88,  isMe: false },
  { rank: 9,  name: "Masked Lynx",       wins: 0, votes: 71,  isMe: false },
  { rank: 10, name: "Cloudy Platypus",   wins: 0, votes: 58,  isMe: false },
];

const ALL_TIME = [
  { rank: 1,  name: "Phantom Wolf",      wins: 18, votes: 892, isMe: false },
  { rank: 2,  name: "Mystery Fox",       wins: 15, votes: 743, isMe: false },
  { rank: 3,  name: "Cryptic Narwhal",   wins: 14, votes: 698, isMe: false },
  { rank: 4,  name: "Silent Raccoon",    wins: 12, votes: 612, isMe: false },
  { rank: 5,  name: "Hidden Bear",       wins: 11, votes: 547, isMe: true  },
  { rank: 6,  name: "Shadow Owl",        wins: 9,  votes: 421, isMe: false },
  { rank: 7,  name: "Anonymous Penguin", wins: 7,  votes: 334, isMe: false },
  { rank: 8,  name: "Unknown Capybara",  wins: 5,  votes: 278, isMe: false },
  { rank: 9,  name: "Masked Lynx",       wins: 3,  votes: 201, isMe: false },
  { rank: 10, name: "Cloudy Platypus",   wins: 2,  votes: 156, isMe: false },
];

export default function LeaderboardScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState(0);

  const data = activeTab === 0 ? THIS_WEEK : ALL_TIME;

  return (
    <SafeAreaView style={s.container}>
      <StatusBar style="dark" />

      <View style={s.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Text style={s.backButton}>← back</Text>
        </TouchableOpacity>
      </View>

      <View style={s.titleSection}>
        <Text style={s.pageTitle}>leaderboard.</Text>
      </View>

      {/* Tabs */}
      <View style={s.tabs}>
        {TABS.map((label, i) => (
          <TouchableOpacity
            key={label}
            style={[s.tab, activeTab === i && s.tabActive]}
            activeOpacity={0.7}
            onPress={() => setActiveTab(i)}
          >
            <Text style={[s.tabText, activeTab === i && s.tabTextActive]}>
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Column headers */}
      <View style={s.colHeader}>
        <View style={s.colHeaderLeft} />
        <Text style={s.colHeaderLabel}>WINS</Text>
        <Text style={s.colHeaderLabel}>VOTES</Text>
      </View>

      <ScrollView style={s.list} showsVerticalScrollIndicator={false}>
        {data.map((item) => (
          <View
            key={item.rank}
            style={[s.row, item.isMe && s.rowHighlight]}
          >
            {/* Rank / Medal */}
            <View style={s.rankCell}>
              {MEDAL[item.rank] ? (
                <Text style={s.medal}>{MEDAL[item.rank]}</Text>
              ) : (
                <Text style={s.rankNum}>{item.rank}</Text>
              )}
            </View>

            {/* Name */}
            <View style={s.nameCell}>
              <Text style={[s.name, item.isMe && s.nameMe]} numberOfLines={1}>
                {item.name}
              </Text>
              {item.isMe && (
                <View style={s.youBadge}>
                  <Text style={s.youBadgeText}>you</Text>
                </View>
              )}
            </View>

            {/* Wins */}
            <Text style={[s.statNum, item.isMe && s.statNumMe]}>{item.wins}</Text>

            {/* Votes */}
            <Text style={[s.statNum, s.statVotes, item.isMe && s.statNumMe]}>
              {item.votes}
            </Text>
          </View>
        ))}
        <View style={s.listFoot} />
      </ScrollView>
      <BottomNav navigation={navigation} active="leaderboard" />
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topBar: {
    paddingHorizontal: 32,
    paddingTop: 16,
    paddingBottom: 4,
  },
  backButton: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
    letterSpacing: 0.5,
  },
  titleSection: {
    paddingHorizontal: 32,
    paddingTop: 10,
    paddingBottom: 20,
  },
  pageTitle: {
    fontSize: 48,
    fontWeight: "900",
    color: "#000",
    letterSpacing: -2,
  },

  // Tabs
  tabs: {
    flexDirection: "row",
    marginHorizontal: 32,
    marginBottom: 20,
    gap: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: "#000",
    alignItems: "center",
  },
  tabActive: {
    backgroundColor: "#000",
  },
  tabText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#000",
    letterSpacing: 0.5,
  },
  tabTextActive: {
    color: "#fff",
  },

  // Column headers
  colHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e8e8e8",
  },
  colHeaderLeft: {
    flex: 1,
  },
  colHeaderLabel: {
    width: 52,
    fontSize: 9,
    fontWeight: "600",
    color: "#aaa",
    letterSpacing: 2,
    textAlign: "right",
  },

  // Rows
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  rowHighlight: {
    backgroundColor: "#f5f5f5",
  },
  rankCell: {
    width: 36,
  },
  medal: {
    fontSize: 20,
  },
  rankNum: {
    fontSize: 14,
    fontWeight: "700",
    color: "#000",
  },
  nameCell: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingRight: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
    letterSpacing: 0.1,
    flexShrink: 1,
  },
  nameMe: {
    fontWeight: "700",
  },
  youBadge: {
    backgroundColor: "#000",
    borderRadius: 3,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  youBadgeText: {
    fontSize: 9,
    fontWeight: "700",
    color: "#fff",
    letterSpacing: 1,
  },
  statNum: {
    width: 52,
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
    textAlign: "right",
  },
  statVotes: {
    color: "#888",
  },
  statNumMe: {
    fontWeight: "700",
    color: "#000",
  },
  list: {
    flex: 1,
  },
  listFoot: {
    height: 48,
  },
});
