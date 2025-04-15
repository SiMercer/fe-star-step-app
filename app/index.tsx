import React from "react";
import { View, Text, Button, ScrollView } from "react-native";
import { useAuth } from "../hooks/useAuth";

export default function HomeScreen() {
  const { login, token, user } = useAuth();

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
      <Text style={{ fontSize: 28, marginBottom: 20 }}>Welcome to StarSteps 🚀</Text>

      <Button title="LOGIN WITH AUTH0" onPress={login} />

      <Text style={{ marginTop: 20, fontWeight: "bold" }}>Token:</Text>
      <Text selectable style={{ marginVertical: 10, fontSize: 12 }}>
        {token ? token : "No token yet"}
      </Text>

      <Text style={{ marginTop: 20, fontWeight: "bold" }}>User Info:</Text>
      <Text selectable style={{ fontSize: 12 }}>
        {user ? JSON.stringify(user, null, 2) : "No user info yet"}
      </Text>
    </ScrollView>
  );
}
