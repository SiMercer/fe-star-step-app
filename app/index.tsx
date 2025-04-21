import React from 'react';
import { ScrollView, View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../hooks/useAuth';

export default function HomeScreen() {
  const router = useRouter();
  const { parent } = useAuth();

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      }}
    >
      <Text style={{ fontSize: 28, marginBottom: 20 }}>StarSteps</Text>

      {parent ? (
        <Text>You are logged in as: {parent.parentName}</Text>
      ) : (
        <Text>You are not logged in</Text>
      )}

      <View style={{ marginTop: 20, width: '100%' }}>
        <Button
          title="Parent Login"
          onPress={() => router.push('/parent/login')}
        />
      </View>
    </ScrollView>
  );
}
