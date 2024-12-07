import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import { supabase } from "../initSupabase";

export default function LandingPage() {
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        router.replace("/main");
        console.log("landed in main");
        console.log(data);
      } else {
        router.replace("/auth");
        console.log("landed in auth");
        console.log(data);
      }
    };

    checkSession();
  }, []);

  return null;
}
