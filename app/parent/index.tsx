import React from "react";
import { View, Text, Button, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import { Link } from "expo-router";
import { useAuth } from "../../hooks/useAuth";

export default function ParentDashboard() {
  const { isLoading, isAuthenticated, parent } = useAuth();

  return (
    <ScrollView contentContainerStyle={styles.container}>

      {isLoading ? (
        <ActivityIndicator size="large" style={styles.greeting} />
      ) : (

        <Text style={styles.greeting}>
          {isAuthenticated && parent
            ? (
              <>
                You are logged in as{" "}
                <Text style={styles.name}>{parent.parentName}</Text>
              </>
            )
            : "You are not logged in"}
        </Text>
      )}

      <Text style={styles.title}>Parent Dashboard</Text>

      <View style={styles.buttonWrapper}>
        <Link href="/" asChild>
          <Button title="Back" />
        </Link>
      </View>

      <View style={styles.buttonWrapper}>
        <Link href="/parent/add-child" asChild>
          <Button title="Add a Child" />
        </Link>
      </View>

      <View style={styles.buttonWrapper}>
        <Link href="/parent/add-task" asChild>
          <Button title="Add Task" />
        </Link>
      </View>

      <View style={styles.buttonWrapper}>
        <Link href="/parent/rewards" asChild>
          <Button title="Rewards" />
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  greeting: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  name: {
    fontWeight: "bold",
  },
  title: {
    fontSize: 26,
    marginBottom: 30,
    fontWeight: "bold",
  },
  buttonWrapper: {
    marginBottom: 20,
    width: "100%",
  },
});
