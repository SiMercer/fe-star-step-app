import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useAuth0, User } from '@auth0/auth0-react';

interface Parent {
  _id: string;
  parentName: string;
}

interface AuthContextProps {
  parent: Parent | null;
  login: () => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    loginWithRedirect,
    logout: auth0Logout,
    isLoading: auth0Loading,
    isAuthenticated,
    user,
    getAccessTokenSilently,
  } = useAuth0();

  const [parent, setParent] = useState<Parent | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(auth0Loading);

  useEffect(() => {
    const registerParent = async () => {
      if (isAuthenticated && user) {
        setIsLoading(true);
        try {
          const token = await getAccessTokenSilently();
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
          const data = await res.json();
          if (res.ok) {
            setParent(data);
          } else {
            console.error('Registration error:', data.msg || data);
          }
        } catch (err) {
          console.error('Error registering parent:', err);
        } finally {
          setIsLoading(false);
        }
      }
    };

    registerParent();
  }, [isAuthenticated, user, getAccessTokenSilently]);

  const login = async () => {
    await loginWithRedirect();
  };

  const logout = () => {
    auth0Logout({ returnTo: window.location.origin });
    setParent(null);
  };

  return (
    <AuthContext.Provider value={{ parent, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook to access auth context
 */
export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
