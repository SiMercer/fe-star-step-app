import { useState, useEffect } from "react";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import Constants from "expo-constants";
import { authConfig } from "../authConfig";
import { fetchUserInfo } from "../utils/userInfo";

WebBrowser.maybeCompleteAuthSession();

export function useAuth() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const discovery = AuthSession.useAutoDiscovery(
    `https://${authConfig.domain}`
  );

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: authConfig.clientId,
      scopes: ["openid", "profile", "email"],
      redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
      responseType: AuthSession.ResponseType.Token,
    },
    discovery
  );

  const login = () => {
    if (!request) return;
    promptAsync({ useProxy: true });
  };

  useEffect(() => {
    if (response?.type === "success" && response.authentication?.accessToken) {
      setToken(response.authentication.accessToken);
    }
  }, [response]);

  useEffect(() => {
    if (!token) return;
    const loadUserInfo = async () => {
      const info = await fetchUserInfo(token);
      setUser(info);
    };
    loadUserInfo();
  }, [token]);

  return { login, token, user };
}
