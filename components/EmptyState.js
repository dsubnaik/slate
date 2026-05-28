import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";

export default function EmptyState({ title, subtitle }) {
  const { theme } = useTheme();

  return (
    <View style={s.container}>
      <View style={[s.card, { borderColor: theme.border }]}>
        <View style={[s.cardImg, { backgroundColor: theme.surface }]} />
        <View style={[s.cardMeta, { borderTopColor: theme.border }]}>
          <View style={[s.metaLine, s.metaLineLong,  { backgroundColor: theme.border }]} />
          <View style={[s.metaLine, s.metaLineShort, { backgroundColor: theme.border }]} />
        </View>
      </View>
      <Text style={[s.title,    { color: theme.text }]}>{title}</Text>
      {subtitle && (
        <Text style={[s.subtitle, { color: theme.textMuted }]}>{subtitle}</Text>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 56,
    paddingHorizontal: 48,
  },
  // Mini submission-card illustration
  card: {
    width: 80,
    borderWidth: 1,
    borderRadius: 6,
    overflow: "hidden",
    marginBottom: 24,
    opacity: 0.55,
  },
  cardImg: {
    height: 60,
  },
  cardMeta: {
    padding: 10,
    gap: 7,
    borderTopWidth: 1,
  },
  metaLine: {
    height: 5,
    borderRadius: 3,
  },
  metaLineLong: {
    width: "75%",
  },
  metaLineShort: {
    width: "45%",
  },
  // Text
  title: {
    fontSize: 15,
    fontWeight: "600",
    letterSpacing: 0.2,
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "400",
    textAlign: "center",
    lineHeight: 19,
    letterSpacing: 0.2,
  },
});
