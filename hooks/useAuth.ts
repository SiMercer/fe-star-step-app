import { useState, useEffect } from "react";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import Constants from "expo-constants";
import { authConfig } from "../authConfig";
import { useUser } from "../app/context/UserContext";

WebBrowser.maybeCompleteAuthSession();

export function useAuth() {
  const [token, setToken] = useState<string | null>(null);
  const { user, setUser } = useUser();
  const useProxy = process.env.NODE_ENV !== "production";

  const discovery = AuthSession.useAutoDiscovery(
    `https://${authConfig.domain}`
  );

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: authConfig.clientId,
      scopes: ["openid", "profile", "email"],
      redirectUri: AuthSession.makeRedirectUri({ useProxy }),
      responseType: AuthSession.ResponseType.Token,
      extraParams: {
        audience: authConfig.audience,
      },
    },
    discovery
  );



  const login = () => {
    console.log("Auth0 domain:", authConfig.domain);

    if (!request) return;
    promptAsync({ useProxy: authConfig.useProxy });
  };

  useEffect(() => {
    if (response?.type === "success" && response.authentication?.accessToken) {
      setToken(response.authentication.accessToken);
    }
  }, [response]);

  useEffect(() => {
    if (!token) return;

    const fetchUserFromAPI = async () => {
      try {
        const res = await fetch("https://be-star-step-app-1.onrender.com/api/user/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch user");

        const data = await res.json();
        setUser(data);
        console.log("User from backend:", data);
      } catch (err) {
        console.error("Error fetching user from backend:", err);
      }
    };

    fetchUserFromAPI();
  }, [token]);

  return { login, token, user };
}
