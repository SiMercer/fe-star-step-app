import React, { useEffect } from 'react';
import { Button, View, Alert } from 'react-native';
import Constants from 'expo-constants';
import {
  useAuthRequest,
  ResponseType,
} from 'expo-auth-session';

const {
  auth0Domain,
  auth0ClientId,
  auth0Audience,
  redirectUri,    // should be "https://starsteps.netlify.app/auth-callback.html"
} = Constants.expoConfig.extra;

const discovery = {
  authorizationEndpoint: `https://${auth0Domain}/authorize`,
  tokenEndpoint:       `https://${auth0Domain}/oauth/token`,
  revocationEndpoint:  `https://${auth0Domain}/oauth/revoke`,
};

export default function LoginScreen() {
  // 2) Pass `{ useProxy: false }` as the 3rd arg to useAuthRequest
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId:     auth0ClientId,
      responseType: ResponseType.Token,
      scopes:       ['openid', 'profile', 'email'],
      redirectUri,               // your static callback.html
      extraParams: { audience: auth0Audience },
    },
    discovery,
    { useProxy: false }        // ← important for direct‑web flow
  );

  useEffect(() => {
    console.log('Auth response:', response);
    if (response?.type === 'success') {
      const { access_token } = response.params;
      (async () => {
        try {
          const userInfoRes = await fetch(`https://${auth0Domain}/userinfo`, {
            headers: { Authorization: `Bearer ${access_token}` },
          });
          const userInfo = await userInfoRes.json();
          console.log('UserInfo:', userInfo);

          const backendRes = await fetch(
            'https://be-star-step-app-dev.onrender.com/api/parents',
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                auth0Id:     userInfo.sub,
                parentName: userInfo.name ?? 'Unnamed Parent',
              }),
            }
          );
          const result = await backendRes.json();
          console.log('Backend response:', result);

          if (!backendRes.ok) {
            throw new Error(result.msg || 'Registration failed');
          }
          Alert.alert('Welcome', `Logged in as ${result.parentName}`);
        } catch (err) {
          console.error('Login/register error:', err);
          Alert.alert('Error', err.message);
        }
      })();
    }
  }, [response]);

  return (
    <View style={{ flex:1, justifyContent:'center', padding:16 }}>
      <Button
        title="Login"
        disabled={!request}
        onPress={async () => {
          console.log('Calling promptAsync()');
          // also explicitly disable proxy here
          const result = await promptAsync({ useProxy: false });
          console.log('promptAsync result:', result);
        }}
      />
    </View>
  );
}