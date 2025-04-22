import React, { useEffect, useState } from "react";
import { View, Text, Button, Image } from "react-native";
import { useRouter, Link } from "expo-router";
import {
  getKidsByParent,
  getRewardsByParent,
  getTasksByKid,
} from "@/utils/api";
import NavBarKid from "./NavBarKid";

export default function ChildDashboardScreen() {
  const [kid, setKid] = useState({});
  const [tasks, setTasks] = useState([]);
  const [rewards, setRewards] = useState([]);
  // const { kid } = useKid();
  const router = useRouter();

  const child_id = "000000000000000000000002";
  const parent_id = "auth0|test123";
  useEffect(() => {
    async function kidData() {
      const kid = await getKidsByParent(parent_id);
      setKid(kid[0]);
    }
    kidData();

    async function getKidRewards() {
      const rewardsData = await getRewardsByParent(parent_id);
      setRewards(rewardsData.rewards);
    }
    getKidRewards();
  }, []);
  useEffect(() => {
    async function getKidTasks() {
      const tasks = await getTasksByKid(kid._id);
      setTasks(tasks);
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
              {/* {tasks.length <= 1
                ? `${tasks.length} task for today`
                : `${tasks.length} tasks for today`} */}
            </Text>
          </View>
        </Link>
      </View>
      <NavBarKid></NavBarKid>
    </View>
  );
}
