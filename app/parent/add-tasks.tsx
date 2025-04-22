import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { router } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import { getKidByParentId, postNewTask } from "@/utils/api";

interface Child {
  _id: string;
  name: string;
}

interface AddTaskScreenProps {
  parentID: "local-test-id";
}

export default function AddTaskScreen({ parentID }: AddTaskScreenProps) {
  // Form state
  const [title, setTitle] = useState("");
  const [starsReward, setStarsRewards] = useState("");
  const [validBefore, setValidBefore] = useState(new Date());
  const [assignedTo, setAssignedTo] = useState("");
  const [children, setChildren] = useState<Child[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingChildren, setIsLoadingChildren] = useState(true);

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const childrenData = await getKidByParentId("local-test-id");
        setChildren(childrenData);

        setAssignedTo(childrenData[0]._id); // Set default to first child
      } catch (error) {
        console.error("Error fetching children:", error);
        Alert.alert("Error", "Failed to load children");
      } finally {
        setIsLoadingChildren(false);
      }
    };

    fetchChildren();
  }, [parentID]);

  // Handle date change
  const onChangeDate = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || validBefore;
    setShowDatePicker(false);
    setValidBefore(currentDate);
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!title.trim()) {
      Alert.alert("Error", "Please enter a task title");
      return;
    }

    if (!assignedTo) {
      Alert.alert("Error", "Please select a child to assign the task to");
      return;
    }

    setIsSubmitting(true);

    try {
      const newTask = {
        title,
        starsReward: Number(starsReward),
        validBefore: validBefore.toISOString(),
        status: "new",
      };
      console.log("Payload being sent:", newTask);

      const data = await postNewTask("local-test-id", assignedTo, newTask);
      console.log(assignedTo);
      console.log(data);
      Alert.alert("Success", "Task added successfully!", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch (error) {
      console.error("Error adding task:", error);
      Alert.alert("Error", "Failed to add task. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingChildren) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (children.length === 0) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.errorText}>No children found</Text>
        <Button title="Go Back" onPress={() => router.back()} />
      </View>
    );
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add New Task</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Task Title*</Text>
        <TextInput
          style={styles.input}
          placeholder="What needs to be done?"
          value={title}
          onChangeText={setTitle}
          maxLength={100}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Assign To*</Text>
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            onValueChange={(value) => setAssignedTo(value)}
            items={children.map((child) => ({
              label: child.name,
              value: child._id,
              key: child._id,
            }))}
            value={assignedTo}
            placeholder={{}}
            style={pickerSelectStyles}
            useNativeAndroidPickerStyle={false}
          />
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Star Reward*</Text>
        <TextInput
          style={styles.input}
          placeholder="How many stars is this worth?"
          keyboardType="number-pad"
          value={starsReward}
          onChangeText={(text) => setStarsRewards(text.replace(/[^0-9]/g, ""))}
        />
        <Text style={styles.hint}>Minimum 1 star</Text>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Due Date*</Text>
        <Button
          title={validBefore.toLocaleDateString()}
          onPress={() => setShowDatePicker(true)}
        />
        {showDatePicker && (
          <DateTimePicker
            value={validBefore}
            mode="date"
            display="default"
            onChange={onChangeDate}
            minimumDate={new Date()}
          />
        )}
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Cancel" onPress={() => router.back()} color="#999" />
        <Button
          title={isSubmitting ? "Adding..." : "Add Task"}
          onPress={handleSubmit}
          disabled={isSubmitting || !title.trim() || !assignedTo}
        />
      </View>
    </ScrollView>
  );
}
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 12,
    fontSize: 16,
    marginBottom: 4,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    overflow: "hidden",
  },
  picker: {
    width: "100%",
  },
  hint: {
    fontSize: 12,
    color: "#666",
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    marginBottom: 20,
    fontSize: 16,
  },
});
