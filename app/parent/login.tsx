import React from "react";
import { Button, View } from "react-native";
import { startAsync } from "expo-auth-session"; // ✅ fixed import
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
      const result = await startAsync({ authUrl }); // ✅ direct call
      console.log("Auth result:", result);
      // TODO: store access token, fetch user profile, etc.
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
