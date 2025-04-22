import React from "react";
import { View, Text, StyleSheet, Button, Alert, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../hooks/useAuth";

export default function ParentAddChildScreen() {
  const router = useRouter();
  const { parent, isLoading, login } = useAuth();

  const handleAddDefaultChild = async () => {
    if (!parent) {
      return Alert.alert("Error", "No parent is logged in");
    }

    try {
      const res = await fetch("https://be-star-step-app-dev.onrender.com/api/kids", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Default Child",
          age: 6,
          avatar: "https://example.com/default-avatar.png",
          parentID: parent._id,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || "Failed to create child");

      Alert.alert("Success", `Child "${data.name}" created!`);
      router.replace("/parent");
    } catch (err: any) {
      console.error("Add child error:", err);
      Alert.alert("Error", err.message);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add Child</Text>

      {!parent ? (
        <Button title="Log In First" onPress={login} />
      ) : (
        <>
          <Button title="Add Default Child" onPress={handleAddDefaultChild} />
          <View style={{ marginTop: 16 }}>
            <Button title="Back to Dashboard" onPress={() => router.push("/parent")} />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container:   { flex: 1, padding: 24, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  heading:     { fontSize: 24, fontWeight: "bold", marginBottom: 12 },
});