import { Text, View, TouchableOpacity } from "react-native";
import globalStyles from "../styles/globalStyles";

export default function LandingScreen() {
  return (
    <View style={globalStyles.container}>
      {/* This will be replaced with an actual logo and slogan later */}
      <Text>Slate</Text>
      <Text>Catchy Slogan</Text>

      {/* Sign up button */}
      <TouchableOpacity>
        <Text>Sign Up</Text>
      </TouchableOpacity>

      {/* Log in button */}
      <TouchableOpacity>
        <Text>Log In</Text>
      </TouchableOpacity>
    </View>
  );
}
