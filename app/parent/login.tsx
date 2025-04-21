import React, { useEffect } from "react";
import { Button, View, Alert } from "react-native";
import Constants from "expo-constants";
import {
  useAuthRequest,
  ResponseType,
} from "expo-auth-session";

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
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: auth0ClientId,
      responseType: ResponseType.Token,
      scopes: ["openid", "profile", "email"],
      redirectUri,               // now points at https://starsteps.netlify.app
      extraParams: { audience: auth0Audience },
    },
    discovery
  );

  useEffect(() => {
    async function handleAuth() {
      if (response?.type === "success") {
        const { access_token } = response.params;
        try {
          const userInfoRes = await fetch(`https://${auth0Domain}/userinfo`, {
            headers: { Authorization: `Bearer ${access_token}` },
          });
          const userInfo = await userInfoRes.json();

          const backendRes = await fetch(
            "https://be-star-step-app-dev.onrender.com/api/parents",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                auth0Id: userInfo.sub,
                parentName: userInfo.name || "Unnamed Parent",
              }),
            }
          );
          const result = await backendRes.json();

          if (!backendRes.ok) {
            throw new Error(result.msg || "Failed to register parent");
          }
          Alert.alert("Welcome", `Logged in as ${result.parentName}`);
        } catch (err) {
          console.error("Login/register error:", err);
          Alert.alert("Error", err.message);
        }
      }
    }
    handleAuth();
  }, [response]);

  return (
    <View>
      <Button
        title="Login"
        disabled={!request}
        onPress={() => {
          promptAsync();
        }}
      />
    </View>
  );
}
