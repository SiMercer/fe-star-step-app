import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Text,
} from "react-native";
import ModalSelector from "react-native-modal-selector";
import { postNewReward, editReward } from "@/utils/api";

type AddRewardFormProps = {
  parentId: string;
  onRewardAdded?: (title: string, cost: number) => void;
  rewardToEdit?: {
    reward_id: string;
    title: string;
    cost: number;
    redeemedBy: string;
    isRedeemed: boolean;
    createdBy: string;
  } | null;
  onRewardUpdated?: (rewardId: string, title: string, cost: number) => void;
  onCancel?: () => void;
};

export default function AddRewardForm({
  parentId,
  onRewardAdded,
  rewardToEdit,
  onRewardUpdated,
  onCancel,
}: AddRewardFormProps) {
  const [title, setTitle] = useState("");
  const [cost, setCost] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  // Initialize form with reward data if editing
  useEffect(() => {
    if (rewardToEdit) {
      setTitle(rewardToEdit.title);
      setCost(rewardToEdit.cost);
    } else {
      setTitle("");
      setCost(1);
    }
  }, [rewardToEdit]);

  // Form validation
  useEffect(() => {
    if (title.trim().length === 0) {
      setFormError("Title cannot be empty");
    } else if (cost <= 0) {
      setFormError("Cost must be positive");
    } else {
      setFormError("");
    }
  }, [title, cost]);

  const handleSubmit = () => {
    if (formError) {
      Alert.alert("Validation Error", formError);
      return;
    }

    setIsSubmitting(true);

    if (rewardToEdit && onRewardUpdated) {
      // Handle reward update
      editReward(rewardToEdit.reward_id, { title: title.trim(), cost })
        .then(() => {
          onRewardUpdated(rewardToEdit.reward_id, title.trim(), cost);
          resetForm();
        })
        .catch((error) => {
          Alert.alert("Error", error.message || "Failed to update reward");
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    } else {
      // Handle new reward creation
      const reward = {
        title: title.trim(),
        cost,
        createdBy: parentId,
      };

      postNewReward("local-test-id", reward)
        .then(() => {
          onRewardAdded?.(title.trim(), cost);
          resetForm();
        })
        .catch((error) => {
          Alert.alert("Error", error.message || "Failed to create reward");
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    }
  };

  const resetForm = () => {
    setTitle("");
    setCost(1);
  };

  return (
    <View style={styles.formContainer}>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Reward title"
        style={styles.input}
        accessibilityLabel="Reward title input"
      />

      <ModalSelector
        data={[1, 2, 3, 4, 5].map((num) => ({
          key: num,
          label: `${num} stars`,
        }))}
        initValue="Select cost"
        onChange={(option) => setCost(option.key)}
        accessible={true}
        accessibilityLabel="Cost selector"
      >
        <TextInput
          style={styles.input}
          editable={false}
          placeholder="Select cost"
          value={`${cost} stars`}
        />
      </ModalSelector>

      {formError ? <Text>{formError}</Text> : null}

      <View style={styles.buttonContainer}>
        {onCancel && (
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={onCancel}
            disabled={isSubmitting}
            accessibilityLabel="Cancel button"
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.button, styles.submitButton]}
          onPress={handleSubmit}
          disabled={!!formError || isSubmitting}
          accessibilityLabel={
            rewardToEdit ? "Update reward button" : "Add reward button"
          }
        >
          <Text style={styles.buttonText}>
            {isSubmitting
              ? "Processing..."
              : rewardToEdit
              ? "Update Reward"
              : "Add Reward"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const COLORS = {
  pink: "#FFA1C6", // Primary accent color
  lightBlue: "#D1DBFF", // Secondary color
  darkBlue: "#7697F9", // Primary action color
  white: "#FFFEFF", // Pure white
  offWhite: "#EBECFF", // Background/light color
};

const styles = StyleSheet.create({
  formContainer: {
    padding: 20,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.lightBlue,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.lightBlue,
    padding: 14,
    marginBottom: 16,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: COLORS.white,
    color: COLORS.darkBlue,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    minWidth: 100,
    alignItems: "center",
  },
  submitButton: {
    backgroundColor: COLORS.darkBlue,
  },
  cancelButton: {
    backgroundColor: COLORS.pink,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: "bold",
  },
});
