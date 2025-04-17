import React from "react";
import { View } from "react-native";
import RewardCard from "./reward-cards";

type Reward = {
  reward_id: string;
  title: string;
  cost: number;
  isRedeemed: boolean;
  createdBy: string;
};

type RewardCardListProps = {
  rewards: Reward[];
};

export default function RewardCardList({ rewards }: RewardCardListProps) {
  return (
    <View>
      {rewards.map((reward) => (
        <RewardCard key={reward.reward_id} reward={reward} />
      ))}
    </View>
  );
}
