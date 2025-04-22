import { View, Text, Button, ActivityIndicator } from "react-native";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import ChildsRewardsItem from "./rewardsItem";
import { getKidById, getRewardsByParent } from "../../utils/api";

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
  useEffect(() => {
    setIsLoading(true);
    getKidById("000000000000000000000002").then(({ stars }) => {
      setTotalStars(stars);
      console.log(totalStars);
    });
    getRewardsByParent("auth0|test123").then(
      ({ rewards }: { rewards: Rewards[] }) => {
        setListRewards(rewards);
        setIsLoading(false);
      }
    );
  }, []);
  return (
    <View style={{ flex: 1, justifyContent: "space-between", padding: 20 }}>
      <Text style={{ fontSize: 24, marginTop: 20 }}>Rewards</Text>
      <Text>Total Stars: {totalStars}⭐</Text>
      {!isLoading ? (
        listRewards.length === 0 ? (
          <Text>There are no rewards</Text>
        ) : (
          <View style={{ height: "80%", justifyContent: "flex-start" }}>
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
          </View>
        )
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
