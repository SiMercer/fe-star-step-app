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
    console.log("Auth0 domain:", authConfig.domain);
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
