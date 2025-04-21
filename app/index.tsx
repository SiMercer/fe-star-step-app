// import * as WebBrowser from 'expo-web-browser';

// WebBrowser.maybeCompleteAuthSession();

import React from 'react';
import Constants from 'expo-constants';
import { Auth0Provider } from '@auth0/auth0-react';
import { ScrollView, View, Text, Button } from 'react-native';
import { Link } from 'expo-router';

const {
  auth0Domain,
  auth0ClientId,
  auth0Audience,
} = Constants.expoConfig.extra;


const redirectUri = window.location.origin + '/parent/login';

export default function HomeScreen() {
  return (
    <Auth0Provider
      domain={auth0Domain}
      clientId={auth0ClientId}
      audience={auth0Audience}
      redirectUri={redirectUri}
      useRefreshTokens={true}
      cacheLocation="localstorage"
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
        }}
      >
        <Text style={{ fontSize: 28, marginBottom: 20 }}>StarSteps</Text>

        <View style={{ marginBottom: 20, width: '100%' }}>
          <Link href="/child" asChild>
            <Button title="Child Dashboard" />
          </Link>
        </View>

        <View style={{ marginBottom: 20, width: '100%' }}>
          <Link href="/parent/login" asChild>
            <Button title="Parent Login" />
          </Link>
        </View>

        <View style={{ width: '100%' }}>
          <Link href="/parent/register" asChild>
            <Button title="Register" />
          </Link>
        </View>
      </ScrollView>
    </Auth0Provider>
  );
}