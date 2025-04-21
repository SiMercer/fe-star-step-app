
import React, { useEffect } from 'react';
import { Button, View, ActivityIndicator, Alert } from 'react-native';
import { useAuth0 } from '@auth0/auth0-react';

export default function ParentLogin() {
  const {
    loginWithRedirect,
    isAuthenticated,
    user,
    getAccessTokenSilently,
    error,
    isLoading,
  } = useAuth0();


  useEffect(() => {
    if (isAuthenticated && user) {
      (async () => {
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
          const body = await res.json();
          if (!res.ok) throw new Error(body.msg || 'Registration failed');
          Alert.alert('Welcome', `Logged in as ${body.parentName}`);
        } catch (e) {
          console.error(e);
          Alert.alert('Error', e.message);
        }
      })();
    }
  }, [isAuthenticated, user]);

  if (isLoading) {
    return (
      <View style={{flex:1,justifyContent:'center'}}>
        <ActivityIndicator />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{flex:1,justifyContent:'center',padding:16}}>
        <Button title="Retry Login" onPress={() => loginWithRedirect()} />
        <Alert title="Error" message={error.message} />
      </View>
    );
  }

  if (!isAuthenticated) {
    return (
      <View style={{flex:1,justifyContent:'center',padding:16}}>
        <Button
          title="Log in / Register"
          onPress={() => loginWithRedirect()}
        />
      </View>
    );
  }

  return (
    <View style={{flex:1,justifyContent:'center',padding:16}}>
      <Button title="You’re logged in!" onPress={() => {}} />
    </View>
  );
}
