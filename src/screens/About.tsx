import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import { Box, VStack, HStack, Text, Button, Spinner, Card, useTheme } from "react-native-rapi-ui";
import { supabase } from "../initSupabase";
import { MainStackParamList } from "../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export default function ({
  navigation,
}: NativeStackScreenProps<MainStackParamList, "MainTabs">) {

  const { isDarkmode, setTheme } = useTheme() 
  const [user, setUser] = useState(null); // User data state
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch user details from Supabase
  const fetchUserDetails = async () => {
    try {
      const { data: userData, error } = await supabase.auth.getUser();

      if (error) {
        throw error;
      }

      if (userData?.user) {
        setUser({
          email: userData.user.email,
          id: userData.user.id,
          createdAt: userData.user.created_at,
        });
      }
    } catch (err) {
      console.error("Error fetching user details:", err);
      Alert.alert("Error", "Failed to fetch user details.");
    } finally {
      setLoading(false);
    }
  };

  // Handle user logout
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        throw error;
      }

      Alert.alert("Logged Out", "You have been successfully logged out.");
      navigation.replace("Login"); // Navigate to the login screen
    } catch (err) {
      console.error("Error logging out:", err);
      Alert.alert("Error", "Failed to log out. Please try again.");
    }
  };

  // Fetch user details on component mount
  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <Box flex={1} p={4} bg="gray.100">
      <VStack space={4} flex={1} justifyContent="center">
        <Card p={4} rounded shadow bg="white">
          <Text size="xl" weight="bold" mb={3}>
            Profile Information
          </Text>
          {loading ? (
            <Spinner color="blue.500" size="lg" />
          ) : user ? (
            <VStack space={3}>
              <HStack justifyContent="space-between">
                <Text weight="bold">Email:</Text>
                <Text>{user.email}</Text>
              </HStack>
              <HStack justifyContent="space-between">
                <Text weight="bold">User ID:</Text>
                <Text>{user.id}</Text>
              </HStack>
              <HStack justifyContent="space-between">
                <Text weight="bold">Account Created:</Text>
                <Text>{new Date(user.createdAt).toLocaleString()}</Text>
              </HStack>
            </VStack>
          ) : (
            <Text>No user information available.</Text>
          )}
        </Card>
        <Button
          bg="red.500"
          color="white"
          onPress={handleLogout}
          rounded="full"
          mt={4}
        >
          Logout
        </Button>
      </VStack>
    </Box>
  );
}
