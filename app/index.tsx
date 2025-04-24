import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { useAuth } from "../hooks/useAuth";
import { useChild } from "../contexts/ChildContext";
import { StyledText } from "../contexts/fonts";
import Constants from "expo-constants";

export default function HomeScreen() {
  const { parent, isLoading, login } = useAuth();
  const { setSelectedChild } = useChild();
  const [children, setChildren] = useState([]);
  const router = useRouter();

  useEffect(() => {
    console.log("Auth0 config:", Constants.expoConfig.extra);
    if (parent?._id) {
      fetch(
        `https://be-star-step-app-dev.onrender.com/api/kids/parent/${parent._id}`
      )
        .then((res) => res.json())
        .then((data) => {
          const filtered = data.filter(
            (child) => child && child._id && typeof child.name === "string"
          );
          setChildren(filtered);
        })
        .catch((err) => console.error("Error fetching children:", err));
    }
  }, [parent]);

  const handleSelectChild = (child) => {
    setSelectedChild(child);
    router.push("/child");
  };

  const fallbackUri =
    "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg";

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require("../assets/images/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <StyledText style={{ fontSize: 40, color: "#7697F9", marginTop: 10 }}>
        StarSteps
      </StyledText>

      {isLoading ? (
        <Text style={styles.subtitle}>Loading…</Text>
      ) : parent ? (
        <>
          {children.length > 0 && (
            <>
              <Text style={styles.subtitle}>Child Select:</Text>
              <View style={styles.childGrid}>
                {children.map((child) => {
                  if (!child || !child._id || !child.name) return null;

                  return (
                    <Pressable
                      key={child._id}
                      onPress={() => handleSelectChild(child)}
                      style={({ hovered, pressed }) => [
                        styles.childBox,
                        hovered && styles.childBoxHover,
                        pressed && styles.childBoxPressed,
                      ]}
                    >
                      <Image
                        source={{ uri: child.avatar || fallbackUri }}
                        style={styles.avatarLarge}
                      />
                      <Text style={styles.childName}>{child.name}</Text>
                    </Pressable>
                  );
                })}
              </View>
            </>
          )}

          {/* Show Dashboard button only when logged in */}
          <Link href="/parent/pin" asChild>
            <Pressable style={styles.navButton}>
              <Text style={styles.buttonText}>Parent Dashboard</Text>
            </Pressable>
          </Link>
        </>
      ) : (
        <>
          <Pressable style={styles.loginButton} onPress={login}>
            <Text style={styles.buttonText}>Log In</Text>
          </Pressable>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#EBECFF",
    alignItems: "center",
    padding: 30,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#333",
    marginVertical: 10,
    textAlign: "center",
  },
  loginButton: {
    backgroundColor: "#7697F9",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    marginVertical: 10,
  },
  childGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 16,
  },
  childBox: {
    backgroundColor: "#D1DBFF",
    borderRadius: 24,
    padding: 16,
    width: 140,
    height: 160,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
    transitionDuration: "200ms",
  },
  childBoxHover: {
    backgroundColor: "#c8d5ff",
    transform: [{ scale: 1.03 }],
  },
  childBoxPressed: {
    backgroundColor: "#b6c8ff",
    transform: [{ scale: 0.97 }],
  },
  avatarLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  childName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
  navButton: {
    backgroundColor: "#FFFEEF",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginVertical: 20,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
  },
});
