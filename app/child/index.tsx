import React, { useEffect, useState } from "react";
import { View, Text, Button, Image, StyleSheet, Pressable } from "react-native";
import { useRouter, Link } from "expo-router";
import { getRewardsByParent, getTasksByParent } from "@/utils/api";
import NavBarKid from "./NavBarKid";
import { Child, useChild } from "@/contexts/ChildContext";
import { useAuth } from "@/hooks/useAuth";
import { TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function ChildDashboardScreen() {
  const { selectedChild } = useChild();
  const { parent } = useAuth();

  // console.log(selectedChild, "<<<<<child from cont");
  // console.log(parent, "<<<<<parent from cont");
  const [kid, setKid] = useState<Child | {}>({});
  const [tasks, setTasks] = useState([]);
  const [rewards, setRewards] = useState([]);
  // const { kid } = useKid();
  const router = useRouter();

  useEffect(() => {
    setKid(selectedChild);

    async function getKidRewards() {
      const rewardsData = await getRewardsByParent(parent._id);
      setRewards(rewardsData.rewards);
    }
    getKidRewards();
  }, []);

  useEffect(() => {
    async function getKidTasks() {
      const tasks = await getTasksByParent(parent._id);
      const kidTask = tasks.filter((task: any) => {
        return task.assignedTo === kid._id;
      });

      setTasks(kidTask);
    }
    getKidTasks();
  }, [kid]);
  console.log(kid);
  console.log(tasks);
  console.log(rewards);
  return (
    <View style={styles.main}>
      <View style={styles.containerLighter}>
        <View style={{ height: "5%" }}>
          <TouchableOpacity
            onPress={() => router.push("/")}
            style={styles.dashboardIcon}
          >
            <FontAwesome name="home" size={24} color="#7697F9" />
          </TouchableOpacity>
        </View>
        <View style={styles.headerContainer}>
          <Image source={{ uri: kid.avatar }} style={styles.avatar}></Image>
          <Text
            style={{
              fontFamily: "Titles",
              fontSize: 35,
              color: "#7697F9",
              fontWeight: "bold",
            }}
          >
            {kid.name}'s Dashboard
          </Text>
        </View>
        <View style={{ alignItems: "center", height: "20%" }}>
          <View style={styles.starsContainer}>
            <Text
              style={{
                fontFamily: "Titles",
                fontSize: 35,
                color: "#FFFEFF",
                fontWeight: "bold",
              }}
            >
              You have
            </Text>
            <Text
              style={{
                fontFamily: "Titles",
                fontSize: 35,
                color: "#FFFEFF",
                fontWeight: "bold",
              }}
            >
              {kid.stars} ⭐️ !
            </Text>
          </View>
        </View>
        <View style={styles.rewardTasksContainer}>
          <Link href="/child/rewards" asChild>
            <View style={styles.rewardContainer}>
              <View
                style={{
                  flexDirection: "column",
                  gap: "20px",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-end",
                    justifyContent: "space-around",
                    gap: 10,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "H2",
                      color: "#FFA1C6",
                      fontSize: 50,
                    }}
                  >
                    {rewards.length}
                  </Text>
                  <Image
                    source={require("../../assets/icons/128/gift128.png")}
                    style={{ width: 50, height: 60, resizeMode: "contain" }}
                  />
                </View>
                <Text
                  style={{ fontFamily: "H2", color: "#565F7D", fontSize: 20 }}
                >
                  available for you
                </Text>
                <Text
                  style={{ fontFamily: "H2", color: "#565F7D", fontSize: 20 }}
                >
                  today
                </Text>
              </View>
            </View>
          </Link>
          <Link href="/child/tasks" asChild>
            <View style={styles.taskContainer}>
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    fontFamily: "Titles",
                    color: "#FFA1C6",
                    fontSize: 50,
                    fontWeight: "bold",
                  }}
                >
                  {tasks.length}
                </Text>
                <Text
                  style={{
                    fontFamily: "Titles",
                    fontSize: 35,
                    color: "#7697F9",
                    fontWeight: "bold",
                  }}
                >
                  tasks
                </Text>
                <Text
                  style={{ fontFamily: "H2", color: "#565F7D", fontSize: 20 }}
                >
                  for today
                </Text>
              </View>
            </View>
          </Link>
        </View>
        <NavBarKid></NavBarKid>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  main: {
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
  },
  headerContainer: {
    width: "98%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  backButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
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
    backgroundColor: "#FFA1C6",
    borderRadius: 15,
    height: "100%",
    justifyContent: "center",
    width: "100%",
    marginTop: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },

  rewardTasksContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rewardContainer: {
    display: "flex",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFEFF",
    borderRadius: 15,
    justifyContent: "center",
    height: 200,
    width: "45%",
    marginTop: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  taskContainer: {
    display: "flex",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFEFF",
    borderRadius: 15,
    justifyContent: "center",
    height: 200,
    width: "45%",
    marginTop: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
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
  },
});
