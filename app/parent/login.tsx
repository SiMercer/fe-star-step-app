import React from "react";
import { View, Text, Button, ScrollView } from "react-native";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "expo-router";
import Constants from "expo-constants";

console.log("Auth0 domain:", Constants.expoConfig.extra.EXPO_PUBLIC_AUTH0_DOMAIN);

const domain = Constants.expoConfig.extra.auth0Domain;

export default function ParentLoginScreen() {
  const { login, token, user } = useAuth();

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Parent Login</Text>
      <View style={{ marginBottom: 30 }}>
        <Link href="/" asChild>
          <Button title="Back" />
        </Link>
        </View>

      <Button title="Login with Auth0" onPress={login} />

      <Text style={{ marginTop: 20, fontWeight: "bold" }}>Token:</Text>
      <Text selectable style={{ marginVertical: 10, fontSize: 12 }}>
        {token ? token : "No token yet"}
      </Text>

      <Text style={{ marginTop: 20, fontWeight: "bold" }}>User Info:</Text>
      <Text selectable style={{ fontSize: 12 }}>
        {user ? JSON.stringify(user, null, 2) : "No user info yet"}
      </Text>

      <View style={{ marginTop: 30 }}>


        <Link href="/parent" asChild>
          <Button title="parent dashboard" />
        </Link>
      </View>

    </ScrollView>
  );
}
