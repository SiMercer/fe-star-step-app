import React from "react";
import { View, Text, Button, ScrollView } from "react-native";
import { Link } from "expo-router";
import { useAuth } from "../../hooks/useAuth";

export default function ParentLoginScreen() {
  const { parent, login, isLoading } = useAuth();

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Parent Login</Text>

      <Button title={isLoading ? "Loading…" : "Log In"} onPress={login} disabled={isLoading} />

      <View style={{ marginTop: 30 }}>
        <Link href="/parent" asChild>
          <Button title="Go to Dashboard" />
        </Link>
      </View>
    </ScrollView>
  );
}