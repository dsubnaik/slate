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
import { useTheme } from "../context/ThemeContext";

const REMINDER_TIMES = ["5:00 AM", "6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM"];

function SectionLabel({ title, danger, s }) {
  return (
    <Text style={[s.sectionLabel, danger && s.sectionLabelDanger]}>{title}</Text>
  );
}

function SettingsRow({ label, value, onPress, rightLabel, danger, first, s }) {
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

function ToggleRow({ label, value, onChange, first, s, theme }) {
  return (
    <View style={[s.row, !first && s.rowBorder]}>
      <Text style={s.rowLabel}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{ false: theme.switchTrackOff, true: theme.accent }}
        thumbColor={theme.bg}
        ios_backgroundColor={theme.switchTrackOff}
      />
    </View>
  );
}

export default function SettingsScreen({ navigation }) {
  const { theme, isDark, toggleTheme } = useTheme();
  const s = makeStyles(theme);

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
      <StatusBar style={theme.statusBar} />

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
        <SectionLabel title="account" s={s} />
        <View style={s.section}>
          <SettingsRow
            first
            label="Hidden Bear"
            value={<Text style={s.editLink}>Edit</Text>}
            onPress={handleEditUsername}
            s={s}
          />
          <SettingsRow
            label="Change Password"
            rightLabel="→"
            onPress={handleChangePassword}
            s={s}
          />
          <SettingsRow
            label="derricksubnaik@gmail.com"
            value={<Text style={s.lockedValue}>linked</Text>}
            s={s}
          />
        </View>

        {/* Preferences */}
        <SectionLabel title="preferences" s={s} />
        <View style={s.section}>
          <ToggleRow
            first
            label="Dark Mode"
            value={isDark}
            onChange={toggleTheme}
            s={s}
            theme={theme}
          />
          <ToggleRow
            label="Push Notifications"
            value={pushNotifs}
            onChange={setPushNotifs}
            s={s}
            theme={theme}
          />
          <ToggleRow
            label="Daily Challenge Reminder"
            value={dailyReminder}
            onChange={setDailyReminder}
            s={s}
            theme={theme}
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
        <SectionLabel title="danger zone" danger s={s} />
        <View style={s.section}>
          <SettingsRow
            first
            label="Log Out"
            danger
            onPress={handleLogOut}
            s={s}
          />
          <SettingsRow
            label="Delete Account"
            danger
            onPress={handleDeleteAccount}
            s={s}
          />
        </View>

        <View style={s.foot} />
      </ScrollView>
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
      paddingBottom: 4,
    },
    backButton: {
      fontSize: 14,
      fontWeight: "500",
      color: theme.text,
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
      color: theme.text,
      letterSpacing: -2,
    },
    scrollFlex: {
      flex: 1,
    },
    scroll: {
      paddingHorizontal: 32,
      paddingBottom: 32,
    },

    sectionLabel: {
      fontSize: 11,
      fontWeight: "500",
      color: theme.text,
      letterSpacing: 3,
      textTransform: "uppercase",
      marginBottom: 10,
      marginTop: 28,
    },
    sectionLabelDanger: {
      color: "#cc0000",
    },

    section: {
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 6,
      overflow: "hidden",
    },

    row: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      paddingVertical: 15,
      backgroundColor: theme.bg,
    },
    rowBorder: {
      borderTopWidth: 1,
      borderTopColor: theme.divider,
    },
    rowLabel: {
      fontSize: 15,
      fontWeight: "400",
      color: theme.text,
      flex: 1,
    },
    rowLabelDanger: {
      color: "#cc0000",
      fontWeight: "500",
    },
    rowRight: {
      fontSize: 15,
      color: theme.textDim,
    },
    editLink: {
      fontSize: 13,
      fontWeight: "500",
      color: theme.textMuted,
      letterSpacing: 0.3,
    },
    lockedValue: {
      fontSize: 11,
      fontWeight: "500",
      color: theme.textDim,
      letterSpacing: 1.5,
      textTransform: "uppercase",
    },

    subRow: {
      backgroundColor: theme.surfaceAlt,
      paddingLeft: 32,
    },
    subRowLabel: {
      fontSize: 14,
      fontWeight: "400",
      color: theme.textMuted,
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
      color: theme.text,
    },
    subRowChevron: {
      fontSize: 18,
      color: theme.textDim,
      lineHeight: 20,
    },

    foot: {
      height: 16,
    },
  });
}
