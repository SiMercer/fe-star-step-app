import React from "react";
import { View, Text, Button, ScrollView } from "react-native";
import { Link } from "expo-router";
import { useAuth } from "../../hooks/useAuth";

export default function ParentDashboard() {
  const { parent } = useAuth();

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <Text style={{ fontSize: 26, marginBottom: 30, fontWeight: "bold" }}>
        Parent Dashboard
      </Text>

      {/* Display logged in parent */}
      {parent ? (
        <Text style={{ fontSize: 18, marginBottom: 20 }}>
          Logged in as: {parent.parentName}
        </Text>
      ) : (
        <Text style={{ fontSize: 18, marginBottom: 20, color: 'red' }}>
          You are not logged in
        </Text>
      )}

      <View style={{ marginBottom: 20, width: "100%" }}>
        <Link href="/" asChild>
          <Button title="Back" />
        </Link>
      </View>

      <View style={{ marginBottom: 20, width: "100%" }}>
        <Link href="/parent/add-child" asChild>
          <Button title="Add a Child" />
        </Link>
      </View>

      <View style={{ marginBottom: 20, width: "100%" }}>
        <Link href="/parent/add-task" asChild>
          <Button title="Add Task" />
        </Link>
      </View>

      <View style={{ marginBottom: 20, width: "100%" }}>
        <Link href="/parent/rewards" asChild>
          <Button title="Rewards" />
        </Link>
      </View>

    </ScrollView>
  );
}
