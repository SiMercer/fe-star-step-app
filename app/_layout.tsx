import * as WebBrowser from 'expo-web-browser';
WebBrowser.maybeCompleteAuthSession();

import React from 'react';
import { Slot } from 'expo-router';
import Constants from 'expo-constants';
import { Auth0Provider } from '@auth0/auth0-react';
import { AuthProvider } from '../hooks/useAuth';

const { auth0Domain, auth0ClientId, auth0Audience } =
  Constants.expoConfig!.extra as Record<string, string>;


const redirectUri = `${window.location.origin}/parent/login`;

export default function RootLayout() {
  return (
    <Auth0Provider
      domain={auth0Domain}
      clientId={auth0ClientId}
      authorizationParams={{
        audience: auth0Audience,
        redirect_uri: redirectUri,
      }}
      useRefreshTokens
      cacheLocation="localstorage"
    >
      <AuthProvider>
        <Slot />
      </AuthProvider>
    </Auth0Provider>
  );
}