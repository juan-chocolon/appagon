import { Slot } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

export default function AuthLayout() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Authentication</Text>
      </View>
      <Slot />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "#6200ea",
  },
  title: {
    fontSize: 24,
    color: "white",
  },
});
