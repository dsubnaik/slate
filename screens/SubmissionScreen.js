import { useState, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image,
  PanResponder,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Svg, { Path } from "react-native-svg";
import * as ImagePicker from "expo-image-picker";
import { useTheme } from "../context/ThemeContext";
import BottomNav from "../components/BottomNav";

const CHALLENGE_TITLE = "Urban Isolation";

export default function SubmissionScreen({ navigation }) {
  const { theme } = useTheme();
  const s = makeStyles(theme);

  const [type, setType] = useState("draw");
  const [strokes, setStrokes] = useState([]);
  const [liveSegment, setLiveSegment] = useState("");
  const [photoUri, setPhotoUri] = useState(null);
  const [text, setText] = useState("");
  const currentPathRef = useRef("");

  const hasContent =
    (type === "draw" && strokes.length > 0) ||
    (type === "photo" && photoUri !== null) ||
    (type === "text" && text.trim().length > 0);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (e) => {
        const { locationX, locationY } = e.nativeEvent;
        currentPathRef.current = `M ${locationX} ${locationY}`;
        setLiveSegment(currentPathRef.current);
      },
      onPanResponderMove: (e) => {
        const { locationX, locationY } = e.nativeEvent;
        currentPathRef.current += ` L ${locationX} ${locationY}`;
        setLiveSegment(currentPathRef.current);
      },
      onPanResponderRelease: () => {
        if (currentPathRef.current) {
          const completed = currentPathRef.current;
          currentPathRef.current = "";
          setLiveSegment("");
          setStrokes((prev) => [...prev, completed]);
        }
      },
    })
  ).current;

  async function pickFromCamera() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission required", "Camera access is needed to take a photo.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({ allowsEditing: true, quality: 0.8 });
    if (!result.canceled) setPhotoUri(result.assets[0].uri);
  }

  async function pickFromLibrary() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission required", "Photo library access is needed.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 0.8,
    });
    if (!result.canceled) setPhotoUri(result.assets[0].uri);
  }

  function handlePhotoTap() {
    Alert.alert("Add Photo", "Choose a source", [
      { text: "Camera", onPress: pickFromCamera },
      { text: "Photo Library", onPress: pickFromLibrary },
      { text: "Cancel", style: "cancel" },
    ]);
  }

  function handleClearDraw() {
    setStrokes([]);
    setLiveSegment("");
    currentPathRef.current = "";
  }

  function handleSubmit() {
    Alert.alert("Submitted!", "Your entry has been submitted.", [
      { text: "OK", onPress: () => navigation.navigate("Home") },
    ]);
  }

  return (
    <SafeAreaView style={s.container}>
      <StatusBar style={theme.statusBar} />

      <View style={s.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Text style={s.backButton}>← back</Text>
        </TouchableOpacity>
      </View>

      <View style={s.titleSection}>
        <Text style={s.eyebrow}>today's challenge</Text>
        <Text style={s.challengeTitle}>{CHALLENGE_TITLE}</Text>
      </View>

      <View style={s.typeSelector}>
        {["draw", "photo", "text"].map((t) => (
          <TouchableOpacity
            key={t}
            style={[s.typeBtn, type === t && s.typeBtnActive]}
            activeOpacity={0.7}
            onPress={() => setType(t)}
          >
            <Text style={[s.typeBtnText, type === t && s.typeBtnTextActive]}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={s.previewWrapper}>
        {type === "draw" && (
          <View style={s.previewArea} {...panResponder.panHandlers}>
            <Svg style={StyleSheet.absoluteFill}>
              {strokes.map((path, i) => (
                <Path
                  key={i}
                  d={path}
                  stroke={theme.text}
                  strokeWidth={3}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ))}
              {liveSegment ? (
                <Path
                  d={liveSegment}
                  stroke={theme.text}
                  strokeWidth={3}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ) : null}
            </Svg>
            {strokes.length === 0 && !liveSegment && (
              <Text style={s.hint}>draw here</Text>
            )}
            {strokes.length > 0 && (
              <TouchableOpacity style={s.clearBtn} onPress={handleClearDraw}>
                <Text style={s.clearBtnText}>clear</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {type === "photo" && (
          <TouchableOpacity
            style={s.previewArea}
            activeOpacity={0.8}
            onPress={handlePhotoTap}
          >
            {photoUri ? (
              <Image
                source={{ uri: photoUri }}
                style={StyleSheet.absoluteFill}
                resizeMode="cover"
              />
            ) : (
              <Text style={s.hint}>tap to add photo</Text>
            )}
          </TouchableOpacity>
        )}

        {type === "text" && (
          <View style={s.previewArea}>
            <TextInput
              style={s.textInput}
              multiline
              placeholder="write something..."
              placeholderTextColor={theme.placeholder}
              value={text}
              onChangeText={setText}
              textAlignVertical="top"
            />
          </View>
        )}
      </View>

      <View style={s.bottomAction}>
        <TouchableOpacity
          style={[s.submitButton, !hasContent && s.submitButtonDisabled]}
          activeOpacity={hasContent ? 0.85 : 1}
          onPress={hasContent ? handleSubmit : undefined}
          disabled={!hasContent}
        >
          <Text style={[s.submitButtonText, !hasContent && s.submitButtonTextDisabled]}>
            Submit Entry
          </Text>
        </TouchableOpacity>
      </View>
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
    header: {
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
    titleSection: {
      paddingHorizontal: 32,
      paddingBottom: 20,
    },
    eyebrow: {
      fontSize: 11,
      fontWeight: "500",
      color: theme.text,
      letterSpacing: 3,
      textTransform: "uppercase",
      marginBottom: 8,
    },
    challengeTitle: {
      fontSize: 36,
      fontWeight: "900",
      color: theme.text,
      letterSpacing: -1.5,
    },
    typeSelector: {
      flexDirection: "row",
      paddingHorizontal: 32,
      gap: 8,
      marginBottom: 16,
    },
    typeBtn: {
      flex: 1,
      paddingVertical: 10,
      borderRadius: 6,
      borderWidth: 1.5,
      borderColor: theme.borderStrong,
      alignItems: "center",
    },
    typeBtnActive: {
      backgroundColor: theme.accent,
    },
    typeBtnText: {
      fontSize: 13,
      fontWeight: "600",
      color: theme.text,
      letterSpacing: 0.5,
    },
    typeBtnTextActive: {
      color: theme.accentText,
    },
    previewWrapper: {
      flex: 1,
      paddingHorizontal: 32,
    },
    previewArea: {
      flex: 1,
      borderWidth: 1.5,
      borderColor: theme.borderStrong,
      borderRadius: 6,
      overflow: "hidden",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.bg,
    },
    hint: {
      fontSize: 13,
      fontWeight: "400",
      color: theme.textDim,
      letterSpacing: 2,
    },
    clearBtn: {
      position: "absolute",
      top: 12,
      right: 12,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderWidth: 1,
      borderColor: theme.text,
      borderRadius: 4,
    },
    clearBtnText: {
      fontSize: 11,
      fontWeight: "600",
      color: theme.text,
      letterSpacing: 1,
    },
    textInput: {
      flex: 1,
      padding: 16,
      fontSize: 16,
      fontWeight: "400",
      color: theme.text,
      lineHeight: 24,
      width: "100%",
      backgroundColor: theme.bg,
    },
    bottomAction: {
      paddingHorizontal: 32,
      paddingTop: 16,
      paddingBottom: 16,
    },
    submitButton: {
      backgroundColor: theme.accent,
      paddingVertical: 16,
      borderRadius: 6,
      alignItems: "center",
    },
    submitButtonDisabled: {
      backgroundColor: theme.surface,
    },
    submitButtonText: {
      color: theme.accentText,
      fontSize: 15,
      fontWeight: "600",
      letterSpacing: 1,
    },
    submitButtonTextDisabled: {
      color: theme.textMuted,
    },
  });
}
