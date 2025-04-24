import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { useAuth } from "../../hooks/useAuth";
import ParentTaskCard from "./taskcards";
import { getTasksByParent } from "@/utils/api";
import { FontAwesome } from "@expo/vector-icons";

export default function ParentDashboard() {
  const router = useRouter();
  const { parent, isLoading, logout } = useAuth();
  const [children, setChildren] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (parent?._id) {
      fetch(
        `https://be-star-step-app-dev.onrender.com/api/kids/parent/${parent._id}`
      )
        .then((res) => res.json())
        .then((data) => setChildren(data))
        .catch((err) => console.error("Failed to load children:", err));
    }
  }, [parent]);

  useEffect(() => {
    const fetchTasks = async () => {
      if (parent?._id) {
        try {
          const tasks = await getTasksByParent(parent._id);
          setTasks(tasks);
        } catch (err) {
          console.error("Error loading tasks:", err);
        }
      }
    };
    fetchTasks();
  }, [parent]);

  const handleTaskDeleted = (taskId: string) => {
    setTasks(tasks.filter((task) => task._id !== taskId));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity
        onPress={() => router.push("/")}
        style={styles.dashboardIcon}
      >
        <FontAwesome name="home" size={24} color="#7697F9" />
      </TouchableOpacity>

      <Text style={styles.title}>Parent Dashboard</Text>

      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : !parent ? (
        <Text style={styles.subtitleError}>You are not logged in</Text>
      ) : (
        <>
          <View style={styles.kidsRow}>
            {children.map((child) => (
              <View key={child._id} style={styles.kidBox}>
                <Image
                  source={{
                    uri:
                      child.avatar ||
                      "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg",
                  }}
                  style={styles.avatar}
                />
                <Text style={styles.kidName}>{child.name}</Text>
                <View style={styles.starBox}>
                  <Text style={styles.starText}>{child.stars} stars</Text>
                </View>
                {child.rewardClaimed && (
                  <Text style={styles.rewardClaimed}>Reward claimed</Text>
                )}
              </View>
            ))}

            <TouchableOpacity
              onPress={() => router.push("/parent/add-child")}
              style={styles.kidBox}
            >
              <View
                style={[styles.avatar, { justifyContent: "center", alignItems: "center" }]}
              >
                <FontAwesome name="plus" size={30} color="#7697F9" />
              </View>
              <Text style={styles.kidName}>Add Child</Text>
            </TouchableOpacity>
          </View>

          <Link href="/parent/rewards" asChild>
            <TouchableOpacity style={styles.rewardsButton}>
              <Text style={styles.rewardsButtonText}>Rewards exchange list</Text>
            </TouchableOpacity>
          </Link>

          <Text style={styles.sectionTitle}>Tasks for today</Text>

          <View style={{ width: "100%" }}>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <ParentTaskCard
                  key={task._id}
                  task={task}
                  onDelete={handleTaskDeleted}
                />
              ))
            ) : (
              <Text>No tasks available</Text>
            )}
          </View>

          <View style={styles.newTaskRow}>
            <Link href="/parent/add-tasks" asChild>
              <TouchableOpacity style={styles.newTaskButton}>
                <Text style={styles.newTaskButtonText}>Add a new task</Text>
              </TouchableOpacity>
            </Link>
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={logout}>
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EBECFF",
    flexGrow: 1,
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#7697F9",
    marginBottom: 20,
  },
  subtitleError: {
    fontSize: 18,
    color: "red",
  },
  kidsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 16,
    marginBottom: 24,
  },
  kidBox: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 20,
    alignItems: "center",
    width: 140,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  kidName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    textAlign: "center",
  },
  starBox: {
    backgroundColor: "#FFE178",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 4,
  },
  starText: {
    fontWeight: "600",
  },
  rewardClaimed: {
    fontSize: 12,
    color: "#555",
    marginTop: 4,
  },
  rewardsButton: {
    backgroundColor: "#A7F3D0",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  rewardsButtonText: {
    color: "#065F46",
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  newTaskRow: {
    marginTop: 20,
  },
  newTaskButton: {
    backgroundColor: "#7697F9",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 16,
  },
  newTaskButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#FFA1C6",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 24,
  },
  logoutText: {
    color: "#000",
    fontWeight: "600",
  },
  dashboardIcon: {
    position: "absolute",
    top: 20,
    left: 20,
    backgroundColor: "#FFFEFF",
    padding: 10,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
});
