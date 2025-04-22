import { Link } from "expo-router";
import { Text, TouchableOpacity } from "react-native";
import { Button } from "react-native";
import { View } from "react-native";

export default function NavBarKid() {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        width: "90%",
        justifyContent: "center",
        position: "fixed",
        bottom: "10px",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginBottom: 20,
          width: "100%",
        }}
      >
        <Link href="/child" asChild>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              width: 200,
              height: 80,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#FFA1C6",
            }}
          >
            <Text>Dashboard</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/child/tasks" asChild>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              width: 150,
              height: 80,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#FFA1C6",
            }}
          >
            <Text>Tasks</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/child/rewards" asChild>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              width: 150,
              height: 80,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#FFA1C6",
            }}
          >
            <Text>Rewards</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}
