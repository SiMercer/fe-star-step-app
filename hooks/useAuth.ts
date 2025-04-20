// ✅ Refactored useAuth.ts using Expo AuthSession, user context and MongoDB sync
import React, { createContext, useContext, useEffect, useState } from "react";
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

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const redirectUri = makeRedirectUri({ useProxy: true });

  const [parent, setParent] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

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
    {
      authorizationEndpoint: `https://${auth0Domain}/authorize`,
      tokenEndpoint: `https://${auth0Domain}/oauth/token`,
      revocationEndpoint: `https://${auth0Domain}/oauth/revoke`,
    }
  );

  useEffect(() => {
    const handleAuth = async () => {
      if (response?.type === "success") {
        const token = response.params.access_token;
        setAccessToken(token);

        const userRes = await fetch(`https://${auth0Domain}/userinfo`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userInfo = await userRes.json();
        const registerRes = await fetch("https://be-star-step-app-dev.onrender.com/api/parents", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            auth0Id: userInfo.sub,
            parentName: userInfo.name || "Unnamed Parent",
          }),
        });

        const parentData = await registerRes.json();
        setParent(parentData);
      }
    };
    handleAuth();
  }, [response]);

  return (
    <AuthContext.Provider value={{ parent, promptLogin: promptAsync, isLoading: !response && !parent }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
