import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

type Reward = {
  reward_id: string;
  title: string;
  cost: number;
  redeemedBy: string;
  isRedeemed: boolean;
  createdBy: string;
};

type RewardCardProps = {
  reward: Reward;
  handleDelete: (rewardId: string) => void;
  isDeleting?: boolean;
};

export default function RewardCard({
  reward,
  handleDelete,
  isDeleting,
}: RewardCardProps) {
  return (
    <View
      style={styles.card}
      accessible={true}
      accessibilityLabel={`Reward: ${reward.title}, Cost: ${reward.cost} points`}
    >
      <Text style={styles.title}>{reward.title}</Text>
      <Text style={styles.text}>Cost: {reward.cost} points</Text>
      <Text
        style={[
          styles.text,
          styles.status,
          reward.isRedeemed && { color: "#ff4444" },
        ]}
      >
        Status: {reward.isRedeemed ? "Redeemed" : "Available"}
      </Text>
      {reward.isRedeemed && reward.redeemedBy && (
        <Text style={[styles.text, { color: "#888" }]}>
          Redeemed by: {reward.redeemedBy}
        </Text>
      )}

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={() => handleDelete(reward.reward_id)}
          disabled={isDeleting}
          accessibilityLabel="Delete reward"
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginBottom: 12,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    marginBottom: 4,
    color: "#333",
  },
  status: {
    color: "#666",
    fontStyle: "italic",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
    gap: 8,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    minWidth: 80,
    alignItems: "center",
  },
  editButton: {
    backgroundColor: "#4CAF50",
  },
  deleteButton: {
    backgroundColor: "#f44336",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
