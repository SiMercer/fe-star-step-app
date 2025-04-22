import { deleteTask, getTaskById } from "@/utils/api";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";

interface TasksCardsProps {
  task: {
    _id: string;
    title: string;
    starsRewards: number;
    validBefore: Date;
    assignedTo: string;
    createdBy: string;
    status: string;
  };
  onDelete: (taskId: string) => void;
}

export default function ParentTaskCard({ task, onDelete }: TasksCardsProps) {
  // need API function get task by child id
  // const [children, setChildren] = useState<Child[]>([]);

  // // useEffect(() => {
  // //   // Fetching the tasks for the kid (this can be passed as a prop or from state)
  // //   getTaskById(task.assignedTo) // Replace with the actual kid's ID
  // //     .then((tasks) => {
  // //       console.log(task.assignedTo);
  // //       // Assuming the tasks are now loaded
  // //       console.log({ tasks }); // Check tasks to verify date fields are there
  // //     });
  // // }, []);
  const [isLoading, setIsLoading] = useState<boolean>(false); // Track loading state
  const [error, setError] = useState<string | null>(null);

  const handleDelete = (_id: string) => {
    // Confirmation delete alert

    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this task?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteReward(_id),
        },
      ]
    );
  };

  const deleteReward = async (_id: string) => {
    console.log(_id);
    setIsLoading(true); // Start loading when deleting
    setError(null); // Clear any previous errors

    try {
      await deleteTask(_id); // Make the API call to delete the task
      onDelete(_id);
      console.log("Task deleted successfully.");
    } catch (err) {
      console.error("Error deleting task:", err);
      setError("Failed to delete task");
    } finally {
      setIsLoading(false); // Stop loading once the process is done
    }
  };

  return (
    <View
      style={styles.card}
      accessible={true}
      accessibilityLabel={`task: ${task.title}, Cost: ${task.starsRewards} points`}
    >
      <Text style={styles.title}>{task.title}</Text>
      <Text style={styles.text}>Cost: {task.starsRewards} points</Text>
      <Text
        style={[
          styles.text,
          styles.status,
          task.status && { color: "#ff4444" },
        ]}
      >
        Status: {task.status}
      </Text>

      <Text style={[styles.text, { color: "#888" }]}>
        valid before: {task.validBefore}
      </Text>
      <Text style={[styles.text, { color: "#888" }]}>
        assigned to: {task.assignedTo}
      </Text>
      <Text style={[styles.text, { color: "#888" }]}>
        Created by: {task.createdBy}
      </Text>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={() => handleDelete(task._id)}
          disabled={isLoading}
          accessibilityLabel="Delete task"
        >
          {isLoading ? (
            <Text style={styles.buttonText}>Deleting...</Text>
          ) : (
            <Text style={styles.buttonText}>Delete</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginBottom: 12,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    marginBottom: 4,
    color: "#333",
  },
  status: {
    color: "#666",
    fontStyle: "italic",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
    gap: 8,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    minWidth: 80,
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "#f44336",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
  },
});
