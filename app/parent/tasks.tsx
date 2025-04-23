import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";
import { getTasksByParent } from "@/utils/api";
import ParentTaskCard from "./taskcards";

interface Tasks {
  _id: string;
  title: string;
  starsRewards: number;
  validBefore: Date;
  assignedTo: string;
  createdBy: string;
  status: string;
}

export default function ParentTasksScreen() {
  const [tasks, setTasks] = useState<Tasks[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    getTasksByParent("local-test-id")
      .then((tasks) => {
        setTasks(tasks);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch tasks:", error);
        setError("Failed to load tasks");
        setTasks([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleTaskDeleted = (taskId: string) => {
    // After deleting a task, refresh the task list
    setTasks(tasks.filter((task) => task._id !== taskId));
  };

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (tasks.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.heading}>No Tasks Found</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.heading}>Tasks</Text>

      <View style={styles.tasksContainer}>
        {tasks.map((task) => {
          const uniqueKey = task._id || `${task.title}-${Math.random()}`;
          return (
            <ParentTaskCard
              onDelete={handleTaskDeleted}
              key={uniqueKey}
              task={task}
            />
          );
        })}
      </View>

      <View style={styles.buttonGroup}>
        <View style={styles.buttonContainer}>
          <Button
            title="Back to Dashboard"
            onPress={() => router.push("/parent")}


          />
        </View>




        
        <View style={styles.buttonContainer}>
          <Button
            title={tasks.length === 0 ? "Create First Task" : "Add New Task"}
            onPress={() => router.push("/parent/add-tasks")}
            color="#007bff"
            style={styles.button}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#333",
  },
  tasksContainer: {
    marginBottom: 30,
    width: "100%",
  },
  buttonGroup: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 15,
  },
  buttonContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  scrollContainer: {
    flexGrow: 1, // Ensure ScrollView content fills the available space
    justifyContent: "flex-start", // Prevent content from being pushed down
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  errorText: {
    color: "red",
    marginBottom: 16,
    textAlign: "center",
    fontSize: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  subtext: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    marginTop: 20,
  },
});
