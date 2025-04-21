// app/parent/index.tsx
import React from "react";
import { View, Text, Button, ScrollView, ActivityIndicator } from "react-native";
import { Link } from "expo-router";
import { useAuth } from "../../hooks/useAuth";

export default function ParentDashboard() {
  const { parent, isLoading } = useAuth();

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <Text style={{ fontSize: 26, marginBottom: 20, fontWeight: "bold" }}>
        Parent Dashboard
      </Text>

      {/* 1) While we’re waiting on auth */}
      {isLoading && (
        <ActivityIndicator size="large" style={{ marginBottom: 20 }} />
      )}

      {/* 2) Once done, either show the parent’s name or an error */}
      {!isLoading && (
        parent ? (
          <Text style={{ fontSize: 18, marginBottom: 30 }}>
            Logged in as: {parent.parentName}
          </Text>
        ) : (
          <Text style={{ fontSize: 18, marginBottom: 30, color: "red" }}>
            You are not logged in
          </Text>
        )
      )}

      {/* Navigation */}
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
