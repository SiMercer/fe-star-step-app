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
  redirectUri, // we’ll inject this from app.config.js
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
      redirectUri,              // will be https://starsteps.netlify.app/auth-callback.html
      extraParams: { audience: auth0Audience },
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;
      (async () => {
        try {
          // fetch user from Auth0
          const ui = await (
            await fetch(`https://${auth0Domain}/userinfo`, {
              headers: { Authorization: `Bearer ${access_token}` },
            })
          ).json();
          console.log("User Info:", ui);

          // register with your backend
          const br = await (
            await fetch(
              "https://be-star-step-app-dev.onrender.com/api/parents",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  auth0Id: ui.sub,
                  parentName: ui.name || "Unnamed Parent",
                }),
              }
            )
          ).json();
          console.log("Backend response:", br);

          if (!br._id) throw new Error(br.msg || "Registration failed");
          Alert.alert("Welcome", `Logged in as ${br.parentName}`);
        } catch (e) {
          console.error(e);
          Alert.alert("Error", e.message);
        }
      })();
    }
  }, [response]);

  return (
    <View>
      <Button
        title="Login"
        disabled={!request}
        onPress={() => promptAsync()}
      />
    </View>
  );
}
