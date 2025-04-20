import { useEffect } from "react";
import { Platform } from "react-native";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import * as SecureStore from "expo-secure-store";
import { authConfig } from "../authConfig";
import { useUser } from "../app/context/UserContext";

WebBrowser.maybeCompleteAuthSession();

export function useAuth() {
  const { token, setToken, user, setUser } = useUser();
  const useProxy = process.env.NODE_ENV !== "production";

  const discovery = AuthSession.useAutoDiscovery(`https://${authConfig.domain}`);

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

  const saveToken = async (accessToken: string) => {
    if (Platform.OS === "web") {
      localStorage.setItem("userToken", accessToken);
    } else {
      await SecureStore.setItemAsync("userToken", accessToken);
    }
  };

  const loadToken = async () => {
    if (Platform.OS === "web") {
      return localStorage.getItem("userToken");
    } else {
      return await SecureStore.getItemAsync("userToken");
    }
  };

  const login = () => {
    if (!request) return;
    promptAsync({ useProxy: authConfig.useProxy });
  };


  useEffect(() => {
    const init = async () => {
      try {
        const storedToken = await loadToken();
        if (storedToken) {
          setToken(storedToken);
        }
      } catch (err) {
        console.error("Error loading stored token:", err);
      }
    };
    init();
  }, []);


  useEffect(() => {
    if (response?.type === "success" && response.authentication?.accessToken) {
      const accessToken = response.authentication.accessToken;
      setToken(accessToken);
      saveToken(accessToken);
    }
  }, [response]);


  useEffect(() => {
    if (!token) return;

    const fetchAndSyncUser = async () => {
      try {

        const userRes = await fetch("https://be-star-step-app-dev.onrender.com/api/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!userRes.ok) throw new Error("Failed to fetch Auth0 user");
        const userInfo = await userRes.json();


        const parentRes = await fetch("https://be-star-step-app-dev.onrender.com/api/parents", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            auth0Id: userInfo.sub,
            parentName: userInfo.name || userInfo.nickname || "Unnamed",
          }),
        });

        if (!parentRes.ok) throw new Error("Failed to register parent");
        const parent = await parentRes.json();

        setUser(parent);
        console.log("Synced parent:", parent);
      } catch (err) {
        console.error("Error syncing parent user:", err);
      }
    };

    fetchAndSyncUser();
  }, [token]);

  return { login, token, user };
}
