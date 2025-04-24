import { editReward, getKidById } from "@/utils/api";
import React, { useEffect, useState } from "react";
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
  const [kidName, setKidName] = useState("Loading...");
  const [grant, setGranted] = useState(reward.isRedeemed);

  useEffect(() => {
    const fetchKid = async () => {
      try {
        const kid = await getKidById(reward.redeemedBy);
        setKidName(kid.name);
      } catch (err) {
        setKidName("Unknown");
        console.error("Failed to fetch kid data", err);
      }
    };
    if (reward.redeemedBy) fetchKid();
  }, [reward.redeemedBy]);

  const handleGrant = async () => {
    try {
      await editReward(reward.reward_id, { isRedeemed: true });
      setGranted(true);
    } catch (err) {
      console.error("Failed to grant reward", err);
    }
  };

  const isRequested = reward.redeemedBy && !grant;

  return (
    <View
      style={[styles.card, isRequested && { backgroundColor: COLORS.offWhite }]}
      accessible={true}
      accessibilityLabel={`Reward: ${reward.title}, Stars: ${reward.cost} ⭐ `}
    >
      <Text style={styles.title}>{reward.title}</Text>
      <Text style={styles.text}>Stars: {reward.cost} ⭐ </Text>

      {/* Grant button */}
      {isRequested && (
        <TouchableOpacity
          style={[styles.button, styles.grantButton]}
          onPress={handleGrant}
          accessibilityLabel="Grant reward"
        >
          <Text style={styles.grantButtonText}>Grant</Text>
        </TouchableOpacity>
      )}

      <Text
        style={[
          styles.text,
          (reward.isRedeemed || grant) && { color: "#ff4444" },
        ]}
      >
        Status: {reward.redeemedBy ? `requested by ${kidName}` : "available"}
      </Text>

      {(reward.isRedeemed || grant) && reward.redeemedBy && (
        <Text style={[styles.text, { color: "#888" }]}>
          Redeemed by: {kidName}
        </Text>
      )}

      {/* Action buttons */}
      <View style={styles.buttonsContainer}>
        {handleEdit && !grant && (
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
  pink: "#FFA1C6",
  lightBlue: "#D1DBFF",
  darkBlue: "#7697F9",
  white: "#FFFEFF",
  offWhite: "#F0F0F0", // More visibly grey background
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
  grantButton: {
    backgroundColor: COLORS.darkBlue,
    alignSelf: "center",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginTop: 10,
  },
  grantButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "600",
  },
});
