import React, { useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { useAuth } from '../../hooks/useAuth';

export default function ParentLogin() {
  const { login, isLoading, parent } = useAuth();


  useEffect(() => {
    if (!isLoading && !parent) {
      login();
    }
  }, [isLoading, parent]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});