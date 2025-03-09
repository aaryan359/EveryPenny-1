import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Switch,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

const ExpensePage = () => {
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [wallet, setWallet] = useState("");
  const [repeat, setRepeat] = useState(false);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Expense</Text>
      </View>

      {/* Amount Section */}
      <View style={styles.amountSection}>
        <Text style={styles.label}>How much?</Text>
        <Text style={styles.amount}>$0</Text>
      </View>

      {/* Form Section */}
      <View style={styles.formSection}>
        {/* Category Picker */}
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
          style={styles.input}
        >
          <Picker.Item label="Category" value="" />
          <Picker.Item label="Food" value="food" />
          <Picker.Item label="Shopping" value="shopping" />
          <Picker.Item label="Entertainment" value="entertainment" />
        </Picker>


        {/* Description Input */}
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />

        {/* Wallet Picker */}
        <Picker
          selectedValue={wallet}
          onValueChange={(itemValue) => setWallet(itemValue)}
          style={styles.input}
        >
          <Picker.Item label="Wallet" value="" />
          <Picker.Item label="Bank Account" value="bank" />
          <Picker.Item label="Cash" value="cash" />
        </Picker>

        {/* Add Attachment Section */}
        <TouchableOpacity style={styles.attachmentButton}>
          <Text style={styles.attachmentText}>Add attachment</Text>
        </TouchableOpacity>

        {/* Repeat Switch */}
        <View style={styles.repeatContainer}>
          <Text style={styles.repeatText}>Repeat transaction</Text>
          <Switch
            value={repeat}
            onValueChange={setRepeat}
            trackColor={{ false: "#D9D9D9", true: "#A020F0" }}
            thumbColor={repeat ? "#A020F0" : "#FFFFFF"}
          />
        </View>
      </View>

      {/* Continue Button */}
      <TouchableOpacity style={styles.continueButton}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF5A5F",
  },
  header: {
    marginTop: 40,
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  amountSection: {
    alignItems: "center",
    marginVertical: 30,
  },
  label: {
    fontSize: 16,
    color: "#FFFFFF",
  },
  amount: {
    fontSize: 40,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  formSection: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    color: "#000000",
  },
  attachmentButton: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    padding: 12,
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "#F9F9F9",
  },
  attachmentText: {
    color: "#7D7D7D",
  },
  repeatContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  repeatText: {
    fontSize: 16,
    color: "#000000",
  },
  continueButton: {
    backgroundColor: "#A020F0",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    margin: 20,
  },
  continueButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default ExpensePage;
