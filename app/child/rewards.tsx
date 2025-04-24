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
        <Text
          style={{
            fontSize: 35,
            marginTop: 20,
            fontFamily: "Titles",
            color: "#7697F9",
          }}
        >
          Rewards
        </Text>
        <StyledText style={{ fontSize: 18, marginTop: 10, color: "red" }}>
          No child selected.
        </StyledText>
      </View>
    );
  }
  return (
    <View style={styles.main}>
      <View style={styles.containerLighter}>
        <View style={styles.header}>
          <Text
            style={{ fontFamily: "Titles", fontSize: 35, color: "#7697F9" }}
          >
            {selectedChild.name}'s Rewards
          </Text>
        </View>
        <Text style={{ fontFamily: "H2", fontSize: 24 }}>
          Total Stars: {totalStars}⭐
        </Text>
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
        <View style={{ marginTop: 60 }}></View>
        <NavBarKid />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "space-between",
    padding: 30,
    backgroundColor: "#D1DBFF",
  },
  containerLighter: {
    padding: 20,
    width: "100%",
    gap: 30,
    backgroundColor: "#EBECFF",
    flexDirection: "column",
    borderRadius: 15,
    height: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  header: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
