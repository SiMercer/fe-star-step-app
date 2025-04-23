import { deleteTask, getTaskById, getKidById } from "@/utils/api";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useAuth } from "@/hooks/useAuth";

interface TasksCardsProps {
  task: {
    _id: string;
    title: string;
    starsRewards: number;
    validBefore: string;
    assignedTo: string;
    createdBy: string;
    status: string;
  };
  onDelete: (taskId: string) => void;
}

export default function ParentTaskCard({ task, onDelete }: TasksCardsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [kidName, setKidName] = useState<string>("");
  const { parent } = useAuth();

  useEffect(() => {
    const fetchKidName = async () => {
      try {
        const kid = await getKidById(task.assignedTo);
        setKidName(kid.name);
      } catch (err) {
        console.error("Failed to fetch kid name", err);
        setKidName("Unknown");
      }
    };

    if (task.assignedTo) {
      fetchKidName();
    }
  }, [task.assignedTo]);

  const handleDelete = (_id: string) => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this task?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteReward(_id),
        },
      ]
    );
  };

  const deleteReward = async (_id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      await deleteTask(_id);
      onDelete(_id);
    } catch (err) {
      setError("Failed to delete task");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.card}>
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
        assigned to: {kidName || "Loading..."}
      </Text>
      <Text style={[styles.text, { color: "#888" }]}>
        Created by: {parent?.parentName}
      </Text>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={() => handleDelete(task._id)}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? "Deleting..." : "Delete"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const COLORS = {
  pink: "#FFA1C6",
  lightBlue: "#D1DBFF",
  darkBlue: "#7697F9",
  white: "#FFFEFF",
  offWhite: "#EBECFF",
};

const styles = StyleSheet.create({
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
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: COLORS.lightBlue,
    shadowColor: COLORS.darkBlue,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.darkBlue,
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  statusText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  detailsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  detailText: {
    marginLeft: 8,
    color: COLORS.darkBlue,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 12,
    gap: 10,
  },
  editButton: {
    backgroundColor: COLORS.darkBlue,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: COLORS.pink,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
