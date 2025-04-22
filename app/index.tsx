import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, Button, StyleSheet } from "react-native";
import { Link, useRouter } from "expo-router";
import { useAuth } from "../hooks/useAuth";
import { useChild } from "../contexts/ChildContext";

export default function HomeScreen() {
  const { parent, isLoading, login, logout } = useAuth();
  const { setSelectedChild } = useChild();
  const [children, setChildren] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (parent?._id) {
      fetch(
        `https://be-star-step-app-dev.onrender.com/api/kids/parent/${parent._id}`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("Fetched children:", data);
          setChildren(data);
        })
        .catch((err) => console.error("Error fetching children:", err));
    }
  }, [parent]);

  const handleSelectChild = (child) => {
    setSelectedChild(child);
    router.push("/child");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>StarSteps</Text>

      {isLoading ? (
        <Text>Loading…</Text>
      ) : parent ? (
        <>
          <Text style={styles.subtitle}>Logged in as {parent.parentName}</Text>
          <Button title="Log Out" onPress={logout} />

          {children.length > 0 && (
            <>
              <Text style={styles.subtitle}>Select a Child:</Text>
              {children.map((child) => (
                <View key={child._id} style={styles.navItem}>
                  <Button
                    title={child.name}
                    onPress={() => handleSelectChild(child)}
                  />
                </View>
              ))}
            </>
          )}
        </>
      ) : (
        <Button title="Log In" onPress={login} />
      )}

      <View style={styles.navItem}>
        <Link href="/parent/login" asChild>
          <Button title="Parent Login" />
        </Link>
      </View>

      <View style={styles.navItem}>
        <Link href="/parent" asChild>
          <Button title="Parent Dashboard" />
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: { fontSize: 28, marginBottom: 20 },
  subtitle: { fontSize: 20, marginTop: 20, marginBottom: 10 },
  navItem: { width: "100%", marginVertical: 8 },
});
