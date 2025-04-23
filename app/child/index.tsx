import React, { useEffect, useState } from "react";
import { View, Text, Button, Image, StyleSheet } from "react-native";
import { useRouter, Link } from "expo-router";
import { getRewardsByParent, getTasksByParent } from "@/utils/api";
import NavBarKid from "./NavBarKid";
import { Child, useChild } from "@/contexts/ChildContext";
import { useAuth } from "@/hooks/useAuth";

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
      <View style={styles.backButtonContainer}>
        <Link href="/" asChild>
          <Button title="Back" onPress={() => {}} />
        </Link>
      </View>
      <View style={styles.headerContainer}>
        <Image source={{ uri: kid.avatar }} style={styles.avatar}></Image>
        <Text style={{ fontSize: 24, marginTop: 20 }}>
          {kid.name}'s Dashboard
        </Text>
      </View>
      <View style={styles.starsContainer}>
        <Text>{kid.stars} ⭐️</Text>
      </View>
      <View style={styles.rewardTasksContainer}>
        <Link href="/child/rewards" asChild>
          <View style={styles.rewardContainer}>
            <Text>
              {rewards.length <= 1
                ? `${rewards.length} reward available for  you today`
                : `${rewards.length} rewards  available for you today`}
            </Text>
          </View>
        </Link>
        <Link href="/child/tasks" asChild>
          <View style={styles.taskContainer}>
            <Text>
              {tasks.length <= 1
                ? `${tasks.length} task for today`
                : `${tasks.length} tasks for today`}
            </Text>
          </View>
        </Link>
      </View>
      <NavBarKid></NavBarKid>
    </View>
  );
}
const styles = StyleSheet.create({
  main: {
    backgroundColor: "#EBECFF",
    height: "100%",
    display: "flex",
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
});
