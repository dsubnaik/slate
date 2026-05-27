import { Text, View, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import globalStyles from "../styles/globalStyles";

export default function HomeScreen() {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.titleText}>Slate</Text>
      <Text style={globalStyles.titleText}>Todays Challenge:</Text>
      <Text style={globalStyles.titleText}>Timer:</Text>
      <StatusBar style="auto" />
    </View>
  );
}
