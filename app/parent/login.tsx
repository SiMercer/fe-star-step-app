import React from "react";
import { Button, View, Alert } from "react-native";
import * as AuthSession from "expo-auth-session";
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
      const result = await AuthSession.startAsync({ authUrl });

      if (result.type === "success") {
        const accessToken = result.params.access_token;

        // Fetch user profile from Auth0
        const userInfoRes = await fetch(`https://${auth0Domain}/userinfo`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const userInfo = await userInfoRes.json();
        console.log("UserInfo:", userInfo);

        // Register or fetch parent from MongoDB backend
        const registerRes = await fetch("https://be-star-step-app-dev.onrender.com/api/parents", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            auth0Id: userInfo.sub,
            parentName: userInfo.name || "Unnamed Parent",
          }),
        });

        if (!registerRes.ok) {
          throw new Error("Failed to register parent");
        }

        const parent = await registerRes.json();
        console.log("Registered Parent:", parent);
        Alert.alert("Welcome", `Logged in as ${parent.parentName}`);
      } else {
        console.warn("Auth session not successful:", result);
      }
    } catch (err) {
      console.error("Login error:", err);
      Alert.alert("Error", "Login failed. Please try again.");
    }
  };

  return (
    <View>
      <Button title="Log In" onPress={handleLogin} />
    </View>
  );
}