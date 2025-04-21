import React, { useEffect } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const { isLoading, isAuthenticated, login } = useAuth();
  const router = useRouter();
  


  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace('/parent');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Parent Login</Text>
      <Button
  title={isAuthenticated ? "Already logged in" : "Log In"}
  onPress={() => {
    if (!isAuthenticated) login();
  }}
  disabled={isAuthenticated}
/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  header: { fontSize: 24, marginBottom: 16 },
});
