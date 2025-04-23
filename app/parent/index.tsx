import React from "react";
import {
  ScrollView,
  View,
  Text,
  Button,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Link } from "expo-router";
import { useAuth } from "../../hooks/useAuth";

export default function ParentDashboard() {
  const { parent, isLoading, logout } = useAuth();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Parent Dashboard</Text>

      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : parent ? (
        <Text style={styles.subtitle}>
          Logged in as: {parent.parentName}
        </Text>
      ) : (
        <Text style={[styles.subtitle, { color: "red" }]}>
          You are not logged in
        </Text>
      )}

      <View style={styles.navItem}>
        <Link href="/" asChild>
          <Button title="Back Home" />
        </Link>
      </View>

      <View style={styles.navItem}>
        <Link href="/parent/add-child" asChild>
          <Button title="Add Child" />
        </Link>
      </View>

      <View style={styles.navItem}>
        <Link href="/parent/tasks" asChild>
          <Button title="Add Task" />
        </Link>
      </View>

      <View style={styles.navItem}>
        <Link href="/parent/rewards" asChild>
          <Button title="Rewards" />
        </Link>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#EBECFF",
  },
  title: {
    fontSize: 26,
    marginBottom: 30,
    fontWeight: "bold",
    color: "#7697F9",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 30,
  },
  navItem: {
    marginBottom: 20,
    width: "100%",
  },
  logoutButton: {
    backgroundColor: "#FFA1C6",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    marginTop: 30,
  },
  logoutText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
