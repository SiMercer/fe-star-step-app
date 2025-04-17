import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  Picker,
} from "react-native";
import { useRouter } from "expo-router";

type Reward = {
  title: string;
  cost: number;
  createdBy: string;
  isRedeemed: boolean;
  redeemedBy: string | null;
};

export default function ParentRewardsScreen() {
  const router = useRouter();

  const [title, setTitle] = useState<string>("");
  const [cost, setCost] = useState<string>("");

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create a Reward</Text>

      <TextInput
        placeholder="Reward Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <Text style={styles.label}>Select Cost:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={cost}
          onValueChange={(itemValue) => setCost(itemValue)}
          style={styles.picker}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
            <Picker.Item key={value} label={`${value} ⭐ `} value={value} />
          ))}
        </Picker>
      </View>

      <View style={styles.buttonGroup}>
        <Button title="Create Reward" />
        <Button
          title="Back to Dashboard"
          onPress={() => router.push("/parent")}
        />
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
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },

  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 24,
  },
  picker: {
    height: 50,
    width: "100%",
  },
});
