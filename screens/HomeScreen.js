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

function getPhase(hour) {
  if (hour >= 6 && hour < 18) return "submit";
  if (hour >= 18 && hour < 23) return "vote";
  return "results";
}

function formatCountdown(ms) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return [h, m, s].map((n) => String(n).padStart(2, "0")).join(":");
}

function msUntilHour(targetHour) {
  const now = new Date();
  const target = new Date(now);
  target.setHours(targetHour, 0, 0, 0);
  if (target <= now) target.setDate(target.getDate() + 1);
  return target - now;
}

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

// DEV ONLY — remove before launch
function DevBar({ activePhase, onPress }) {
  const buttons = [
    { phase: "submit", label: "Submission" },
    { phase: "vote", label: "Voting" },
    { phase: "results", label: "Results" },
  ];
  return (
    <View style={dev.bar}>
      <Text style={dev.badge}>DEV</Text>
      {buttons.map(({ phase, label }) => (
        <TouchableOpacity
          key={phase}
          style={[dev.btn, activePhase === phase && dev.btnActive]}
          activeOpacity={0.7}
          onPress={() => onPress(phase)}
        >
          <Text style={[dev.btnText, activePhase === phase && dev.btnTextActive]}>
            {label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default function HomeScreen({ navigation }) {
  const [phase, setPhase] = useState(() => getPhase(new Date().getHours()));
  const [devPhase, setDevPhase] = useState(null);

  useEffect(() => {
    const id = setInterval(() => setPhase(getPhase(new Date().getHours())), 60000);
    return () => clearInterval(id);
  }, []);

  const activePhase = devPhase ?? phase;

  return (
    <SafeAreaView style={s.container}>
      <StatusBar style="dark" />
      {/* DEV ONLY — remove before launch */}
      <DevBar
        activePhase={activePhase}
        onPress={(p) => {
          if (p === "results") {
            navigation.navigate("Results");
          } else {
            setDevPhase(devPhase === p ? null : p);
          }
        }}
      />
      <View style={s.navbar}>
        <TouchableOpacity
          style={s.profileBtn}
          activeOpacity={0.7}
          onPress={() => navigation.navigate("Profile")}
        >
          <Text style={s.profileBtnText}>HB</Text>
        </TouchableOpacity>
      </View>
      {activePhase === "submit" && <SubmitView navigation={navigation} />}
      {activePhase === "vote" && <VoteView />}
      {activePhase === "results" && <ResultsView navigation={navigation} />}
    </SafeAreaView>
  );
}

function SubmitView({ navigation }) {
  const [ms, setMs] = useState(() => msUntilHour(18));

  useEffect(() => {
    const id = setInterval(() => setMs(msUntilHour(18)), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <View style={s.flexFill}>
      <View style={s.submitBody}>
        <Text style={s.eyebrow}>today's challenge</Text>
        <Text style={s.challengeTitle}>Urban Isolation</Text>
        <View style={s.timerBlock}>
          <Text style={s.timerTime}>{formatCountdown(ms)}</Text>
          <Text style={s.timerLabel}>until 6PM</Text>
        </View>
      </View>
      <View style={s.bottomAction}>
        <TouchableOpacity
          style={s.blackButton}
          activeOpacity={0.85}
          onPress={() => navigation.navigate("Submission")}
        >
          <Text style={s.blackButtonText}>Submit Entry</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function VoteView() {
  const [voted, setVoted] = useState(new Set());

  const votesLeft = MAX_VOTES - voted.size;
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
    <View style={s.flexFill}>
      <View style={s.pageHeader}>
        <View style={s.voteHeaderRow}>
          <Text style={s.phaseTitle}>time to vote.</Text>
          <View style={s.votePill}>
            <Text style={[s.votePillCount, outOfVotes && s.votePillCountEmpty]}>
              {votesLeft}
            </Text>
            <Text style={s.votePillLabel}>left</Text>
          </View>
        </View>
        <Text style={s.phaseSub}>choose your favorites</Text>
      </View>
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
                <Text style={s.cardLabel}>{entry.name}</Text>
                <TouchableOpacity
                  style={[
                    s.fireButton,
                    isVoted && s.fireButtonVoted,
                    isDisabled && s.fireButtonDisabled,
                  ]}
                  activeOpacity={isDisabled ? 1 : 0.7}
                  onPress={() => handleVote(entry.id)}
                  disabled={isDisabled}
                >
                  {isDisabled ? (
                    <Text style={s.fireButtonTextDisabled}>no votes left</Text>
                  ) : (
                    <Text style={[s.fireButtonText, isVoted && s.fireButtonTextVoted]}>
                      {displayVotes}{"  "}🔥
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

function ResultsView({ navigation }) {
  return (
    <View style={s.flexFill}>
      <View style={s.submitBody}>
        <Text style={s.eyebrow}>voting is closed</Text>
        <Text style={s.challengeTitle}>Urban Isolation</Text>
        <Text style={s.timerLabel}>the winner has been revealed</Text>
      </View>
      <View style={s.bottomAction}>
        <TouchableOpacity
          style={s.blackButton}
          activeOpacity={0.85}
          onPress={() => navigation.navigate("Results")}
        >
          <Text style={s.blackButtonText}>See Results</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const dev = StyleSheet.create({
  bar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFE500",
    paddingHorizontal: 10,
    paddingVertical: 7,
    gap: 6,
  },
  badge: {
    fontSize: 9,
    fontWeight: "900",
    color: "#FFE500",
    backgroundColor: "#000",
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 3,
    letterSpacing: 1,
    marginRight: 2,
    overflow: "hidden",
  },
  btn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: "rgba(0,0,0,0.25)",
  },
  btnActive: {
    backgroundColor: "#000",
    borderColor: "#000",
  },
  btnText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#000",
    letterSpacing: 0.3,
  },
  btnTextActive: {
    color: "#FFE500",
  },
});

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  flexFill: {
    flex: 1,
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 32,
    paddingVertical: 10,
  },
  profileBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  profileBtnText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#fff",
    letterSpacing: 0.5,
  },

  // Submit state
  submitBody: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: "center",
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: "500",
    color: "#000",
    letterSpacing: 3,
    textTransform: "uppercase",
    marginBottom: 16,
  },
  challengeTitle: {
    fontSize: 52,
    fontWeight: "900",
    color: "#000",
    letterSpacing: -2,
    lineHeight: 56,
    marginBottom: 48,
  },
  timerBlock: {
    alignItems: "flex-start",
  },
  timerTime: {
    fontSize: 48,
    fontWeight: "900",
    color: "#000",
    letterSpacing: -2,
  },
  timerLabel: {
    fontSize: 11,
    fontWeight: "400",
    color: "#888",
    letterSpacing: 2,
    marginTop: 6,
    textTransform: "uppercase",
  },
  bottomAction: {
    paddingHorizontal: 32,
    paddingBottom: 48,
  },
  blackButton: {
    backgroundColor: "#000",
    paddingVertical: 16,
    borderRadius: 6,
    alignItems: "center",
  },
  blackButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    letterSpacing: 1,
  },

  // Vote state
  pageHeader: {
    paddingHorizontal: 32,
    paddingTop: 32,
    paddingBottom: 24,
  },
  voteHeaderRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  phaseTitle: {
    fontSize: 52,
    fontWeight: "900",
    color: "#000",
    letterSpacing: -2,
  },
  votePill: {
    alignItems: "center",
    paddingBottom: 6,
  },
  votePillCount: {
    fontSize: 28,
    fontWeight: "900",
    color: "#000",
    letterSpacing: -1,
    lineHeight: 30,
  },
  votePillCountEmpty: {
    color: "#ccc",
  },
  votePillLabel: {
    fontSize: 10,
    fontWeight: "500",
    color: "#888",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  phaseSub: {
    fontSize: 13,
    fontWeight: "400",
    color: "#888",
    letterSpacing: 2,
    marginTop: 6,
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
  cardLabel: {
    fontSize: 13,
    fontWeight: "500",
    color: "#000",
    letterSpacing: 0.5,
  },
  fireButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderWidth: 1.5,
    borderColor: "#000",
    borderRadius: 4,
  },
  fireButtonVoted: {
    backgroundColor: "#000",
    borderColor: "#000",
  },
  fireButtonDisabled: {
    borderColor: "#e0e0e0",
    backgroundColor: "#fafafa",
  },
  fireButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  fireButtonTextVoted: {
    color: "#fff",
  },
  fireButtonTextDisabled: {
    fontSize: 11,
    fontWeight: "500",
    color: "#bbb",
    letterSpacing: 0.3,
  },

});
