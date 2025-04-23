import {
  View,
  Text,
  Button,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import ChildsRewardsItem from "./rewardsItem";
import { getKidById, getRewardsByParent } from "../../utils/api";
import { useChild } from "@/contexts/ChildContext";
import { useAuth } from "@/hooks/useAuth";

interface Rewards {
  reward_id: string;
  title: string;
  cost: number;
  redeemedBy: string;
  isRedeemed: boolean;
  createdBy: string;
}

export default function ChildRewardsScreen() {
  const [listRewards, setListRewards] = useState<Rewards[]>([]);
  const [totalStars, setTotalStars] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { selectedChild } = useChild();
  const { parent } = useAuth();
  useEffect(() => {
    if (selectedChild) {
      setIsLoading(true);
      getKidById(selectedChild._id).then(({ stars }) => {
        setTotalStars(stars);
      });
      getRewardsByParent(parent?._id).then(
        ({ rewards }: { rewards: Rewards[] }) => {
          setListRewards(rewards);
          setIsLoading(false);
        }
      );
    }
  }, []);
  if (!selectedChild) {
    return (
      <View style={{ flex: 1, padding: 20 }}>
        <Text style={{ fontSize: 24, marginTop: 20 }}>Rewards</Text>
        <Text style={{ fontSize: 18, marginTop: 10, color: "red" }}>
          No child selected.
        </Text>
      </View>
    );
  }
  return (
    <View style={{ flex: 1, justifyContent: "space-between", padding: 20 }}>
      <Text style={{ fontSize: 24, marginTop: 20 }}>Rewards</Text>
      <Text>Total Stars: {totalStars}⭐</Text>
      {!isLoading ? (
        listRewards.length === 0 ? (
          <Text>There are no rewards</Text>
        ) : (
          <ScrollView contentContainerStyle={{ padding: 10 }}>
            {listRewards.map((reward: Rewards) => {
              return (
                <ChildsRewardsItem
                  key={reward.reward_id}
                  reward={reward}
                  totalStars={totalStars}
                  setTotalStars={setTotalStars}
                />
              );
            })}
          </ScrollView>
        )
      ) : (
        <ActivityIndicator />
      )}
      <View
        style={{
          padding: 10,
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
