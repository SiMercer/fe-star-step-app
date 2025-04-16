import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useRouter } from "expo-router";

export default function ParentTasksScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Tasks Title</Text>
      <Text style={styles.subtext}>
      ( form to add task )    
      </Text>

      <View style={styles.buttonGroup}>
        <Button title="Back to Dashboard" onPress={() => router.push("/parent")} />
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
