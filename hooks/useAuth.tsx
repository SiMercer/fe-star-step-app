import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import Constants from 'expo-constants';
import { useAuth0 } from '@auth0/auth0-react';

interface Parent {
  _id: string;
  parentName: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  isLoading: boolean;
  parent: Parent | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    isAuthenticated,
    loginWithRedirect,
    logout: auth0Logout,
    getAccessTokenSilently,
    user,
    isLoading: auth0Loading,
  } = useAuth0();

  const [parent, setParent] = useState<Parent | null>(null);
  const [loading, setLoading] = useState(true);

  const { auth0Audience } = Constants.expoConfig!.extra as Record<string, string>;

  useEffect(() => {
    const registerParent = async () => {
      if (isAuthenticated && user) {
        try {
          const token = await getAccessTokenSilently({ audience: auth0Audience });
          const res = await fetch(
            'https://be-star-step-app-dev.onrender.com/api/parents',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                auth0Id: user.sub,
                parentName: user.name || 'Unnamed Parent',
              }),
            }
          );
          if (!res.ok) throw new Error((await res.json()).msg || 'Registration failed');
          const data: Parent = await res.json();
          setParent(data);
        } catch (e) {
          console.error('Parent registration error:', e);
        }
      }
      setLoading(false);
    };

    registerParent();
  }, [isAuthenticated, user, getAccessTokenSilently, auth0Audience]);

  const value: AuthContextType = {
    isAuthenticated,
    login: () => loginWithRedirect(),
    logout: () =>
      auth0Logout({ returnTo: window.location.origin }),
    isLoading: auth0Loading || loading,
    parent,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
