import * as WebBrowser from 'expo-web-browser';

window.addEventListener('message', (e) => {
  console.log('🔥 Got window message:', e.data, 'from', e.origin);
});

WebBrowser.maybeCompleteAuthSession();

import React from "react";
import { View, Text, Button, ScrollView } from "react-native";
import { Link } from "expo-router";

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
      <Text style={{ fontSize: 28, marginBottom: 20 }}>StarSteps</Text>

      <View style={{ marginBottom: 20, width: "100%" }}>
        <Link href="/child" asChild>
          <Button title="Child 1 Dashboard" />
        </Link>
      </View>

      <View style={{ marginBottom: 20, width: "100%" }}>
        <Link href="/parent/login" asChild>
          <Button title="Parent Login" />
        </Link>
      </View>

      <View style={{ width: "100%" }}>
        <Link href="/parent/register" asChild>
          <Button title="Register" />
        </Link>
      </View>
    </ScrollView>
  );
}
