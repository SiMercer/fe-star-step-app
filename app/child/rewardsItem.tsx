import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { editKidProfile, editReward, getKidById } from "../../utils/api";
import { useChild } from "@/contexts/ChildContext";
import { StyledText } from "@/contexts/fonts";

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
  const [requestedBy, setRequestedBy] = useState("");
  useEffect(() => {
    if (reward.redeemedBy !== selectedChild._id && !!reward.redeemedBy) {
      getKidById(reward.redeemedBy).then(({ name }) => {
        setRequestedBy(name);
      });
    }
  });
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
  if (reward.isRedeemed && reward.redeemedBy !== selectedChild._id) {
    return null;
  } else if (reward.isRedeemed && reward.redeemedBy === selectedChild._id) {
    return (
      <View>
        <View style={styles.redeemed}>
          <View>
            <Text style={[styles.taskTextLg, { color: "white" }]}>
              {reward.title}
            </Text>
            <Text style={[styles.taskTextSm, { color: "white" }]}>
              {reward.cost + "⭐"}
            </Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={[styles.taskTextSm, { color: "white" }]}>
              🎉 Redeemed!!!
            </Text>
          </View>
        </View>
        <StyledText>{requestError}</StyledText>
      </View>
    );
  } else if (reward.redeemedBy === selectedChild._id || !reward.redeemedBy) {
    return (
      <View>
        <View style={styles.default}>
          <View>
            <Text style={[styles.taskTextLg, { color: "white" }]}>
              {reward.title}
            </Text>
            <Text style={[styles.taskTextSm, { color: "white" }]}>
              {reward.cost + "⭐"}
            </Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Pressable
              style={styles.sliderOutline}
              onPress={() => handleRequestPress(isRequested)}
            >
              <View
                style={
                  isRequested
                    ? [
                        styles.slider,
                        { backgroundColor: "white", borderColor: "white" },
                      ]
                    : [styles.sliderRequested, { backgroundColor: "white" }]
                }
              ></View>
            </Pressable>
            <View>
              <Text style={[styles.taskTextSm, { color: "white" }]}>
                {isRequested ? "⌛ Waiting" : "🖐️ Request"}
              </Text>
            </View>
          </View>
        </View>
        <StyledText>{requestError}</StyledText>
      </View>
    );
  } else {
    return (
      <View>
        <View style={styles.greyed}>
          <View>
            <Text style={styles.taskTextLg}>{reward.title}</Text>
            <Text style={styles.taskTextSm}>{reward.cost + "⭐"}</Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={styles.taskTextSm}>🔒 Requested by {requestedBy}</Text>
          </View>
        </View>
        <StyledText>{requestError}</StyledText>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  default: {
    height: 70,
    width: "100%",
    padding: 16,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: "#7697F9",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  redeemed: {
    height: 70,
    width: "100%",
    padding: 16,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#77DD77",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  greyed: {
    height: 70,
    width: "100%",
    padding: 16,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: "#D1DBFF",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  slider: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: "white",
    alignSelf: "flex-end",
    margin: 5,
  },
  sliderRequested: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: "white",
    alignSelf: "flex-start",
    margin: 5,
  },
  sliderOutline: {
    height: 24,
    width: 45,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "white",
    justifyContent: "center",
  },
  taskTextLg: {
    fontFamily: "H2",
    fontSize: 25,
  },
  taskTextSm: {
    fontFamily: "H2",
    fontSize: 17,
  },
});
