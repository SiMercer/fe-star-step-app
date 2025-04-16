import { useState } from "react";
import { Pressable, Text, View } from "react-native";

export default function ChildsRewardsItem() {
  const [isRequested, setIsRequested] = useState(false);
  return (
    <View
      style={{
        width: "100%",
        padding: 10,
        borderWidth: 5,
        borderColor: "#000",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Text>Rewards text</Text>
    </View>
  );
}
