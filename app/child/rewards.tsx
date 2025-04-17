import { View, Text, Button, ActivityIndicator } from "react-native";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import ChildsRewardsItem from "./rewardsItem";
import { getRewardsByParent } from "../../utils/api";

interface Rewards {
  reward_id: string;
  title: string;
  cost: number;
  redeemedBy: string;
  isRedeemed: boolean;
  createdBy: string;
}

export default function ChildRewardsScreen() {
  const [rewards, setRewards] = useState<Rewards[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    setIsLoading(true);
    getRewardsByParent("000000000000000000000001").then(
      ({ rewards }: { rewards: Rewards[] }) => {
        setRewards(rewards);
        setIsLoading(false);
      }
    );
  }, []);
  return (
    <View style={{ flex: 1, justifyContent: "space-between", padding: 20 }}>
      <Text style={{ fontSize: 24, marginTop: 20 }}>Rewards</Text>
      {!isLoading ? (
        <View style={{ height: "80%", justifyContent: "flex-start" }}>
          {rewards.map((reward: Rewards) => {
            return <ChildsRewardsItem key={reward.reward_id} reward={reward} />;
          })}
        </View>
      ) : (
        <ActivityIndicator />
      )}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginBottom: 20,
        }}
      >
        <Link href="/child" asChild>
          <Button title="Dashboard" onPress={() => {}} />
        </Link>
        <Link href="/child/tasks" asChild>
          <Button title="Tasks" onPress={() => {}} />
        </Link>
        <Link href="/child/rewards" asChild>
          <Button title="Rewards" onPress={() => {}} />
        </Link>
      </View>
    </View>
  );
}
