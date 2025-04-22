import React from "react";
import { View, Text, Button } from "react-native";
import { useRouter, Link } from "expo-router";
import { useChild } from "../../contexts/ChildContext";

export default function ChildDashboardScreen() {
  const router = useRouter();
  const { selectedChild } = useChild();

  return (
    <View style={{ flex: 1, justifyContent: "space-between", padding: 20 }}>
      <View>
        <Text style={{ fontSize: 24, marginTop: 20 }}>Child Dashboard</Text>

        {selectedChild ? (
          <Text style={{ fontSize: 18, marginTop: 10 }}>
            Hello, {selectedChild.name}!
          </Text>
        ) : (
          <Text style={{ fontSize: 18, marginTop: 10, color: "red" }}>
            No child selected.
          </Text>
        )}
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-around", marginBottom: 20 }}>
        <Link href="/" asChild>
          <Button title="Back" onPress={() => {}} />
        </Link>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-around", marginBottom: 20 }}>
        <Link href="/child" asChild>
          <Button title="Dashboard" onPress={() => {}} />
        </Link>
        <Link href="/child/tasks" asChild>
          <Button title="Tasks" onPress={() => {}} />
        </Link>
        <Link href="/child/rewards" asChild>
          <Button title="Rewards" onPress={() => {}} />
        </Link>
      </View>
    </View>
  );
}
