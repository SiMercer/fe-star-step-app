import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";

export default function ParentPinScreen() {
  const [pin, setPin] = useState("");
  const router = useRouter();

  const handleSubmit = () => {
    if (pin === "1234") {
      router.replace("/parent");
    } else {
      Alert.alert("Incorrect PIN", "Please try again.");
      setPin("");
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Parent PIN</Text>
      <TextInput
        style={styles.input}
        value={pin}
        onChangeText={setPin}
        keyboardType="numeric"
        secureTextEntry
        maxLength={4}
        placeholder="****"
        placeholderTextColor="#999"
      />

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Unlock</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flex: 1,
    backgroundColor: "#EBECFF",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    fontWeight: "bold",
    color: "#7697F9",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 12,
    fontSize: 24,
    textAlign: "center",
    width: "60%",
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12, // You can use `marginHorizontal` inside buttons if `gap` doesn't work
  },
  button: {
    backgroundColor: "#7697F9",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    marginHorizontal: 6,
  },
  backButton: {
    backgroundColor: "#FFA1C6",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    marginHorizontal: 6,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
});
