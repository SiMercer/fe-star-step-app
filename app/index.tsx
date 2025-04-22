import React from "react";
import { ScrollView, View, Text, Button, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { useAuth } from "../hooks/useAuth";

export default function HomeScreen() {
  const { parent, isLoading, login, logout } = useAuth();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>StarSteps</Text>

      {isLoading ? (
        <Text>Loading…</Text>
      ) : parent ? (
        <Button title="Log Out" onPress={logout} />
      ) : (
        <Button title="Log In" onPress={login} />
      )}

      <View style={styles.navItem}>
        <Link href="/parent/login" asChild>
          <Button title="Parent Login" />
        </Link>
      </View>

      <View style={styles.navItem}>
        <Link href="/parent" asChild>
          <Button title="Parent Dashboard" />
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title:     { fontSize: 28, marginBottom: 20 },
  navItem:   { width: "100%", marginVertical: 8 },
});