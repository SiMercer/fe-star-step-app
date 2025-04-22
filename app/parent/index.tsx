import React from "react";
import { ScrollView, View, Text, Button, ActivityIndicator } from "react-native";
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

      <Text style={{ fontSize: 26, marginBottom: 30, fontWeight: "bold" }}>
        Parent Dashboard
      </Text>


      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : parent ? (
        <Text style={{ fontSize: 18, marginBottom: 30 }}>
          Logged in as: {parent.parentName}
        </Text>
      ) : (
        <Text style={{ fontSize: 18, marginBottom: 30, color: "red" }}>
          You are not logged in
        </Text>
      )}


      <View style={{ marginBottom: 20, width: "100%" }}>
        <Link href="/" asChild>
          <Button title="Back Home" />
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
