import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

import { Link, useRouter } from "expo-router";
import { useAuth } from "../hooks/useAuth";
import { useChild } from "../contexts/ChildContext";
import { StyledText } from "../contexts/fonts";

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
                    <TouchableOpacity
                      key={child._id}
                      style={styles.childBox}
                      onPress={() => handleSelectChild(child)}
                    >
                      <Image
                        source={{
                          uri:
                            child.avatar ||
                            "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg",
                        }}
                        style={styles.avatarLarge}
                      />
                      <Text style={styles.childName}>{child.name}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </>
          )}
        </>
      ) : (
        <>
          <TouchableOpacity style={styles.loginButton} onPress={login}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
        </>
      )}

      <View style={styles.bottomNav}>
        <Link href="/parent/login" asChild>
          <TouchableOpacity style={styles.navButton}>
            <Text style={styles.buttonText}>Parent Login</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/parent" asChild>
          <TouchableOpacity style={styles.navButton}>
            <Text style={styles.buttonText}>Parent Dashboard</Text>
          </TouchableOpacity>
        </Link>
      </View>
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
    marginVertical: 5,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
  },
  bottomNav: {
    marginTop: 30,
    width: "100%",
    alignItems: "center",
  },
});
