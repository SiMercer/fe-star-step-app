import * as WebBrowser from "expo-web-browser";
WebBrowser.maybeCompleteAuthSession();

import React from "react";
import { Slot } from "expo-router";
import { AuthProvider } from "../hooks/useAuth";
import { ChildProvider } from "../contexts/ChildContext";


export default function RootLayout() {
  return (
    <AuthProvider>
      <ChildProvider>
      <Slot />
      </ChildProvider>
    </AuthProvider>
  );
}