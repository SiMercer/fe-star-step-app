import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { router } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import { getKidByParentId, postNewTask } from "@/utils/api";
import { FontAwesome } from "@expo/vector-icons";
import { useAuth } from "@/hooks/useAuth";

const COLORS = {
  pink: "#FFA1C6",
  lightBlue: "#D1DBFF",
  darkBlue: "#7697F9",
  white: "#FFFEFF",
  offWhite: "#EBECFF",
};

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
  const { parent } = useAuth();

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const childrenData = await getKidByParentId(parent?._id);
        setChildren(childrenData);
        setAssignedTo(childrenData[0]?._id || "");
      } catch (error) {
        console.error("Error fetching children:", error);
        Alert.alert("Error", "Failed to load children");
      } finally {
        setIsLoadingChildren(false);
      }
    };

    fetchChildren();
  }, [parentID]);

  const onChangeDate = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || validBefore;
    setShowDatePicker(false);
    setValidBefore(currentDate);
  };

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
        starsReward: Number(starsReward) || 1,
        validBefore: validBefore.toISOString(),
        status: "new",
      };

      await postNewTask(parent?._id, assignedTo, newTask);
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
        <ActivityIndicator size="large" color={COLORS.darkBlue} />
      </View>
    );
  }

  if (children.length === 0) {
    return (
      <View style={[styles.container, styles.center]}>
        <FontAwesome name="child" size={48} color={COLORS.pink} />
        <Text style={styles.errorText}>No children found</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.screenContainer}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backIcon}>
        <FontAwesome name="arrow-left" size={24} color={COLORS.darkBlue} />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Add New Task</Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Task Title*</Text>
          <TextInput
            style={styles.input}
            placeholder="What needs to be done?"
            placeholderTextColor="#888"
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
            placeholderTextColor="#888"
            keyboardType="number-pad"
            value={starsReward}
            onChangeText={(text) =>
              setStarsRewards(text.replace(/[^0-9]/g, ""))
            }
          />
          <Text style={styles.hint}>Minimum 1 star</Text>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Due Date*</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <FontAwesome name="calendar" size={18} color={COLORS.darkBlue} />
            <Text style={styles.dateButtonText}>
              {validBefore.toLocaleDateString()}
            </Text>
          </TouchableOpacity>
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
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={() => router.back()}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              styles.submitButton,
              (isSubmitting || !title.trim() || !assignedTo) &&
                styles.disabledButton,
            ]}
            onPress={handleSubmit}
            disabled={isSubmitting || !title.trim() || !assignedTo}
          >
            {isSubmitting ? (
              <ActivityIndicator color={COLORS.white} />
            ) : (
              <Text style={styles.buttonText}>Add Task</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: COLORS.lightBlue,
    borderRadius: 10,
    color: COLORS.darkBlue,
    paddingRight: 30,
    backgroundColor: COLORS.white,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: COLORS.lightBlue,
    borderRadius: 10,
    color: COLORS.darkBlue,
    paddingRight: 30,
    backgroundColor: COLORS.white,
  },
});

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.offWhite,
    paddingTop: 50,
  },
  backIcon: {
    position: "absolute",
    top: 15,
    left: 15,
    zIndex: 10,
    padding: 10,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.darkBlue,
  },
  container: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.darkBlue,
    marginBottom: 25,
    textAlign: "center",
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "600",
    color: COLORS.darkBlue,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.lightBlue,
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    backgroundColor: COLORS.white,
    color: COLORS.darkBlue,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: COLORS.lightBlue,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: COLORS.white,
  },
  hint: {
    fontSize: 12,
    color: COLORS.darkBlue,
    marginTop: 5,
    fontStyle: "italic",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
  },
  submitButton: {
    backgroundColor: COLORS.darkBlue,
    marginLeft: 10,
  },
  cancelButton: {
    backgroundColor: COLORS.pink,
    marginRight: 10,
  },
  disabledButton: {
    backgroundColor: "#CCCCCC",
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    color: COLORS.pink,
    fontSize: 18,
    marginVertical: 20,
    textAlign: "center",
  },
  backButton: {
    backgroundColor: COLORS.darkBlue,
    padding: 15,
    borderRadius: 25,
    width: "100%",
    maxWidth: 200,
    alignItems: "center",
    marginTop: 20,
  },
  backButtonText: {
    color: COLORS.white,
    fontWeight: "bold",
  },
  dateButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: COLORS.lightBlue,
    borderRadius: 10,
    padding: 14,
    backgroundColor: COLORS.white,
  },
  dateButtonText: {
    fontSize: 16,
    color: COLORS.darkBlue,
  },
});
