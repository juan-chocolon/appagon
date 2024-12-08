import { Slot, Stack, useRouter } from "expo-router";
import { StyleSheet, SafeAreaView } from "react-native";
import { SupabaseProvider } from "./providers/supabase-provider";

export default function RootLayout() {
  const router = useRouter();


  return (
    <SupabaseProvider>
      <SafeAreaView>
        <Stack>
          <Stack.Screen name="auth" options={{ headerShown: false }} />
          <Stack.Screen name="main" options={{ headerShown: false }} />
        </Stack>
      </SafeAreaView>
    </SupabaseProvider>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
