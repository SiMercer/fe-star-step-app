import React, { useEffect } from 'react';
import { View, Button, Text, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../hooks/useAuth';

export default function LoginScreen() {
  const { login, isLoading, parent } = useAuth();
  const router = useRouter();

  // Once logged in, navigate to dashboard
  useEffect(() => {
    if (parent) {
      router.replace('/parent');
    }
  }, [parent]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
      }}
    >
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <Button title="Log In / Register" onPress={login} />
      )}

      <View style={{ marginTop: 20 }}>
        {parent ? (
          <Text>Logged in as: {parent.parentName}</Text>
        ) : (
          <Text>You are not logged in</Text>
        )}
      </View>
    </View>
  );
}
