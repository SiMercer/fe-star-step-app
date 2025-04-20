import React from "react";
import { Button, View, Alert } from "react-native";
import Constants from "expo-constants";
import { startAsync } from "expo-auth-session/build/AuthSession"; // ✅ direct path import

const {
  auth0Domain,
  auth0ClientId,
  auth0Audience,
  redirectUri,
} = Constants.expoConfig.extra;

export default function LoginScreen() {
  const handleLogin = async () => {
    const authUrl = `https://${auth0Domain}/authorize?client_id=${auth0ClientId}` +
      `&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&scope=openid%20profile%20email&audience=${auth0Audience}`;

    try {
      const result = await startAsync({ authUrl });
      console.log("Auth result:", result);

      if (result.type === "success") {
        const accessToken = result.params.access_token;

        const userInfoRes = await fetch(`https://${auth0Domain}/userinfo`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const userInfo = await userInfoRes.json();
        console.log("User info:", userInfo);

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

        if (!registerRes.ok) throw new Error("Failed to register parent");

        const parent = await registerRes.json();
        console.log("Parent registered:", parent);
        Alert.alert("Welcome", `Logged in as ${parent.parentName}`);
      }
    } catch (err) {
      console.error("Login error:", err);
      Alert.alert("Login failed", err.message);
    }
  };

  return (
    <View>
      <Button title="Log In" onPress={handleLogin} />
    </View>
  );
}
