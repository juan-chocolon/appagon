import React, { useEffect, useState } from "react";
import { Slot, Stack, useRouter } from "expo-router";
import { supabase } from "../initSupabase";
import { View, Text, ActivityIndicator, StyleSheet, SafeAreaView } from "react-native";

export default function RootLayout() {
  const router = useRouter();
  // const [loading, setLoading] = useState(true);
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     const { data, error } = await supabase.auth.getSession();
  //     if (data.session) {
  //       setIsAuthenticated(true);
  //       router.replace("/main/");
  //     } else {
  //       router.replace("/auth/login");
  //     }
  //     // setLoading(false);
  //   };

  //   checkAuth();
  // }, []);

  return (
    <Stack>
      <Stack.Screen name="auth" options={{ headerShown: false }} />
      <Stack.Screen name="main" options={{ headerShown: false }} />
    </Stack>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
