import React from "react";
import { Button, View } from "react-native";
import * as AuthSession from "expo-auth-session"; // ✅ correct import style
import Constants from "expo-constants";

const {
  auth0Domain,
  auth0ClientId,
  auth0Audience,
  redirectUri,
} = Constants.expoConfig.extra;

const discovery = {
  authorizationEndpoint: `https://${auth0Domain}/authorize`,
  tokenEndpoint: `https://${auth0Domain}/oauth/token`,
  revocationEndpoint: `https://${auth0Domain}/oauth/revoke`,
};

export default function LoginScreen() {
  const handleLogin = async () => {
    const authUrl = `https://${auth0Domain}/authorize?client_id=${auth0ClientId}` +
      `&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&scope=openid%20profile%20email&audience=${auth0Audience}`;

    try {
      const result = await AuthSession.startAsync({ authUrl }); // ✅ works with this import
      console.log("Auth result:", result);
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <View>
      <Button title="Log In" onPress={handleLogin} />
    </View>
  );
}
