import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { editReward } from "../../utils/api";

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
  // When we have contexts replace this with context
  const childContextTemp = "000000000000000000000002";
  const [isRequested, setIsRequested] = useState(
    reward.redeemedBy === childContextTemp
  );
  function handleRequestPress() {
    setIsRequested(!isRequested);
    if (isRequested) {
      editReward(reward.reward_id, { $unset: { redeemedBy: "" } });
    } else {
      editReward(reward.reward_id, { redeemedBy: childContextTemp });
    }
  }
  return reward.isRedeemed && reward.redeemedBy !== childContextTemp ? null : (
    <View
      style={
        reward.isRedeemed && reward.redeemedBy === childContextTemp
          ? styles.redeemed
          : reward.redeemedBy === childContextTemp || !reward.redeemedBy
          ? styles.default
          : styles.greyed
      }
    >
      <Text style={{ width: "40%" }}>{reward.title}</Text>
      <Text style={{ alignSelf: "center" }}>{reward.cost + "⭐"}</Text>
      <View style={{ width: "40%", alignItems: "flex-end" }}>
        {reward.isRedeemed ? (
          <Text>Redeemed!!!</Text>
        ) : reward.redeemedBy !== childContextTemp && reward.redeemedBy ? (
          <Text>Requested by Kid 2</Text>
        ) : (
          <>
            <Pressable
              style={styles.sliderOutline}
              onPress={handleRequestPress}
            >
              <View
                style={isRequested ? styles.slider : styles.sliderRequested}
              ></View>
            </Pressable>
            <View>
              <Text>{isRequested ? "Requested!" : "Request?"}</Text>
            </View>
          </>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  default: {
    height: 70,
    width: "100%",
    padding: 10,
    marginBottom: 5,
    borderWidth: 5,
    borderColor: "#000",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  redeemed: {
    height: 70,
    width: "100%",
    padding: 10,
    marginBottom: 5,
    borderWidth: 5,
    borderColor: "#000",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#0f0",
  },
  greyed: {
    height: 70,
    width: "100%",
    padding: 10,
    marginBottom: 5,
    borderWidth: 5,
    borderColor: "#000",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#aaa",
  },
  slider: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: "#000",
    alignSelf: "flex-end",
    margin: 5,
  },
  sliderRequested: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: "#000",
    alignSelf: "flex-start",
    margin: 5,
  },
  sliderOutline: {
    height: 24,
    width: 45,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#000",
    justifyContent: "center",
  },
});
