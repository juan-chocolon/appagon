import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Card, Button, TextInput, ActivityIndicator, Text, Switch, IconButton } from "react-native-paper";
import { supabase } from "../../initSupabase";
import { useRouter } from "expo-router";

export default function SettingsScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [textInputValue, setTextInputValue] = useState("");
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error fetching user:", error.message);
        Alert.alert("Error", "Unable to fetch user information.");
      } else if (data.session) {
        setUserEmail(data.session.user.email);
      }
    };

    fetchUser();
  }, []);

  const handleSaveSettings = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      Alert.alert("Success", "Settings have been saved!");
    }, 2000); // Simulate API call
  };

  const toggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert("Error", "Logout failed. Please try again.");
    } else {
      Alert.alert("Logged Out", "You have been successfully logged out.");
      router.replace("/auth/login") // Navigate to login screen (if using Expo Router or React Navigation)
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Settings" />
        <Card.Content>
          {userEmail ? (
            <>
              <Text style={styles.userInfo}>Logged in as: {userEmail}</Text>

              <TextInput
                label="Example Input"
                mode="outlined"
                value={textInputValue}
                onChangeText={(text) => setTextInputValue(text)}
                style={styles.input}
              />

              <View style={styles.switchContainer}>
                <Text>Enable Feature:</Text>
                <Switch value={isSwitchOn} onValueChange={toggleSwitch} />
              </View>
            </>
          ) : (
            <ActivityIndicator animating={true} size="large" />
          )}
        </Card.Content>
        <Card.Actions>
          <Button
            mode="contained"
            onPress={handleSaveSettings}
            disabled={loading || !userEmail}
            style={styles.button}
          >
            Save Settings
          </Button>
        </Card.Actions>
      </Card>

      <View style={styles.logoutContainer}>
        <IconButton
          icon="logout"
          color="#6200ea"
          size={24}
          onPress={handleLogout}
        />
        <Text style={styles.logoutText}>Logout</Text>
      </View>

      {loading && (
        <View style={styles.spinnerContainer}>
          <ActivityIndicator animating={true} size="large" />
          <Text>Saving...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  card: {
    marginBottom: 20,
  },
  input: {
    marginTop: 10,
    marginBottom: 20,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    marginTop: 10,
  },
  logoutContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  logoutText: {
    fontSize: 16,
    marginLeft: 10,
    color: "#6200ea",
    fontWeight: "bold",
  },
  userInfo: {
    marginBottom: 20,
    fontSize: 16,
    fontWeight: "bold",
  },
  spinnerContainer: {
    alignItems: "center",
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
  },
});