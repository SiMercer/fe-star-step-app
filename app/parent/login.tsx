import React, { useEffect } from "react";
import { Button, View, Alert } from "react-native";
import Constants from "expo-constants";
import {
  useAuthRequest,
  makeRedirectUri,
  ResponseType,
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

        try {
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

          const result = await res.json();
          console.log("Registration Response:", result);

          if (!res.ok) throw new Error(result.msg || "Failed to register");

          Alert.alert("Welcome", `Logged in as ${result.parentName}`);
        } catch (err) {
          console.error("Registration/Login failed:", err);
          Alert.alert("Error", err.message);
        }
      }
    };

    handleAuth();
  }, [response]);

  return (
    <View>
<Button
  title="Login"
  onPress={async () => {
    console.log("Prompting login...");
    const result = await promptAsync();
    console.log("Prompt result:", result);
  }}
  disabled={!request}
/>
    </View>
  );
}
