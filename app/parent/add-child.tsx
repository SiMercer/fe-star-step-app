import React, { useState } from "react";
import { View, Text, StyleSheet, Button, Alert, ActivityIndicator, TextInput, Image } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../hooks/useAuth";
import * as ImagePicker from 'expo-image-picker';
import { createKidProfile } from "@/utils/api";
import * as ImageManipulator from 'expo-image-manipulator'

export default function ParentAddChildScreen() {
  const router = useRouter();
  const { parent, isLoading, login } = useAuth();
 const [img, setImg]=useState<String>('') 
 const [name, setName]=useState<String>('') 
 const [age, setAge]=useState<String>('') 
  const handleAddDefaultChild = async () => {
    if (!parent) {
      return Alert.alert("Error", "No parent is logged in");
    }

    try {
      const res = await fetch("https://be-star-step-app-dev.onrender.com/api/kids", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Default Child",
          age: 6,
          avatar: "https://example.com/default-avatar.png",
          parentID: parent._id,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || "Failed to create child");

      Alert.alert("Success", `Child "${data.name}" created!`);
      router.replace("/parent");
    } catch (err: any) {
      console.error("Add child error:", err);
      Alert.alert("Error", err.message);
    }
  };

async function pickImage(){

  const permissionReq = await ImagePicker.requestMediaLibraryPermissionsAsync()
  const result =await ImagePicker.launchImageLibraryAsync({mediaTypes:ImagePicker.MediaTypeOptions.Images,quality:0.5})
  if (!result.canceled){
    setImg(result.assets[0].uri)
  }
  

}
 
const compressImage = async (uri:string) => {
  try {
    const result = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 100 } }], // Resize to 800px width
      {
        compress: 0.5, // Compression quality (0 to 1)
        format: ImageManipulator.SaveFormat.JPEG, // Always smaller than PNG
      }
    );
    return result.uri;
  } catch (error) {
    console.error('Error compressing image:', error);
  }
  finally{
    setImg('')
    setAge('')
    setName('')
  }
}; 
async function createKidsAcc(){
 const kidData= {
  age: age,
  name: name,
  avatar: img,

 }
const createdKidProfile = await createKidProfile(parent?._id,kidData)


console.log(createdKidProfile,'profile')
}


  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
console.log (img,age,name)
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add Child</Text>

      {!parent ? (
        <Button title="Log In First" onPress={login} />
      ) : (
        <>
          <Button title="Add Default Child" onPress={handleAddDefaultChild} />
          <View style={{ marginTop: 16 }}>
            <Button title="Back to Dashboard" onPress={() => router.push("/parent")} />
          </View>
        </>
      )}
 <View>
  
<View>
  <Text>Create kid account</Text>
  {/* <Form>

  </Form> */}
</View>
<View>
  <Text>Kid's name:</Text>
  <TextInput placeholder="kid name"
  style={{backgroundColor:"pink"}} onChangeText={(value)=>{setName(value)}}/> 
</View>
<View>
  <Text>Kid's age:</Text>
  <TextInput placeholder="kid's age"
  style={{backgroundColor:"pink"}} onChangeText={(value)=>{setAge(value)}}  value={age} />
</View>
<View>
  <Text>img:</Text>
  <TextInput placeholder="img"
  style={{backgroundColor:"pink"}}/>
</View>
<View>
 <Button title="Upload your image" onPress={pickImage}/>
 {img && <Image source={{uri:img}} style={styles.avatar}/> }
</View>
<View>
  <Button title="Create Kid's account" onPress={createKidsAcc}/>
</View>
 </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container:   { flex: 1, padding: 24, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  heading:     { fontSize: 24, fontWeight: "bold", marginBottom: 12 },
  avatar: { height:200, width:200, }
});