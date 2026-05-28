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

const MAX_VOTES = 10;

const SUBMISSIONS = [
  { id: "1", name: "Anonymous Penguin", baseVotes: 24 },
  { id: "2", name: "Mystery Fox", baseVotes: 17 },
  { id: "3", name: "Silent Raccoon", baseVotes: 31 },
  { id: "4", name: "Shadow Owl", baseVotes: 8 },
  { id: "5", name: "Hidden Bear", baseVotes: 42 },
  { id: "6", name: "Phantom Wolf", baseVotes: 15 },
  { id: "7", name: "Cryptic Narwhal", baseVotes: 29 },
  { id: "8", name: "Unknown Capybara", baseVotes: 11 },
];

export default function VotingScreen({ navigation }) {
  // voted is a Set of submission IDs the user has upvoted
  const [voted, setVoted] = useState(new Set());

  const votesUsed = voted.size;
  const votesLeft = MAX_VOTES - votesUsed;
  const outOfVotes = votesLeft === 0;

  function handleVote(id) {
    setVoted((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (outOfVotes) return prev;
        next.add(id);
      }
      return next;
    });
  }

  return (
    <SafeAreaView style={s.container}>
      <StatusBar style="dark" />

      <View style={s.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Text style={s.backButton}>← back</Text>
        </TouchableOpacity>
        <View style={s.votesRemaining}>
          <Text style={[s.votesCount, outOfVotes && s.votesCountEmpty]}>
            {votesLeft}
          </Text>
          <Text style={s.votesLabel}>votes left</Text>
        </View>
      </View>

      <View style={s.titleSection}>
        <Text style={s.eyebrow}>today's submissions</Text>
        <Text style={s.pageTitle}>Urban Isolation</Text>
      </View>

      {outOfVotes && (
        <View style={s.emptyBanner}>
          <Text style={s.emptyBannerText}>
            No votes left — un-tap a 🔥 to move your vote
          </Text>
        </View>
      )}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={s.feedPad}
      >
        {SUBMISSIONS.map((entry) => {
          const isVoted = voted.has(entry.id);
          const isDisabled = outOfVotes && !isVoted;
          const displayVotes = entry.baseVotes + (isVoted ? 1 : 0);

          return (
            <View key={entry.id} style={s.card}>
              <View style={s.cardImage} />
              <View style={s.cardRow}>
                <Text style={s.cardName}>{entry.name}</Text>
                <TouchableOpacity
                  style={[
                    s.fireBtn,
                    isVoted && s.fireBtnVoted,
                    isDisabled && s.fireBtnDisabled,
                  ]}
                  activeOpacity={isDisabled ? 1 : 0.7}
                  onPress={() => !isDisabled && handleVote(entry.id)}
                  disabled={isDisabled}
                >
                  {isDisabled ? (
                    <Text style={s.fireBtnTextDisabled}>no votes left</Text>
                  ) : (
                    <Text style={[s.fireBtnText, isVoted && s.fireBtnTextVoted]}>
                      {displayVotes}{"  "}🔥
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
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
  votesRemaining: {
    alignItems: "flex-end",
  },
  votesCount: {
    fontSize: 28,
    fontWeight: "900",
    color: "#000",
    letterSpacing: -1,
    lineHeight: 30,
  },
  votesCountEmpty: {
    color: "#ccc",
  },
  votesLabel: {
    fontSize: 10,
    fontWeight: "500",
    color: "#888",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  titleSection: {
    paddingHorizontal: 32,
    paddingTop: 8,
    paddingBottom: 16,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: "500",
    color: "#000",
    letterSpacing: 3,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  pageTitle: {
    fontSize: 36,
    fontWeight: "900",
    color: "#000",
    letterSpacing: -1.5,
  },
  emptyBanner: {
    marginHorizontal: 32,
    marginBottom: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#e8e8e8",
    borderRadius: 6,
    backgroundColor: "#fafafa",
  },
  emptyBannerText: {
    fontSize: 12,
    fontWeight: "400",
    color: "#888",
    letterSpacing: 0.3,
  },
  feedPad: {
    paddingHorizontal: 32,
    paddingBottom: 48,
  },
  card: {
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#e8e8e8",
    borderRadius: 6,
    overflow: "hidden",
  },
  cardImage: {
    height: 200,
    backgroundColor: "#f2f2f2",
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  cardName: {
    fontSize: 13,
    fontWeight: "500",
    color: "#000",
    letterSpacing: 0.3,
  },
  fireBtn: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderWidth: 1.5,
    borderColor: "#000",
    borderRadius: 4,
  },
  fireBtnVoted: {
    backgroundColor: "#000",
    borderColor: "#000",
  },
  fireBtnDisabled: {
    borderColor: "#e0e0e0",
    backgroundColor: "#fafafa",
  },
  fireBtnText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  fireBtnTextVoted: {
    color: "#fff",
  },
  fireBtnTextDisabled: {
    fontSize: 11,
    fontWeight: "500",
    color: "#bbb",
    letterSpacing: 0.3,
  },
});
