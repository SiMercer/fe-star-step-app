import React, { createContext, useContext, useEffect, useState } from 'react';
import * as WebBrowser from 'expo-web-browser';
import {
  makeRedirectUri,
  ResponseType,
  useAuthRequest,
} from 'expo-auth-session';
import Constants from 'expo-constants';

// Complete any pending auth-session requests
WebBrowser.maybeCompleteAuthSession();

interface AuthContextData {
  parent: { _id: string; parentName: string } | null;
  login: () => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextData | null>(null);

export const AuthProvider: React.FC = ({ children }) => {
  const { auth0Domain, auth0ClientId, auth0Audience } =
    Constants.expoConfig?.extra as Record<string, string>;

  // Use your own callback page, disable expo proxy in production
  const redirectUri = makeRedirectUri({ useProxy: false });

  const [parent, setParent] = useState<AuthContextData['parent']>(null);
  const [isLoading, setIsLoading] = useState(true);

  const discovery = {
    authorizationEndpoint: `https://${auth0Domain}/authorize`,
    tokenEndpoint: `https://${auth0Domain}/oauth/token`,
    revocationEndpoint: `https://${auth0Domain}/oauth/revoke`,
  };

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: auth0ClientId,
      responseType: ResponseType.Token,
      scopes: ['openid', 'profile', 'email'],
      redirectUri,
      extraParams: { audience: auth0Audience },
    },
    discovery
  );

  useEffect(() => {
    const handleAuth = async () => {
      if (response?.type === 'success') {
        const token = response.params.access_token;
        try {
          // Fetch Auth0 user profile
          const uiRes = await fetch(`https://${auth0Domain}/userinfo`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const ui = await uiRes.json();

          // Register or retrieve parent from back end
          const apiRes = await fetch(
            'https://be-star-step-app-dev.onrender.com/api/parents',
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                auth0Id: ui.sub,
                parentName: ui.name,
              }),
            }
          );
          const pd = await apiRes.json();
          if (!apiRes.ok) throw new Error(pd.msg || 'Registration failed');
          setParent(pd);
        } catch (e) {
          console.error('Auth error', e);
        }
      }
      setIsLoading(false);
    };
    handleAuth();
  }, [response]);

  const login = async () => {
    setIsLoading(true);
    await promptAsync({ useProxy: false, showInRecents: true });
  };

  const logout = () => {
    setParent(null);
  };

  return (
    <AuthContext.Provider value={{ parent, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
