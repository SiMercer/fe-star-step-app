import React from "react";
import { View, Text, Button, ScrollView } from "react-native";
import { Link } from "expo-router";

export default function ParentDashboard() {
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

      <View style={{ marginBottom: 20, width: "100%" }}>
        <Link href="/" asChild>
          <Button title="Back" />
        </Link>
      </View>

      <View style={{ marginBottom: 20, width: "100%" }}>
        <Link href="/parent/add-child" asChild>
          <Button title="Add Child" />
        </Link>
      </View>

      <View style={{ marginBottom: 20, width: "100%" }}>
        <Link href="/parent/tasks" asChild>
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
