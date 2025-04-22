import React, { useState } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../hooks/useAuth';

export default function AddChild() {
  const { parent } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const addDefaultChild = async () => {
    if (!parent) {
      Alert.alert('Error', 'You must be logged in to add a child.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        'https://be-star-step-app-dev.onrender.com/api/kids',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: 'Default Child',
            age: 5,
            avatar:
              'https://thumbs.dreamstime.com/z/happy-cartoon-monster-vector-halloween-one-eyed-furry-monster-happy-cartoon-monster-vector-halloween-one-eyed-furry-monster-126535858.jpg',
            parentID: parent._id,
          }),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || 'Failed to add child');
      Alert.alert('Success', `Added child "${data.name}"`);
      router.push('/parent');
    } catch (err: any) {
      console.error('Add child error:', err);
      Alert.alert('Error', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add Default Child</Text>
      <Button
        title={loading ? 'Adding…' : 'Add Default Child'}
        onPress={addDefaultChild}
        disabled={loading}
      />
      <View style={{ marginTop: 20 }}>
        <Button title="Back to Dashboard" onPress={() => router.push('/parent')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
});
