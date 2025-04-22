import * as WebBrowser from 'expo-web-browser';
WebBrowser.maybeCompleteAuthSession();

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import Constants from 'expo-constants';
import {
  useAuthRequest,
  makeRedirectUri,
  ResponseType,
} from 'expo-auth-session';

interface Parent {
  _id: string;
  parentName: string;
}

interface AuthContextType {
  parent: Parent | null;
  isLoading: boolean;
  login: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  parent: null,
  isLoading: false,
  login: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [parent, setParent] = useState<Parent | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    auth0Domain,
    auth0ClientId,
    auth0Audience,
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
      scopes: ['openid', 'profile', 'email'],
      redirectUri: makeRedirectUri({ useProxy: true }),
      extraParams: { audience: auth0Audience },
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === 'success') {
      const { access_token } = response.params;
      (async () => {
        try {
          setIsLoading(true);
          // fetch user info from Auth0
          const userInfoRes = await fetch(`https://${auth0Domain}/userinfo`, {
            headers: { Authorization: `Bearer ${access_token}` },
          });
          const userInfo = await userInfoRes.json();

          // register or fetch parent in your backend
          const res = await fetch(
            'https://be-star-step-app-dev.onrender.com/api/parents',
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                auth0Id: userInfo.sub,
                parentName: userInfo.name || 'Unnamed Parent',
              }),
            }
          );
          const data = await res.json();
          if (!res.ok) throw new Error(data.msg || 'Registration failed');
          setParent(data);
        } catch (err) {
          console.error('Auth/register error:', err);
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [response]);

  const login = async () => {
    setIsLoading(true);
    await promptAsync();
  };

  return (
    <AuthContext.Provider value={{ parent, isLoading, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
