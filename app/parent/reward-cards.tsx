import React from "react";
import { View, Text, StyleSheet } from "react-native";

type Reward = {
  reward_id: string;
  title: string;
  cost: number;
  isRedeemed: boolean;
  createdBy: string;
};

type RewardCardProps = {
  reward: Reward;
};

export default function RewardCard({ reward }: RewardCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{reward.title}</Text>
      <Text>Cost: {reward.cost}</Text>
      <Text>Status: {reward.isRedeemed ? "Redeemed" : "Available"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
