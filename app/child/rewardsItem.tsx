import { useState } from "react";
import { Pressable, Text, View } from "react-native";

export default function ChildsRewardsItem() {
  const [isRequested, setIsRequested] = useState(false);
  return (
    <View
      style={{
        width: "100%",
        padding: 10,
        borderWidth: 5,
        borderColor: "#000",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Text>Rewards text</Text>
      <View style={{ alignItems: "flex-end" }}>
        <Pressable
          style={{
            height: 24,
            width: 45,
            borderRadius: 12,
            borderWidth: 2,
            borderColor: "#000",
            justifyContent: "center",
          }}
          onPress={() => {
            setIsRequested(!isRequested);
          }}
        >
          {isRequested ? (
            <View
              style={{
                height: 12,
                width: 12,
                borderRadius: 6,
                backgroundColor: "#000",
                alignSelf: "flex-end",
                margin: 5,
              }}
            ></View>
          ) : (
            <View
              style={{
                height: 12,
                width: 12,
                borderRadius: 6,
                backgroundColor: "#000",
                alignSelf: "flex-start",
                margin: 5,
              }}
            ></View>
          )}
        </Pressable>
        <View>{isRequested ? "Requested!" : "Request?"}</View>
      </View>
    </View>
  );
}
