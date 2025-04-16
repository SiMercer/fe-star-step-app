import { View, Text, Button } from "react-native";
import { Link } from "expo-router";

export default function ChildTasksScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "space-between", padding: 20 }}>
      <Text style={{ fontSize: 24, marginTop: 20 }}>Tasks</Text>


      <View style={{ flexDirection: "row", justifyContent: "space-around", marginBottom: 20 }}>
        <Link href="/child" asChild>
          <Button title="Dashboard" onPress={() => {}} />
        </Link>
        <Link href="/child/tasks" asChild>
          <Button title="Tasks" onPress={() => {}} />
        </Link>
        <Link href="/child/rewards" asChild>
          <Button title="Rewards" onPress={() => {}} />
        </Link>
      </View>
    </View>
  );
}
