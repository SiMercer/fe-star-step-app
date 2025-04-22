import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { editKidProfile, editReward, getKidById } from "../../utils/api";
import { useChild } from "@/contexts/ChildContext";

interface ItemBoxProps {
  reward: {
    reward_id: string;
    title: string;
    cost: number;
    redeemedBy: string;
    isRedeemed: boolean;
    createdBy: string;
  };
  totalStars: number;
  setTotalStars: React.Dispatch<React.SetStateAction<number>>;
}

export default function ChildsRewardsItem({
  reward,
  totalStars,
  setTotalStars,
}: ItemBoxProps) {
  const { selectedChild } = useChild();
  const [isRequested, setIsRequested] = useState(
    reward.redeemedBy === selectedChild._id
  );
  const [requestError, setRequestError] = useState("");
  // vvvvvvvvvvvvvvvvvvvvvvv use this when we have changed test data (redeemed by)
  // const [requestedBy, setRequestedBy] = useState("");
  // useEffect(() => {
  //   if (reward.redeemedBy !== selectedChild._id && !!reward.redeemedBy) {
  //     getKidById(reward.redeemedBy).then(({name}) => {
  //       setRequestedBy(name)
  //     });
  //   }
  // });
  function handleRequestPress(requestedState: boolean) {
    setIsRequested((currRequested) => !currRequested);
    setRequestError("");
    if (requestedState) {
      setTotalStars((totalStars += reward.cost));
      editReward(reward.reward_id, { $unset: { redeemedBy: "" } })
        .then(() => {
          editKidProfile(selectedChild._id, {
            stars: reward.cost,
          });
        })
        .catch(() => {
          setRequestError("Could not request, please try again.");
          setTotalStars((currStars) => (currStars -= reward.cost));
          setIsRequested((currRequested) => !currRequested);
        });
    } else if (totalStars < reward.cost) {
      setRequestError("Not enough stars!");
      setIsRequested((currRequested) => !currRequested);
    } else {
      setTotalStars((totalStars -= reward.cost));
      editReward(reward.reward_id, { redeemedBy: selectedChild._id })
        .then(() => {
          editKidProfile(selectedChild._id, {
            stars: -reward.cost,
          });
        })
        .catch(() => {
          setRequestError("Could not request, please try again.");
          setTotalStars((currStars) => (currStars += reward.cost));
          setIsRequested((currRequested) => !currRequested);
        });
    }
  }
  return reward.isRedeemed && reward.redeemedBy !== selectedChild._id ? null : (
    <View>
      <View
        style={
          reward.isRedeemed && reward.redeemedBy === selectedChild._id
            ? styles.redeemed
            : reward.redeemedBy === selectedChild._id || !reward.redeemedBy
            ? styles.default
            : styles.greyed
        }
      >
        <Text style={{ width: "40%" }}>{reward.title}</Text>
        <Text style={{ alignSelf: "center" }}>{reward.cost + "⭐"}</Text>
        <View style={{ width: "40%", alignItems: "flex-end" }}>
          {reward.isRedeemed ? (
            <Text>Redeemed!!!</Text>
          ) : reward.redeemedBy !== selectedChild._id && reward.redeemedBy ? (
            <Text>Requested by someone else</Text>
          ) : (
            <>
              <Pressable
                style={styles.sliderOutline}
                onPress={() => handleRequestPress(isRequested)}
              >
                <View
                  style={isRequested ? styles.slider : styles.sliderRequested}
                ></View>
              </Pressable>
              <View>
                <Text>{isRequested ? "Requested!" : "Request?"}</Text>
              </View>
            </>
          )}
        </View>
      </View>
      <Text>{requestError}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  default: {
    height: 70,
    width: "100%",
    padding: 10,
    marginBottom: 5,
    borderWidth: 5,
    borderColor: "#000",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  redeemed: {
    height: 70,
    width: "100%",
    padding: 10,
    marginBottom: 5,
    borderWidth: 5,
    borderColor: "#000",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#0f0",
  },
  greyed: {
    height: 70,
    width: "100%",
    padding: 10,
    marginBottom: 5,
    borderWidth: 5,
    borderColor: "#000",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#aaa",
  },
  slider: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: "#000",
    alignSelf: "flex-end",
    margin: 5,
  },
  sliderRequested: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: "#000",
    alignSelf: "flex-start",
    margin: 5,
  },
  sliderOutline: {
    height: 24,
    width: 45,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#000",
    justifyContent: "center",
  },
});
