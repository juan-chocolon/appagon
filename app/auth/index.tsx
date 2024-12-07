import React, { useEffect } from "react";
import { useRouter } from "expo-router";

export default function AuthIndex() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the login screen by default
    router.replace("/auth/login");
  }, [router]);

  return null; // No UI needed as this is a redirect-only component
}
