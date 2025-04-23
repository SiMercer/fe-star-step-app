import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { getTasksByParent } from "@/utils/api";
import ParentTaskCard from "./taskcards";
import { useAuth } from "@/hooks/useAuth";

interface Tasks {
  _id: string;
  title: string;
  starsRewards: number;
  validBefore: string;
  assignedTo: string;
  createdBy: string;
  status: string;
}

const COLORS = {
  pink: "#FFA1C6",
  lightBlue: "#D1DBFF",
  darkBlue: "#7697F9",
  white: "#FFFEFF",
  offWhite: "#EBECFF",
};

export default function ParentTasksScreen() {
  const [tasks, setTasks] = useState<Tasks[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { parent } = useAuth();

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const tasks = await getTasksByParent(parent?._id);
        setTasks(tasks);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
        setError("Failed to load tasks");
      } finally {
        setIsLoading(false);
      }
    };
    loadTasks();
  }, []);

  const handleTaskDeleted = (taskId: string) => {
    setTasks(tasks.filter((task) => task._id !== taskId));
  };

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.darkBlue} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity onPress={() => setError(null)}>
          <Text style={styles.retryText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.screenContainer}>
      {/* Dashboard Icon */}
      <TouchableOpacity
        onPress={() => router.push("/parent")}
        style={styles.dashboardIcon}
      >
        <FontAwesome name="home" size={24} color={COLORS.darkBlue} />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.heading}>Tasks</Text>

        <View style={styles.tasksContainer}>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <ParentTaskCard
                key={task._id}
                task={task}
                onDelete={handleTaskDeleted}
              />
            ))
          ) : (
            <View style={styles.emptyState}>
              <FontAwesome name="tasks" size={48} color={COLORS.lightBlue} />
              <Text style={styles.emptyText}>No tasks yet!</Text>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => router.push("/parent/add-tasks")}
              >
                <Text style={styles.addButtonText}>Create First Task</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {tasks.length > 0 && (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => router.push("/parent/add-tasks")}
          >
            <Text style={styles.addButtonText}>Add New Task</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.offWhite,
    paddingTop: 50,
  },
  dashboardIcon: {
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
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 10,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.darkBlue,
    marginBottom: 20,
    textAlign: "center",
  },
  tasksContainer: {
    marginBottom: 20,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.offWhite,
  },
  errorText: {
    color: COLORS.pink,
    fontSize: 16,
    marginBottom: 10,
  },
  retryText: {
    color: COLORS.darkBlue,
    textDecorationLine: "underline",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    color: COLORS.darkBlue,
    marginVertical: 15,
  },
  addButton: {
    backgroundColor: COLORS.darkBlue,
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 20,
  },
  addButtonText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 16,
  },
});
