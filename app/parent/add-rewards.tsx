import React, { useState, useEffect } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import ModalSelector from "react-native-modal-selector";
import { postNewReward } from "@/utils/api";

type AddRewardFormProps = {
  parentId: "000000000000000000000001";
  onRewardAdded?: () => void;
};

export default function AddRewardForm({
  parentId,
  onRewardAdded,
}: AddRewardFormProps) {
  const [title, setTitle] = useState("");
  const [cost, setCost] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (title.trim().length === 0) {
      setFormError("Title cannot be empty");
    } else {
      setFormError("");
    }
  }, [title, cost]);

  // Reset form when parent changes
  useEffect(() => {
    setTitle("");
    setCost(1);
  }, [parentId]);

  const handleAddReward = () => {
    if (formError) {
      Alert.alert("Validation Error", formError);
      return;
    }

    setIsSubmitting(true);

    const reward = {
      title: title.trim(),
      cost,
      createdBy: [parentId],
    };
    // Set parent_id by waiting for auth0

    postNewReward("local-test-id", reward)
      .then((data) => {
        setTitle("");
        setCost(1);
        Alert.alert("Success", "Reward created successfully!");
        onRewardAdded?.();
      })
      .catch((error) => {
        Alert.alert("Error", error.message || "Failed to create reward");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <View style={styles.formContainer}>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Reward title"
        style={styles.input}
      />

      <ModalSelector
        data={[1, 2, 3, 4, 5].map((num) => ({
          key: num,
          label: `${num} stars`,
        }))}
        initValue="Select cost"
        onChange={(option) => setCost(option.key)}
      >
        <TextInput
          style={styles.input}
          editable={false}
          placeholder="Select cost"
          value={`${cost} stars`}
        />
      </ModalSelector>

      <Button
        title="Add Reward"
        onPress={handleAddReward}
        disabled={!!formError || isSubmitting}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    padding: 16,
  },
  input: {
    borderWidth: 1,
    padding: 8,
    marginBottom: 12,
    borderRadius: 4,
  },
  selector: {
    marginBottom: 10,
  },
  error: {
    color: "red",
    marginBottom: 8,
  },
});
