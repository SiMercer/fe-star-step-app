import { deleteTask, getTaskById, getKidById } from "@/utils/api";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
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
  console.log(task);

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.checkmark}>✔️</Text>
        <Text style={styles.title}>{task.title}</Text>
        <View style={styles.kidBubble}>
          <Text style={styles.kidText}>{kidName || "Loading..."}</Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <View style={styles.starsBox}>
          <image></image>
          <Text style={styles.starsText}>{task.starsReward} stars</Text>
        </View>
        <View style={styles.timeBox}>
          <Text style={styles.timeText}>
            time remaining: {task.validBefore}
          </Text>
        </View>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(task._id)}
          disabled={isLoading}
        >
          <Text style={styles.actionText}>
            {isLoading ? "Deleting..." : "delete"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>{task.status}</Text>
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
    width: 60,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  headerContainer: {
    marginTop: 30,
    width: "90%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden",
    borderColor: "yellow",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
  },
  starsContainer: {
    display: "flex",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "#D1DBFF",
    borderRadius: "15px",
    height: "20%",
    justifyContent: "center",
    width: "90%",
    marginTop: 30,
  },

  rewardTasksContainer: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rewardContainer: {
    display: "flex",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "#D1DBFF",
    borderRadius: "15px",
    justifyContent: "center",
    height: 200,
    width: "45%",
    marginTop: 30,
  },
  taskContainer: {
    display: "flex",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "#D1DBFF",
    borderRadius: "15px",
    justifyContent: "center",
    height: 200,
    width: "45%",
    marginTop: 30,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    justifyContent: "space-between",
  },
  checkmark: {
    fontSize: 22,
    marginRight: 10,
  },
  kidBubble: {
    backgroundColor: "#FECACA",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  kidText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  starsBox: {
    backgroundColor: "#FEF08A",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  starsText: {
    fontWeight: "bold",
    color: "#000",
  },
  timeBox: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#000",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  timeText: {
    fontStyle: "italic",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  actionButton: {
    backgroundColor: "#A7F3D0",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
  },
  actionText: {
    color: "#000",
    fontWeight: "bold",
    textTransform: "lowercase",
  },
});
