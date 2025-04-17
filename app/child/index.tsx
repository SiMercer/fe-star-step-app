import React from "react";
import { View, Text, Button, Image } from "react-native";
import { useRouter, Link } from "expo-router";

export default function ChildDashboardScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "space-between", padding: 20 }}>
      <View
        className="headerForKidDashboard"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: "51px",
        }}
      >
        <View
          style={{ display: "flex", width: "30%", alignItems: "flex-start" }}
        >
          <Image
            source={require("../../assets/images/react-logo.png")}
            style={{ width: 100, height: 100 }}
            resizeMode="contain"
          />
        </View>
        <Text style={{ fontSize: 24, marginTop: 20, width: "70%" }}>
          Child Dashboard
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginBottom: 20,
        }}
      >
        <Link href="/" asChild>
          <Button title="Back" onPress={() => {}} />
        </Link>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginBottom: 20,
        }}
      >
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
