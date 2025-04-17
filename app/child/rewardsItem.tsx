import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface ItemBoxProps {
  reward: {
    reward_id: string;
    title: string;
    cost: number;
    redeemedBy: string;
    isRedeemed: boolean;
    createdBy: string;
  };
}

export default function ChildsRewardsItem({ reward }: ItemBoxProps) {
  const [isRequested, setIsRequested] = useState(reward.isRedeemed);
  return (
    <View style={styles.default}>
      <Text style={{ width: "40%" }}>{reward.title}</Text>
      <Text style={{ alignSelf: "center" }}>{reward.cost + "⭐"}</Text>
      <View style={{ width: "40%", alignItems: "flex-end" }}>
        <Pressable
          style={{
            height: 24,
            width: 45,
            borderRadius: 12,
            borderWidth: 2,
            borderColor: "#000",
            justifyContent: "center",
          }}
          onPress={() => {
            setIsRequested(!isRequested);
          }}
        >
          <View
            style={isRequested ? styles.slide : styles.slideRequested}
          ></View>
        </Pressable>
        <View>
          <Text>{isRequested ? "Requested!" : "Request?"}</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  default: {
    width: "100%",
    padding: 10,
    borderWidth: 5,
    borderColor: "#000",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  redeemed: {
    width: "100%",
    padding: 10,
    borderWidth: 5,
    borderColor: "#000",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "0f0",
  },
  slide: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: "#000",
    alignSelf: "flex-end",
    margin: 5,
  },
  slideRequested: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: "#000",
    alignSelf: "flex-start",
    margin: 5,
  },
});
