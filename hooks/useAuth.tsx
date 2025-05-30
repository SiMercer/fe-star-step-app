import * as WebBrowser from "expo-web-browser";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import Constants from "expo-constants";
import {
  useAuthRequest,
  makeRedirectUri,
  ResponseType,
} from "expo-auth-session";
import { getItem, saveItem, deleteItem } from "@/utils/storage";

interface Parent {
  _id: string;
  parentName: string;
}

interface AuthContextType {
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => void;
  parent: Parent | null;
  setParent: (parent: Parent | null) => void;
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    EXPO_PUBLIC_AUTH0_DOMAIN: auth0Domain,
    EXPO_PUBLIC_AUTH0_CLIENT_ID: auth0ClientId,
    EXPO_PUBLIC_AUTH0_AUDIENCE: auth0Audience,
    USE_FAKE_AUTH,
  } = Constants.expoConfig!.extra as Record<string, string>;

  const discovery = {
    authorizationEndpoint: `https://${auth0Domain}/authorize`,
    tokenEndpoint: `https://${auth0Domain}/oauth/token`,
    revocationEndpoint: `https://${auth0Domain}/oauth/revoke`,
  };

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: auth0ClientId,
      responseType: ResponseType.Token,
      scopes: ["openid", "profile", "email"],
      redirectUri: makeRedirectUri({ useProxy: true }),
      extraParams: { audience: auth0Audience },
    },
    discovery
  );

  const [isLoading, setIsLoading] = useState(true);
  const [parent, setParent] = useState<Parent | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const loadStoredSession = async () => {
      const storedToken = await getItem("accessToken");
      const storedParent = await getItem("parent");

      if (storedToken && storedParent) {
        setAccessToken(storedToken);
        setParent(JSON.parse(storedParent));
        setIsLoading(false);
        return;
      }

      if (USE_FAKE_AUTH === "true") {
        setParent({ _id: "local-test-id", parentName: "Local Test Parent" });
        setIsLoading(false);
        return;
      }

      if (response?.type === "success") {
        const token = response.params.access_token!;
        setAccessToken(token);

        try {
          const uiRes = await fetch(`https://${auth0Domain}/userinfo`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const ui = await uiRes.json();

          const apiRes = await fetch(
            "https://be-star-step-app-dev.onrender.com/api/parents",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                auth0Id: ui.sub,
                parentName: ui.name || "Unnamed Parent",
              }),
            }
          );

          const data = await apiRes.json();
          if (!apiRes.ok) throw new Error(data.msg);

          setParent(data);
          await saveItem("accessToken", token);
          await saveItem("parent", JSON.stringify(data));
        } catch (err) {
          console.error("Login/register error:", err);
          setParent(null);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    loadStoredSession();
  }, [response, USE_FAKE_AUTH]);

  const login = async () => {
    if (USE_FAKE_AUTH === "true") {
      setParent({ _id: "local-test-id", parentName: "Local Test Parent" });
      setIsLoading(false);
    } else {
      setIsLoading(true);
      await promptAsync();
    }
  };

  const logout = () => {
    setParent(null);
    setAccessToken(null);
    deleteItem("accessToken");
    deleteItem("parent");

    if (USE_FAKE_AUTH !== "true") {
      const returnTo = encodeURIComponent(makeRedirectUri({ useProxy: true }));
      const logoutUrl =
        `https://${auth0Domain}/v2/logout?client_id=${auth0ClientId}` +
        `&returnTo=${returnTo}`;

      if (typeof window !== "undefined") {
        window.location.assign(logoutUrl);
      } else {
        WebBrowser.openBrowserAsync(logoutUrl);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{ isLoading, login, logout, parent, setParent, accessToken, setAccessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
