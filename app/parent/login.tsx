import React, { useEffect } from "react";
import { Button, View, Alert } from "react-native";
import Constants from "expo-constants";
import {
  useAuthRequest,
  makeRedirectUri,
  ResponseType,
  exchangeCodeAsync,
  fetchUserInfoAsync,
} from "expo-auth-session";

const {
  auth0Domain,
  auth0ClientId,
  auth0Audience,
} = Constants.expoConfig.extra;

const discovery = {
  authorizationEndpoint: `https://${auth0Domain}/authorize`,
  tokenEndpoint: `https://${auth0Domain}/oauth/token`,
  revocationEndpoint: `https://${auth0Domain}/oauth/revoke`,
};

export default function LoginScreen() {
  const redirectUri = makeRedirectUri({
    useProxy: true,
  });

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: auth0ClientId,
      responseType: ResponseType.Token,
      scopes: ["openid", "profile", "email"],
      redirectUri,
      extraParams: {
        audience: auth0Audience,
      },
    },
    discovery
  );

  useEffect(() => {
    const handleAuth = async () => {
      if (response?.type === "success") {
        const { access_token } = response.params;

        const userInfoRes = await fetch(`https://${auth0Domain}/userinfo`, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });

        const userInfo = await userInfoRes.json();
        console.log("User Info:", userInfo);

        const res = await fetch("https://be-star-step-app-dev.onrender.com/api/parents", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            auth0Id: userInfo.sub,
            parentName: userInfo.name || "Unnamed Parent",
          }),
        });

        if (!res.ok) throw new Error("Failed to register user");
        const parent = await res.json();
        Alert.alert("Welcome", `Logged in as ${parent.parentName}`);
      }
    };

    handleAuth();
  }, [response]);

  return (
    <View>
      <Button
        title="Log In"
        disabled={!request}
        onPress={() => {
          promptAsync();
        }}
      />
    </View>
  );
}
