import React, { useState } from "react";
import { View, Text, ActivityIndicator, Alert, StyleSheet } from "react-native";
import RewardCard from "./reward-cards";
import { deleteRewardById } from "@/utils/api";

interface Reward {
  reward_id: string;
  title: string;
  cost: number;
  redeemedBy: string;
  isRedeemed: boolean;
  createdBy: string;
}

interface RewardCardListProps {
  rewards?: Reward[];
  onRefresh?: () => void;
  onEditReward?: (reward: Reward) => void;
}

export default function RewardCardList({
  rewards = [],
  onRefresh,
  onEditReward,
}: RewardCardListProps) {
  const [isLoading, setIsLoading] = useState<string | null>(null); // Track which reward is loading
  const [error, setError] = useState<string | null>(null);

  const handleDelete = (rewardId: string) => {
    // Creating confirmation delete , only apear via expoGo

    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this reward?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteReward(rewardId),
        },
      ]
    );
  };

  const deleteReward = async (rewardId: string) => {
    console.log(rewardId);
    setIsLoading(rewardId);
    setError(null);

    try {
      await deleteRewardById(rewardId);
      // Call refresh callback if provided
      if (onRefresh) {
        onRefresh();
      }
    } catch (err) {
      setError("Failed to delete reward");
    } finally {
      setIsLoading(null);
    }
  };

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Text style={styles.retryText} onPress={() => setError(null)}>
          Try again
        </Text>
      </View>
    );
  }

  if (rewards.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.noRewardsText}>No rewards available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {rewards.map((reward) => (
        <View key={reward.reward_id}>
          <RewardCard
            reward={reward}
            handleDelete={handleDelete}
            handleEdit={onEditReward}
            isDeleting={isLoading === reward.reward_id}
          />
          {isLoading === reward.reward_id && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="small" color="#0000ff" />
            </View>
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
    paddingBottom: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  noRewardsText: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
  },
  errorText: {
    color: "#ff4444",
    textAlign: "center",
    marginBottom: 8,
  },
  retryText: {
    color: "#1a73e8",
    textDecorationLine: "underline",
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255,255,255,0.7)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
});
