import { View, Text, Button, Pressable } from "react-native";
import { Link, useRouter } from "expo-router";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  Switch,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { getTasksByKid } from "@/utils/api";
import { useChild } from "@/contexts/ChildContext";
import NavBarKid from "./NavBarKid";
import { FontAwesome } from "@expo/vector-icons";

export default function ChildTasksScreen() {
  const [childTask, setChildTask] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const route = useRoute();
  const { selectedChild } = useChild();
  const childId = selectedChild?._id;
  const router = useRouter();
  // const childId = "680792abcdb49b6f46ec82f9";
  useEffect(() => {
    setLoading(true);
    getTasksByKid(childId)
      .then((data) => {
        setChildTask(data);

        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load tasks");
        setLoading(false);
      });
  }, [childId]);

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text style={{ color: "red" }}>{error}</Text>
      </View>
    );
  }

  const getTimeLeft = (dateStr: string): string => {
    const deadline = new Date(dateStr);
    const now = new Date();
    const diffMs = deadline.getTime() - now.getTime();

    if (diffMs <= 0) return "Expired";

    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    return `${days} day${days !== 1 ? "s" : ""} left`;
  };

  const handleToggle = (taskId: string) => {
    const updatedTasks = childTask.map((task) =>
      task._id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
    );
    setChildTask(updatedTasks);
  };
  return (
    <View style={styles.container}>
      <View style={styles.dashboardIcon}>
        <Pressable onPress={() => router.push("/")}>
          <FontAwesome name="home" size={24} color="#7697F9" />
        </Pressable>
      </View>
      <View style={styles.containerLighter}>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 50,
              marginTop: 20,
              color: "#7697F9",
              fontFamily: "Titles",
            }}
          >
            Tasks
          </Text>
        </View>
        <View style={styles.taskcard}>
          <ScrollView>
            {!childTask || childTask.length === 0 ? (
              <Text
                style={{
                  fontSize: 30,
                  color: "#888",
                  textAlign: "center",
                  fontFamily: "Titles",
                }}
              >
                No tasks for today 🎉
              </Text>
            ) : (
              childTask.map((task: any) => (
                <View
                  key={task._id}
                  style={{
                    backgroundColor: "#FFFEFF",
                    padding: 16,
                    borderRadius: 12,
                    marginBottom: 10,
                    gap: 10,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 25,
                      fontFamily: "Titles",
                      color: "#535D7C",
                      justifyContent: "center",
                      display: "flex",
                    }}
                  >
                    {task.title}
                  </Text>
                  <Text
                    style={{ fontSize: 18, color: "#7697F9", fontFamily: "H2" }}
                  >
                    Complete by: {getTimeLeft(task.validBefore)}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginTop: 8,
                    }}
                  >
                    <View>
                      <Text style={styles.statusLabel}>
                        {task.isCompleted ? "Completed" : "To do"}
                      </Text>
                      <Switch
                        trackColor={{ false: "grey", true: "grey" }}
                        thumbColor={task.isCompleted ? "#7697F9" : "#7697F9"}
                        value={task.isCompleted}
                        onValueChange={() => handleToggle(task._id)}
                      />
                    </View>
                    <View
                      style={{ alignItems: "flex-end", flexDirection: "row" }}
                    >
                      <Text
                        style={{
                          fontFamily: "Titles",
                          fontSize: 35,
                          color: "#535D7C",
                          marginBottom: 4,
                        }}
                      >
                        {task.starsReward}
                      </Text>
                      <Text style={{ fontSize: 40 }}>⭐</Text>
                    </View>
                  </View>
                </View>
              ))
            )}
          </ScrollView>
        </View>
        <NavBarKid></NavBarKid>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexShrink: 1,
    padding: 20,
    width: "100%",
    backgroundColor: "#D1DBFF",
    flexDirection: "column",
    height: "100%",
  },
  containerLighter: {
    padding: 20,
    width: "100%",
    gap: 20,
    backgroundColor: "#EBECFF",
    flexDirection: "column",
    borderRadius: 15,
    height: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    alignItems: "center",
  },
  taskcard: {
    backgroundColor: "#FFA1C6",
    padding: 16,

    height: "75%",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
    width: "90%",
  },
  statusLabel: {
    fontFamily: "H2",
    color: "#FFA1C6",
    fontSize: 30,
  },
  nav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  dashboardIcon: {
    position: "absolute",

    backgroundColor: "#FFFEFF",
    padding: 10,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    zIndex: 1,
    top: "5%",
    left: "5%",
  },
});
