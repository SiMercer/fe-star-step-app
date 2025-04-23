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
      {!parent ? (
        <Button title="Log In First" onPress={login} />
      ) : (
        <>
          {/* <Button title="Add Default Child" onPress={handleAddDefaultChild} /> */}
          <View style={{ marginTop: 16 }}>
            <Button
              title="Back to Dashboard"
              onPress={() => router.push("/parent")}
            />
          </View>
        </>
      )}
      <View>
        <View style={styles.header}>
          <Text>Create kid account</Text>
        </View>
        <View style={styles.kidNameContainer}>
          <Text>Kid's name:</Text>
          <TextInput
            value={name}
            placeholder="kid name"
            style={{ backgroundColor: "pink" }}
            onChangeText={(value) => {
              setName(value);
            }}
          />
        </View>
        <View style={styles.kidAgeContainer}>
          <Text>Kid's age:</Text>
          <TextInput
            placeholder="kid's age"
            style={{ backgroundColor: "pink" }}
            onChangeText={(value) => {
              setAge(value);
            }}
            value={age}
          />
        </View>
        <View>
          <Text>Choose avatar</Text>
        </View>
        <View style={styles.avatarContainer}>
          <TextInput
            placeholder="paste the link here"
            value={img}
            style={{ backgroundColor: "pink" }}
            onChangeText={(value) => {
              setImg(value);
            }}
          />

          {img ? (
            <View>
              <Image source={{ uri: img }} style={styles.avatar} />
            </View>
          ) : (
            <View>
              <Image
                source={require("../../assets/images/react-logo.png")}
                style={styles.avatar}
              ></Image>
            </View>
          )}
        </View>
        <View>
          <Button title="Create Kid's account" onPress={createKidsAcc} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  heading: { fontSize: 24, fontWeight: "bold", marginBottom: 12 },
  avatar: { height: 200, width: 200 },
  header: {
    display: "flex",
    backgroundColor: "grey",
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  kidNameContainer: {
    height: 50,
    display: "flex",
  },
  kidAgeContainer: {
    height: 50,
    display: "flex",
  },
  avatarContainer: {
    height: 50,
    display: "flex",
  },
});
