import React, { useState } from "react";
import { ScrollView, Text, View, StyleSheet, Button } from "react-native";
import RewardCardList from "./reward-cardlist";
import AddRewardForm from "./add-rewards";

export default function ParentRewardsScreen() {
  const [rewards, setRewards] = useState([
    {
      reward_id: "1",
      title: "Extra Screen Time",
      cost: 5,
      isRedeemed: false,
      createdBy: "parent1",
    },
    {
      reward_id: "2",
      title: "Trip to Park",
      cost: 3,
      isRedeemed: true,
      createdBy: "parent1",
    },
  ]);

  const handleAddReward = (title: string, cost: number) => {
    const newReward = {
      reward_id: (rewards.length + 1).toString(),
      title,
      cost,
      isRedeemed: false,
      createdBy: "parent1",
    };
    setRewards((prevRewards) => [...prevRewards, newReward]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Rewards</Text>
      <RewardCardList rewards={rewards} />

      <Text style={[styles.heading, { marginTop: 24 }]}>Create a Reward</Text>
      <AddRewardForm onAddReward={handleAddReward} />

      <Button
        title="Back to Dashboard"
        onPress={() => router.push("/parent")}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
  },
});
