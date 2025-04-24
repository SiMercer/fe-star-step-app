import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Switch,
  Image,
} from "react-native";
import { deleteTask, editTask, getKidById } from "@/utils/api";
import { useAuth } from "@/hooks/useAuth";

interface TasksCardsProps {
  task: {
    _id: string;
    title: string;
    starsReward: number;
    validBefore: string;
    assignedTo: string;
    createdBy: string;
    status: string;
  };
  onDelete: (taskId: string) => void;
}

export default function ParentTaskCard({ task, onDelete }: TasksCardsProps) {
  const [kidName, setKidName] = useState("Loading...");
  const [kidAvatar, setKidAvatar] = useState("");
  const [isCompleted, setIsCompleted] = useState(task.status === "complete");
  const [isLoading, setIsLoading] = useState(false);
  const { parent } = useAuth();

  console.log(task);

  useEffect(() => {
    const fetchKid = async () => {
      try {
        const kid = await getKidById(task.assignedTo);
        setKidName(kid.name);
        setKidAvatar(kid.avatar);
      } catch (err) {
        setKidName("Unknown");
        console.error("Failed to fetch kid data", err);
      }
    };
    if (task.assignedTo) fetchKid();
  }, [task.assignedTo]);

  const toggleSwitch = () => {
    setIsCompleted((prev) => !prev);
    editTask(task._id, { status: "complete" });
    console.log(task.status);
  };

  const handleDelete = () => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this task?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            setIsLoading(true);
            try {
              await deleteTask(task._id);
              onDelete(task._id);
            } catch {
              Alert.alert("Error", "Failed to delete task.");
            } finally {
              setIsLoading(false);
            }
          },
        },
      ]
    );
  };

  const getTimeRemaining = (dateStr: string) => {
    const [day, month, year] = dateStr.split("-").map(Number);
    const deadline = new Date(year, month - 1, day);
    const diffDays = Math.ceil(
      (deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    );
    if (diffDays <= 0) return { label: "expired", status: "expired" };
    if (diffDays <= 2)
      return {
        label: `${diffDays} day${diffDays > 1 ? "s" : ""}`,
        status: "urgent",
      };
    return { label: `${diffDays} days`, status: "ok" };
  };

  const { label, status } = getTimeRemaining(task.validBefore);

  return (
    <View
      style={[
        styles.card,
        isCompleted
          ? styles.cardCompleted
          : status === "expired"
          ? styles.cardExpired
          : status === "urgent"
          ? styles.cardUrgent
          : styles.cardNormal,
      ]}
    >
      <View style={styles.cardHeader}>
        <Image
          source={{
            uri:
              kidAvatar ||
              "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg",
          }}
          style={styles.avatar}
        />
        <Switch
          value={isCompleted}
          onValueChange={toggleSwitch}
          trackColor={{ false: "#CBD5E1", true: "#A5B4FC" }}
          thumbColor="#fff"
        />

        <View style={styles.taskInfo}>
          <Text style={styles.taskTitle}>{task.title}</Text>
          <Text style={styles.kidName}>Assigned to: {kidName}</Text>
          <Text style={styles.stars}>⭐ {task.starsReward}</Text>
        </View>

        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>
            {isCompleted ? "Complete" : task.status}
          </Text>
          <View style={styles.timeBox}>
            <Text style={styles.timeText}>⏰ {label}</Text>
          </View>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete()}
        >
          <Text style={styles.buttonText}>Delete</Text>
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
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 16,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
  },
  cardNormal: {
    backgroundColor: "#F9F9FF",
  },
  cardUrgent: {
    backgroundColor: "#FFF3CD",
  },
  cardExpired: {
    backgroundColor: "#FFD6D6",
  },
  cardCompleted: {
    backgroundColor: "#D4EDDA",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  kidName: {
    fontSize: 14,
    color: "#666",
    marginLeft: 20,
  },
  stars: {
    fontSize: 14,
    color: "#ffb700",
    fontWeight: "500",
  },
  statusContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#e1e1e1",
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    color: "#444",
  },
  timeBox: {
    backgroundColor: "#eef",
    padding: 8,
    borderRadius: 8,
    marginTop: 8,
  },
  timeText: {
    fontSize: 14,
    color: "#333",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
    marginTop: 12,
  },
  editButton: {
    backgroundColor: "#7697F9",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  deleteButton: {
    backgroundColor: "#FFA1C6",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
