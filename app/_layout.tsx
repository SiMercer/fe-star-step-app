import * as WebBrowser from "expo-web-browser";
WebBrowser.maybeCompleteAuthSession();

import React from "react";
import { Slot } from "expo-router";
import { AuthProvider } from "../hooks/useAuth";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}