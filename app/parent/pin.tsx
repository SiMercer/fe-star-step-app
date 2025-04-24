import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "expo-router";

export default function PinScreen() {
  const { parent } = useAuth();
  const router = useRouter();

  const [storedPin, setStoredPin] = useState<string | null>(null);
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [inputPin, setInputPin] = useState("");
  const [loading, setLoading] = useState(true);
  const BACKEND =
    process.env.EXPO_PUBLIC_BACKEND_URL || "https://be-star-step-app-dev.onrender.com";

  useEffect(() => {
    const fetchPin = async () => {
      if (!parent?._id) return;

      try {
        const res = await fetch(`${BACKEND}/api/parents/${parent._id}`);
        const data = await res.json();
        setStoredPin(data.pin);
      } catch (err) {
        console.error("Failed to fetch parent pin:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPin();
  }, [parent]);

  const handleSetPin = async () => {
    if (newPin.length !== 4 || newPin !== confirmPin) {
      Alert.alert("Error", "PINs must match and be 4 digits long.");
      return;
    }

    try {
      console.log("Setting PIN for parent:", parent);

      const res = await fetch(`${BACKEND}/api/parents/${parent._id}/pin`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin: newPin }),
      });

      if (!res.ok) throw new Error("Failed to set PIN");

      router.push("/parent");
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Something went wrong. Try again.");
    }
  };

  const handleValidatePin = () => {
    if (inputPin === storedPin) {
      router.push("/parent");
    } else {
      Alert.alert("Incorrect PIN", "Please try again.");
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const needsPinCreation = !storedPin || storedPin === "00000";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {needsPinCreation ? "Create Your PIN" : "Enter Your PIN"}
      </Text>

      {needsPinCreation ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter new PIN"
            secureTextEntry
            keyboardType="numeric"
            maxLength={4}
            value={newPin}
            onChangeText={setNewPin}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm new PIN"
            secureTextEntry
            keyboardType="numeric"
            maxLength={4}
            value={confirmPin}
            onChangeText={setConfirmPin}
          />
          <Pressable style={styles.button} onPress={handleSetPin}>
            <Text style={styles.buttonText}>Set PIN</Text>
          </Pressable>
        </>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter PIN"
            secureTextEntry
            keyboardType="numeric"
            maxLength={4}
            value={inputPin}
            onChangeText={setInputPin}
          />
          <Pressable style={styles.button} onPress={handleValidatePin}>
            <Text style={styles.buttonText}>Enter</Text>
          </Pressable>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBECFF",
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    fontWeight: "bold",
    color: "#333",
  },
  input: {
    width: "80%",
    padding: 12,
    marginBottom: 16,
    borderRadius: 12,
    borderColor: "#A5B4FC",
    borderWidth: 1,
    backgroundColor: "white",
    fontSize: 16,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#7697F9",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
