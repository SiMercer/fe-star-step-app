import * as WebBrowser from "expo-web-browser";
WebBrowser.maybeCompleteAuthSession();

import React, { useEffect } from "react";
import { Slot } from "expo-router";
import { AuthProvider } from "../hooks/useAuth";
import { ChildProvider } from "../contexts/ChildContext";

import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";

// Keep splash screen visible while font loads
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Poppins: require("../assets/fonts/Poppins/Poppins-Bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <ChildProvider>
        <Slot />
      </ChildProvider>
    </AuthProvider>
  );
}
