import React, { useEffect, useState } from "react";
import { View, Text, Button, Image } from "react-native";
import { useRouter, Link } from "expo-router";
import { getRewardsByParent, getTasksByParent } from "@/utils/api";
import NavBarKid from "./NavBarKid";
import { useChild } from "@/contexts/ChildContext";
import { useAuth } from "@/hooks/useAuth";

export default function ChildDashboardScreen() {
  const { selectedChild } = useChild();
  const { parent } = useAuth();

  console.log(selectedChild, "<<<<<child from cont");
  console.log(parent, "<<<<<parent from cont");
  const [kid, setKid] = useState<object>({});
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
    <View
      style={{
        backgroundColor: "#EBECFF",
        height: "100%",
        display: "flex",
        alignItems: "center",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginBottom: 20,
        }}
      >
        <Link href="/" asChild>
          <Button title="Back" onPress={() => {}} />
        </Link>
      </View>
      <View
        style={{
          marginTop: "30px",
          width: "90%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <Image
          source={{ uri: kid.avatar }}
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            overflow: "hidden",
            borderColor: "yellow",
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 2,
          }}
        ></Image>
        <Text style={{ fontSize: 24, marginTop: 20 }}>
          {kid.name}'s Dashboard
        </Text>
      </View>
      <View
        style={{
          display: "flex",
          alignContent: "center",
          alignItems: "center",
          backgroundColor: "#D1DBFF",
          borderRadius: "15px",
          height: "20%",
          justifyContent: "center",
          width: "90%",
          marginTop: "30px",
        }}
      >
        <Text>{kid.stars} ⭐️</Text>
      </View>
      <View
        style={{
          width: "90%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Link href="/child/rewards" asChild>
          <View
            style={{
              display: "flex",
              alignContent: "center",
              alignItems: "center",
              backgroundColor: "#D1DBFF",
              borderRadius: "15px",
              justifyContent: "center",
              height: "200px",
              width: "45%",
              marginTop: "30px",
            }}
          >
            <Text>
              {rewards.length <= 1
                ? `${rewards.length} reward available for  you today`
                : `${rewards.length} rewards  available for you today`}
            </Text>
          </View>
        </Link>
        <Link href="/child/tasks" asChild>
          <View
            style={{
              display: "flex",
              alignContent: "center",
              alignItems: "center",
              backgroundColor: "#D1DBFF",
              borderRadius: "15px",
              justifyContent: "center",
              height: "200px",
              width: "45%",
              marginTop: "30px",
            }}
          >
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
