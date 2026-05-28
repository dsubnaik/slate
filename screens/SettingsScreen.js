import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";

const REMINDER_TIMES = ["5:00 AM", "6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM"];

function SectionLabel({ title, danger }) {
  return (
    <Text style={[s.sectionLabel, danger && s.sectionLabelDanger]}>{title}</Text>
  );
}

function SettingsRow({ label, value, onPress, rightLabel, danger, first }) {
  return (
    <TouchableOpacity
      style={[s.row, !first && s.rowBorder]}
      activeOpacity={onPress ? 0.6 : 1}
      onPress={onPress}
      disabled={!onPress}
    >
      <Text style={[s.rowLabel, danger && s.rowLabelDanger]}>{label}</Text>
      {rightLabel !== undefined && (
        <Text style={s.rowRight}>{rightLabel}</Text>
      )}
      {value !== undefined && value}
    </TouchableOpacity>
  );
}

function ToggleRow({ label, value, onChange, first }) {
  return (
    <View style={[s.row, !first && s.rowBorder]}>
      <Text style={s.rowLabel}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{ false: "#e0e0e0", true: "#000" }}
        thumbColor="#fff"
        ios_backgroundColor="#e0e0e0"
      />
    </View>
  );
}

export default function SettingsScreen({ navigation }) {
  const [darkMode, setDarkMode] = useState(false);
  const [pushNotifs, setPushNotifs] = useState(true);
  const [dailyReminder, setDailyReminder] = useState(true);
  const [reminderTime, setReminderTime] = useState("6:00 AM");

  function handleEditUsername() {
    Alert.alert("Edit Username", "Username editing coming soon.");
  }

  function handleChangePassword() {
    Alert.alert("Change Password", "Password change coming soon.");
  }

  function handleReminderTimePicker() {
    Alert.alert(
      "Reminder Time",
      "Choose when to be reminded",
      REMINDER_TIMES.map((t) => ({
        text: t,
        onPress: () => setReminderTime(t),
      })).concat([{ text: "Cancel", style: "cancel" }])
    );
  }

  function handleDeleteAccount() {
    Alert.alert(
      "Delete Account",
      "This will permanently delete your account and all your submissions. This cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => {} },
      ]
    );
  }

  function handleLogOut() {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Log Out", style: "destructive", onPress: () => navigation.navigate("Landing") },
    ]);
  }

  return (
    <SafeAreaView style={s.container}>
      <StatusBar style="dark" />

      <View style={s.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Text style={s.backButton}>← back</Text>
        </TouchableOpacity>
      </View>

      <View style={s.titleSection}>
        <Text style={s.pageTitle}>settings.</Text>
      </View>

      <ScrollView
        style={s.scrollFlex}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={s.scroll}
      >
        {/* Account */}
        <SectionLabel title="account" />
        <View style={s.section}>
          <SettingsRow
            first
            label="Hidden Bear"
            value={<Text style={s.editLink}>Edit</Text>}
            onPress={handleEditUsername}
          />
          <SettingsRow
            label="Change Password"
            rightLabel="→"
            onPress={handleChangePassword}
          />
          <SettingsRow
            label="derricksubnaik@gmail.com"
            value={<Text style={s.lockedValue}>linked</Text>}
          />
        </View>

        {/* Preferences */}
        <SectionLabel title="preferences" />
        <View style={s.section}>
          <ToggleRow
            first
            label="Dark Mode"
            value={darkMode}
            onChange={setDarkMode}
          />
          <ToggleRow
            label="Push Notifications"
            value={pushNotifs}
            onChange={setPushNotifs}
          />
          <ToggleRow
            label="Daily Challenge Reminder"
            value={dailyReminder}
            onChange={setDailyReminder}
          />
          {dailyReminder && (
            <TouchableOpacity
              style={[s.row, s.rowBorder, s.subRow]}
              activeOpacity={0.6}
              onPress={handleReminderTimePicker}
            >
              <Text style={s.subRowLabel}>Reminder time</Text>
              <View style={s.subRowRight}>
                <Text style={s.subRowValue}>{reminderTime}</Text>
                <Text style={s.subRowChevron}>›</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>

        {/* Danger Zone */}
        <SectionLabel title="danger zone" danger />
        <View style={s.section}>
          <SettingsRow
            first
            label="Log Out"
            danger
            onPress={handleLogOut}
          />
          <SettingsRow
            label="Delete Account"
            danger
            onPress={handleDeleteAccount}
          />
        </View>

        <View style={s.foot} />
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
  scrollFlex: {
    flex: 1,
  },
  scroll: {
    paddingHorizontal: 32,
    paddingBottom: 32,
  },

  // Section label
  sectionLabel: {
    fontSize: 11,
    fontWeight: "500",
    color: "#000",
    letterSpacing: 3,
    textTransform: "uppercase",
    marginBottom: 10,
    marginTop: 28,
  },
  sectionLabelDanger: {
    color: "#cc0000",
  },

  // Section card
  section: {
    borderWidth: 1,
    borderColor: "#e8e8e8",
    borderRadius: 6,
    overflow: "hidden",
  },

  // Row
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 15,
    backgroundColor: "#fff",
  },
  rowBorder: {
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  rowLabel: {
    fontSize: 15,
    fontWeight: "400",
    color: "#000",
    flex: 1,
  },
  rowLabelDanger: {
    color: "#cc0000",
    fontWeight: "500",
  },
  rowRight: {
    fontSize: 15,
    color: "#aaa",
  },
  editLink: {
    fontSize: 13,
    fontWeight: "500",
    color: "#888",
    letterSpacing: 0.3,
  },
  lockedValue: {
    fontSize: 11,
    fontWeight: "500",
    color: "#bbb",
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },

  // Sub-row (reminder time picker)
  subRow: {
    backgroundColor: "#fafafa",
    paddingLeft: 32,
  },
  subRowLabel: {
    fontSize: 14,
    fontWeight: "400",
    color: "#555",
    flex: 1,
  },
  subRowRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  subRowValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
  },
  subRowChevron: {
    fontSize: 18,
    color: "#aaa",
    lineHeight: 20,
  },

  foot: {
    height: 16,
  },
});
