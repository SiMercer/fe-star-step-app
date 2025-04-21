import React, {useEffect} from 'react';
import {Button, View, Alert} from 'react-native';
import Constants from 'expo-constants';
import {useAuthRequest, ResponseType} from 'expo-auth-session';

const { auth0Domain, auth0ClientId, auth0Audience, redirectUri } =
  Constants.expoConfig.extra;

export default function LoginScreen() {
  const [request, response, promptAsync] = useAuthRequest(
    { clientId: auth0ClientId,
      responseType: ResponseType.Token,
      scopes: ['openid','profile','email'],
      redirectUri,
      extraParams: { audience: auth0Audience }
    },
    {
      authorizationEndpoint: `https://${auth0Domain}/authorize`,
      tokenEndpoint: `https://${auth0Domain}/oauth/token`,
      revocationEndpoint: `https://${auth0Domain}/oauth/revoke`,
    }
  );

  useEffect(() => {
    console.log('Auth response:', response);
    // …rest of your effect to fetch userinfo & backend…
  }, [response]);

  return (
    <View>
      <Button
        title="Login"
        disabled={!request}
        onPress={async () => {
          console.log('Calling promptAsync()');
          const result = await promptAsync();
          console.log('promptAsync result:', result);
        }}
      />
    </View>
  );
}