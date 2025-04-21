import { Slot } from 'expo-router';
import { Auth0Provider } from '@auth0/auth0-react';
import { AuthProvider } from '../hooks/useAuth';

console.log('Slot is:', Slot);
console.log('Auth0Provider is:', Auth0Provider);
console.log('AuthProvider is:', AuthProvider);

const { auth0Domain, auth0ClientId, auth0Audience } =
  Constants.expoConfig.extra;

const callbackUrl = `${window.location.origin}/parent/login`;

export default function RootLayout() {
  return (
    <Auth0Provider
      domain={auth0Domain}
      clientId={auth0ClientId}

      authorizationParams={{
        audience: auth0Audience,
        redirect_uri: callbackUrl,
      }}
      useRefreshTokens={true}
      cacheLocation="localstorage"
    >
      <AuthProvider>

        <Slot />
      </AuthProvider>
    </Auth0Provider>
  );
}