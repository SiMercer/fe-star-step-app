import { View, Text, Button } from "react-native";
import { Link } from "expo-router";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {Switch,StyleSheet,SafeAreaView,ScrollView,TouchableOpacity} from "react-native";
import { getTasksByKid } from "@/utils/api";
import { useChild } from "@/contexts/ChildContext";
import NavBarKid from "./NavBarKid";

export default function ChildTasksScreen() {
  const [childTask, setChildTask] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const route = useRoute();
  const { selectedChild } = useChild()
  //const childId = selectedChild?._id
  const childId='680792abcdb49b6f46ec82f9'
  useEffect(() => {
    setLoading(true);
    getTasksByKid(childId)
      .then((data) => {
     
        setChildTask(data);

        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load tasks");
        setLoading(false)
      });
  }, [childId]);


  if (loading) {
    return (
      <View >
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View >
        <Text style={{ color: "red" }}>{error}</Text>
      </View>
    );
  }

  const getTimeLeft = (dateStr: string): string => {
  const deadline = new Date(dateStr);
  const now = new Date();
  const diffMs = deadline.getTime() - now.getTime();

  if (diffMs <= 0) return "Expired";

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  return `${days} day${days !== 1 ? "s" : ""} left`;
};

const handleToggle = (taskId: string) => {
  const updatedTasks = childTask.map((task) =>
    task._id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
  );
  setChildTask(updatedTasks);
};
  return (
    <ScrollView style={styles.container}>
    <View style={{ flex: 1, backgroundColor: '#D1DBFF',height:"100%"
     }}>

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
      <Text style={{ fontSize:50, marginTop: 20, color:'#FFFEFF', fontFamily: "Titles" }}>Tasks</Text>
      </View>
 
 <View style={styles.containerCard}>
  <View style={styles.taskcard}>

  {!childTask || childTask.length === 0 ?(
    <Text style={{ fontSize: 18, color: "#888", textAlign: "center" }}>
      No tasks for today 🎉
    </Text>
  ) : (
    childTask.map((task: any) => (
      <View
        key={task._id}
        style={{
          backgroundColor: "#f0f0f0",
          padding: 16,
          borderRadius: 12,
          marginBottom: 10,
        }}
      >
        <Text style={{ fontSize: 20 }}>{task.title}</Text>
        <Text style={{ fontSize: 14, color: "#555" }}>
          Complete by:  {getTimeLeft(task.validBefore)}
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginTop: 8 }}>
  <Text style={styles.statusLabel}>
    {task.isCompleted ? "Completed" : "To do"}
  </Text>

  <View style={{ alignItems: "flex-end" }}>
    <Text style={{ fontSize: 15, color: "black", marginBottom: 4 }}>
      <Text style={{ fontSize: 22 }}>⭐</Text>{task.starsReward}
    </Text>
    <Switch
      trackColor={{ false: 'grey', true: 'grey' }}
      thumbColor={task.isCompleted ? '#7697F9' : '#7697F9'}
      value={task.isCompleted}
      onValueChange={() => handleToggle(task._id)}
    />
  </View>
</View>      
           
      </View>
    ))    
  )}
  </View>
  <NavBarKid ></NavBarKid>
</View>

  
  
   
  
    </View>
    </ScrollView>
  )  
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EBECFF",
    flexGrow: 1,
    //alignItems: "center",
    padding: 24,
    height:"100%"
  },
  taskcard: {
    backgroundColor: '#EBECFF',
    padding: 16,
    marginVertical: 10,

    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
    width: '90%', 
   
  },
  containerCard: {
    alignItems: 'center',
    justifyContent: 'center', 
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 10,
    backgroundColor: '#D1DBFF',
  },  
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  statusLabel: {
    fontSize: 14,
    color: '#555',
    
  },
  nav:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderColor: '#ddd',
    
  }});
  
  