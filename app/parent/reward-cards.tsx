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
  handleEdit?: (reward: Reward) => void;

  isDeleting?: boolean;
};

export default function RewardCard({
  reward,
  handleDelete,
  handleEdit,
  isDeleting,
}: RewardCardProps) {
  return (
    <View
      style={styles.card}
      accessible={true}
      accessibilityLabel={`Reward: ${reward.title}, Stars: ${reward.cost} ⭐ `}
    >
      <Text style={styles.title}>{reward.title}</Text>
      <Text style={styles.text}>Stars: {reward.cost} ⭐ </Text>
      <Text style={[styles.text, reward.isRedeemed && { color: "#ff4444" }]}>
        Status: {reward.isRedeemed ? "Redeemed" : "Available"}
      </Text>
      {reward.isRedeemed && reward.redeemedBy && (
        <Text style={[styles.text, { color: "#888" }]}>
          Redeemed by: {reward.redeemedBy}
        </Text>
      )}

      <View style={styles.buttonsContainer}>
        {/* Only show edit button if not redeemed and edit handler provided */}
        {handleEdit && !reward.isRedeemed && (
          <TouchableOpacity
            style={[styles.button, styles.editButton]}
            onPress={() => handleEdit(reward)}
            disabled={isDeleting}
            accessibilityLabel="Edit reward"
          >
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
        )}
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

const COLORS = {
  pink: "#FFA1C6", // Primary accent color
  lightBlue: "#D1DBFF", // Secondary color
  darkBlue: "#7697F9", // Primary action color
  white: "#FFFEFF", // Pure white
  offWhite: "#EBECFF", // Background/light color
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginBottom: 15,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.lightBlue,
    shadowColor: COLORS.darkBlue,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.darkBlue,
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    marginBottom: 6,
    color: COLORS.darkBlue,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 12,
    gap: 10,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: "center",
  },
  editButton: {
    backgroundColor: COLORS.pink,
  },
  deleteButton: {
    backgroundColor: COLORS.lightBlue,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: "bold",
  },
});
