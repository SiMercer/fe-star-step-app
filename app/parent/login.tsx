import React from 'react';
import { View, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { useAuth } from '../../hooks/useAuth';

export default function ParentLogin() {
  const { login, isLoading } = useAuth();

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <Button title="Log In" onPress={login} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
