import React, { useEffect, useState } from "react";
import { ScrollView, Text, View, StyleSheet, Button } from "react-native";
import RewardCardList from "./reward-cardlist";
// import AddRewardForm from "./add-rewards";
import { router } from "expo-router";
import { getRewardsByParent } from "@/utils/api";

interface Rewards {
  reward_id: string;
  title: string;
  cost: number;
  redeemedBy: string;
  isRedeemed: boolean;
  createdBy: string;
}

export default function ParentRewardsScreen() {
  const [rewards, setRewards] = useState<Rewards[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    getRewardsByParent("000000000000000000000001")
      .then(({ rewards }) => {
        setRewards(rewards);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [refreshKey]);

  const handleAddReward = (title: string, cost: number) => {
    const newReward: Rewards = {
      reward_id: "",
      title,
      cost,
      redeemedBy: "", // Initialize as empty
      isRedeemed: false,
      createdBy: "",
    };
    setRewards((prev) => [...prev, newReward]);
  };
  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1); // This will automatically refresh after deletion of reward
  };

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Rewards</Text>
      <RewardCardList
        key={refreshKey}
        rewards={rewards}
        onRefresh={handleRefresh}
      />

      <Text style={[styles.heading, { marginTop: 24 }]}>Create a Reward</Text>

      <AddRewardForm onRewardAdded={handleAddReward} />

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
