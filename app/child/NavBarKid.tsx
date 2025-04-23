import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Button } from "react-native";
import { View } from "react-native";

export default function NavBarKid() {
  return (
    <View style={styles.main}>
      <Link href="/child" asChild>
        <TouchableOpacity onPress={() => {}} style={styles.dashboardButton}>
          <Text style={styles.text}>Dashboard</Text>
        </TouchableOpacity>
      </Link>
      <Link href="/child/tasks" asChild>
        <TouchableOpacity onPress={() => {}} style={styles.tasksButton}>
          <Text style={styles.text}>Tasks</Text>
        </TouchableOpacity>
      </Link>
      <Link href="/child/rewards" asChild>
        <TouchableOpacity onPress={() => {}} style={styles.rewardsButton}>
          <Text style={styles.text}>Rewards</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
const styles = StyleSheet.create({
  main: {
    flexShrink: 1,
    flexDirection: "row",
    // width: "100%",
    justifyContent: "center",
    gap: 3,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  dashboardButton: {
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15,
    width: "40%",
    height: 80,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#7697F9",
  },
  tasksButton: {
    width: "30%",
    height: 80,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#7697F9",
  },
  rewardsButton: {
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
    width: "30%",
    height: 80,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#7697F9",
  },
  text: { fontFamily: "H2", color: "#FFFEFF", fontSize: 20 },
});
