import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Button,
  Modal,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import RewardCardList from "./reward-cardlist";
import AddRewardForm from "./add-rewards";
import { router } from "expo-router";
import { editReward, getRewardsByParent } from "@/utils/api";
import { useAuth } from "@/hooks/useAuth";
import { StyledText } from "@/contexts/fonts";

interface Rewards {
  reward_id: string;
  title: string;
  cost: number;
  redeemedBy: string;
  isRedeemed: boolean;
  createdBy: string;
}

export default function ParentRewardsScreen({
  parentId,
}: {
  parentId: string;
}) {
  const [rewards, setRewards] = useState<Rewards[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditReward, setCurrentEditReward] = useState<Rewards | null>(
    null
  );
  const { parent } = useAuth();

  useEffect(() => {
    setIsLoading(true);
    getRewardsByParent(parent?._id)
      .then(({ rewards }) => {
        console.log(rewards);
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
      redeemedBy: "",
      isRedeemed: false,
      createdBy: parentId,
    };
    setRewards((prev) => [...prev, newReward]);
  };

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const handleEditReward = (reward: Rewards) => {
    setCurrentEditReward(reward);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setCurrentEditReward(null);
  };

  const handleUpdateReward = async (
    rewardId: string,
    title: string,
    cost: number
  ) => {
    try {
      await editReward(rewardId, { title, cost });

      setRewards((prev) =>
        prev.map((reward) =>
          reward.reward_id === rewardId ? { ...reward, title, cost } : reward
        )
      );

      handleCancelEdit();
      setRefreshKey((prev) => prev + 1);
    } catch (error) {
      console.error("Failed to update reward:", error);
    }
  };

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <View style={styles.screenContainer}>
      <TouchableOpacity
        onPress={() => router.push("/parent")}
        style={styles.dashboardIcon}
      >
        <FontAwesome name="home" size={24} color={COLORS.darkBlue} />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.container}>
        <StyledText style={{ fontSize: 40, color: "#7697F9", marginTop: 10 }}>
          {" "}
          Rewards{" "}
        </StyledText>
        <RewardCardList
          key={refreshKey}
          rewards={rewards}
          onRefresh={handleRefresh}
          onEditReward={handleEditReward}
        />

        <Text style={[styles.heading, { marginTop: 24 }]}>Create a Reward</Text>
        <AddRewardForm parentId={parentId} onRewardAdded={handleAddReward} />

        {/* Edit Reward Modal */}
        <Modal
          visible={isEditing}
          animationType="slide"
          onRequestClose={handleCancelEdit}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Reward</Text>
              <TouchableOpacity
                onPress={handleCancelEdit}
                style={styles.closeButton}
              >
                <Text style={styles.closeButton}>×</Text>
              </TouchableOpacity>
            </View>

            <AddRewardForm
              parentId={parentId}
              rewardToEdit={currentEditReward}
              onRewardUpdated={handleUpdateReward}
              onCancel={handleCancelEdit}
            />
          </View>
        </Modal>
      </ScrollView>
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
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.offWhite,
  },
  dashboardIcon: {
    position: "absolute",
    top: 15,
    left: 15,
    zIndex: 10,
    padding: 10,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.darkBlue,
  },
  container: {
    padding: 20,
    paddingTop: 100,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.darkBlue,
    marginBottom: 20,
    marginTop: 100,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    paddingTop: 50,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightBlue,
  },
  subHeading: {
    fontSize: 22,
    fontWeight: "600",
    color: COLORS.darkBlue,
    marginTop: 25,
    marginBottom: 15,
  },
  dashboardButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: COLORS.lightBlue,
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.offWhite,
    paddingTop: 50,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightBlue,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.darkBlue,
  },
  closeButton: {
    padding: 8,
  },
});
