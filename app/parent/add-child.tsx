import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  ActivityIndicator,
  TextInput,
  Image,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../hooks/useAuth";
import { createKidProfile } from "@/utils/api";
import { useChild } from "@/contexts/ChildContext";

export default function ParentAddChildScreen() {
  const router = useRouter();
  const { parent, isLoading, login } = useAuth();
  // const { setSelectedChild } = useChild();
  const [img, setImg] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<string>("");

  async function createKidsAcc() {
    if (!img || !name || !age) {
      Alert.alert("Please fill in all fields");
      return;
    }

    const kidData = {
      name,
      age: Number(age),
      parentID: parent._id,
      avatar: img,
    };
    try {
      const createdKidProfile = await createKidProfile(kidData);
      if (createdKidProfile) {
        // setSelectedChild(createdKidProfile);
        router.push("/parent");
      }
    } catch {
      console.log("error");
    } finally {
      setAge("");
      setImg("");
      setAge("");
    }
  }

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  // console.log(img, age, name);
  return (
    <View style={styles.container}>
      <View style={styles.containerLighter}>
        <Pressable
          onPress={() => router.push("/parent")}
          style={{ alignItems: "flex-end" }}
        >
          <View
            style={{
              width: 30,
              height: 30,

              borderRadius: 25,
            }}
          >
            <Text style={{ fontSize: 30 }}>↪️</Text>
          </View>
        </Pressable>
        <View style={styles.headerContainer}>
          <View>
            <Text style={{ fontSize: 30 }}>⭐️</Text>
          </View>
          <View style={styles.header}>
            <Text
              style={{
                fontFamily: "Titles",
                fontSize: 35,
                color: "#7697F9",
                fontWeight: "bold",
              }}
            >
              Create kid account
            </Text>
          </View>
          <View>
            <Text style={{ fontSize: 30 }}>⭐️</Text>
          </View>
        </View>
        <View style={styles.nameAgeContainer}>
          <View style={styles.kidNameContainer}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={styles.inputLabel}>Kid's name:</Text>
            </View>
            <TextInput
              value={name}
              // placeholder="kid name"
              style={styles.inputStyle}
              onChangeText={(value) => {
                setName(value);
              }}
            />
          </View>
          <View style={styles.kidAgeContainer}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={styles.inputLabel}>Kid's age:</Text>
              <TextInput
                // placeholder="kid's age"
                style={styles.inputStyle}
                onChangeText={(value) => {
                  setAge(value);
                }}
                value={age}
              />
            </View>
          </View>
        </View>

        <View style={styles.avatarLabelInput}>
          <View>
            <Text style={styles.inputLabel}>Choose kid's avatar</Text>
          </View>
          <View style={styles.avatarContainer}>
            <TextInput
              placeholder="paste the link here"
              value={img}
              style={styles.inputStyle}
              onChangeText={(value) => {
                setImg(value);
              }}
            />
          </View>
        </View>
        {img ? (
          <View style={styles.imgContainer}>
            <Image source={{ uri: img }} style={styles.avatar} />
          </View>
        ) : (
          <View style={styles.imgContainer}>
            <Image
              source={require("../../assets/icons/logoStar.png")}
              style={styles.avatar}
            ></Image>
          </View>
        )}
        <View style={{ alignItems: "center" }}>
          <Pressable
            className="buttonCreate"
            onPress={createKidsAcc}
            style={styles.buttonCreate}
          >
            <View>
              <Text
                style={{ color: "#FFFEFF", fontFamily: "Titles", fontSize: 22 }}
              >
                Create Kid's account{" "}
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: "100%",
    backgroundColor: "#D1DBFF",
    flexDirection: "column",
    height: "100%",
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
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },

  headerContainer: {
    width: "98%",
    flexDirection: "row-reverse",
    justifyContent: "space-around",
    alignItems: "center",
  },
  header: {
    flexShrink: 1,
    width: "98%",
    marginTop: 10,
    marginBottom: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  nameAgeContainer: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
  },
  kidNameContainer: {
    width: "48%",
    justifyContent: "center",
    backgroundColor: "#FFFEFF",
    height: 100,
    flexDirection: "column",
    borderRadius: 15,
    alignContent: "center",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },

  kidAgeContainer: {
    width: "48%",
    padding: 10,
    justifyContent: "center",
    backgroundColor: "#FFFEFF",
    height: 100,
    overflow: "hidden",
    flexDirection: "column",
    borderRadius: 15,
    alignContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  inputStyle: {
    width: "98%",
    fontFamily: "BubbleFont",
    borderRadius: 15,
    height: 50,
    backgroundColor: "#FFA1C6",
    fontSize: 22,
  },
  avatarAndFormContainer: {
    alignItems: "center",

    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    height: 200,
  },
  avatarLabelInput: {
    padding: 10,
    justifyContent: "center",
    backgroundColor: "#FFFEFF",
    height: 100,
    flexDirection: "column",
    borderRadius: 15,
    alignContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  inputLabel: {
    fontFamily: "Titles",
    fontSize: 22,
    color: "#7697F9",
  },
  avatarContainer: {
    height: 50,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 79,
    overflow: "hidden",
    borderColor: "yellow",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
  },
  imgContainer: {
    alignItems: "center",
  },
  // createProfileContainer: {
  //   alignItems: "center",

  // },
  buttonCreate: {
    backgroundColor: "#7697F9",
    width: "90%",
    height: 50,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
});
