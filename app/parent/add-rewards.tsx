import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import Picker from "@react-native-picker/datetimepicker";

type AddRewardFormProps = {
  onAddReward: (title: string, cost: number) => void;
};

export default function AddRewardForm({ onAddReward }: AddRewardFormProps) {
  const [title, setTitle] = useState<string>("");
  const [cost, setCost] = useState<number>(1);

  const handleAddReward = () => {
    if (title.trim()) {
      onAddReward(title, cost);
      setTitle("");
      setCost(1);
    }
  };
  return (
    <View style={styles.formContainer}>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Enter reward title"
        style={styles.input}
      />
      <Picker
        selectedValue={cost}
        onValueChange={setCost}
        style={styles.picker}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
          <Picker.Item key={value} label={`${value} ⭐`} value={value} />
        ))}
      </Picker>
      <Button title="Add Reward" onPress={handleAddReward} />
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    marginTop: 24,
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
  input: {
    borderWidth: 1,
    padding: 8,
    marginBottom: 12,
    borderRadius: 8,
  },
  picker: {
    height: 50,
    width: "100%",
    marginBottom: 12,
  },
});
