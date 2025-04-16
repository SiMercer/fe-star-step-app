import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useRouter } from "expo-router";

export default function ParentTasksScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Register Title</Text>
      <Text style={styles.subtext}>
      ( form to register )    
      </Text>

      <View style={styles.buttonGroup}>
        <Button title="Back" onPress={() => router.push("/")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtext: {
    fontSize: 16,
    marginTop: 12,
    textAlign: "center",
  },
  buttonGroup: {
    marginTop: 32,
    gap: 16,
  },
});
