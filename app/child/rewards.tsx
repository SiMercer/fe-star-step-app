import {
  View,
  Text,
  Button,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import ChildsRewardsItem from "./rewardsItem";
import { getKidById, getRewardsByParent } from "../../utils/api";
import { useChild } from "@/contexts/ChildContext";
import { useAuth } from "@/hooks/useAuth";
import NavBarKid from "./NavBarKid";
import { StyledText } from "@/contexts/fonts";

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
        <StyledText style={{ fontSize: 24, marginTop: 20 }}>Rewards</StyledText>
        <StyledText style={{ fontSize: 18, marginTop: 10, color: "red" }}>
          No child selected.
        </StyledText>
      </View>
    );
  }
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
        padding: 30,
        backgroundColor: "#EBECFF",
      }}
    >
      <View style={styles.header}>
        <StyledText style={{ fontSize: 24 }}>
          {selectedChild.name}'s Rewards
        </StyledText>
      </View>
      <StyledText>Total Stars: {totalStars}⭐</StyledText>
      {!isLoading ? (
        listRewards.length === 0 ? (
          <StyledText>There are no rewards</StyledText>
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
          marginTop: 100,
        }}
      >
        <NavBarKid />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
