import React, { useEffect, useState } from "react";
import { View, Text, Button, Image } from "react-native";
import { useRouter, Link } from "expo-router";
import { useChild } from "../../contexts/ChildContext";
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
  const { selectedChild } = useChild();

  return (
    <View style={{ flex: 1, justifyContent: "space-between", padding: 20 }}>
      <Text style={{ fontSize: 24, marginTop: 20 }}>Child Dashboard</Text>

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
          flexDirection: "row",
          justifyContent: "space-around",
          marginBottom: 20,
        }}
      >
        <Link href="/child" asChild>
          <Button title="Dashboard" onPress={() => {}} />
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
