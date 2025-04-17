import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  Alert,
  Picker,
} from "react-native";
import { useRouter } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function ParentTasksScreen() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [starsRewards, setStarsRewards] = useState("");
  const [validBefore, setValidBefore] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleCreateTask = async () => {
    if (!title || !starsRewards || !validBefore) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    try {
      const formattedDate = validBefore.toISOString().split("T")[0];
      const response = await fetch(
        "https://be-star-step-app-1.onrender.com/api/tasks",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            starsRewards: parseInt(starsRewards),
            validBefore: formattedDate,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Task created successfully");
        // Reset form
        setTitle("");
        setStarsRewards("");
        setValidBefore(new Date());
      } else {
        Alert.alert("Error", data.message || "Failed to create task");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while creating the task");
      console.error(error);
    }
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || validBefore;
    setShowDatePicker(false);
    setValidBefore(currentDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create New Task</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Task Title</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Enter task title"
        />
      </View>

      <Picker
        selectedValue={starsRewards}
        onValueChange={setStarsRewards}
        style={styles.picker}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
          <Picker.Item key={value} label={`${value} ⭐`} value={value} />
        ))}
      </Picker>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Valid Before</Text>
        <Button onPress={showDatepicker} title={validBefore.toDateString()} />
        {showDatePicker && (
          <DateTimePicker
            value={validBefore}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        )}
      </View>

      <View style={styles.buttonGroup}>
        <Button
          title="Create Task"
          onPress={handleCreateTask}
          color="#4CAF50"
        />
        <Button
          title="Back to Dashboard"
          onPress={() => router.push("/parent")}
          color="#607D8B"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  buttonGroup: {
    marginTop: 32,
    gap: 16,
  },
  picker: {
    height: 50,
    width: "100%",
    marginBottom: 12,
  },
});
