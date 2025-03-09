import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Switch,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

const IncomeScreen = () => {
  const [category, setCategory] = useState("");
  const [wallet, setWallet] = useState("");
  const [isRepeat, setIsRepeat] = useState(false);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Income</Text>
        <View style={{ width: 30 }} /> {/* Placeholder for alignment */}
      </View>

      {/* Amount Section */}
      <View style={styles.amountContainer}>
        <Text style={styles.howMuchText}>How much?</Text>
        <Text style={styles.amountText}>$0</Text>
      </View>

      {/* Input Fields */}
      <View style={styles.inputContainer}>
        {/* Category Picker */}
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={category}
            onValueChange={(itemValue) => setCategory(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Category" value="" />
            <Picker.Item label="Salary" value="salary" />
            <Picker.Item label="Bonus" value="bonus" />
          </Picker>
        </View>

        {/* Description Input */}
        <TextInput
          style={styles.input}
          placeholder="Description"
          placeholderTextColor="#BDBDBD"
        />

        {/* Wallet Picker */}
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={wallet}
            onValueChange={(itemValue) => setWallet(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Wallet" value="" />
            <Picker.Item label="Main Wallet" value="main-wallet" />
            <Picker.Item label="Savings" value="savings" />
          </Picker>
        </View>

        {/* Add Attachment */}
        <TouchableOpacity style={styles.attachmentButton}>
          <Text style={styles.attachmentText}>📎 Add attachment</Text>
        </TouchableOpacity>

        {/* Repeat Switch */}
        <View style={styles.repeatContainer}>
          <Text style={styles.repeatText}>Repeat</Text>
          <Switch
            value={isRepeat}
            onValueChange={(value) => setIsRepeat(value)}
            trackColor={{ false: "#767577", true: "#4CAF50" }}
            thumbColor={isRepeat ? "#4CAF50" : "#f4f3f4"}
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
    backgroundColor: "#E8F5E9", // Light green background
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: "#4CAF50", // Green header
  },
  backButton: {
    fontSize: 24,
    color: "#FFF",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
  },
  amountContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  howMuchText: {
    fontSize: 16,
    color: "#7D7D7D",
  },
  amountText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#000",
  },
  inputContainer: {
    paddingHorizontal: 20,
  },
  pickerContainer: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  picker: {
    height: 50,
    color: "#000",
  },
  input: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginBottom: 15,
    fontSize: 16,
    color: "#000",
  },
  attachmentButton: {
    borderWidth: 1,
    borderColor: "#BDBDBD",
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 20,
  },
  attachmentText: {
    fontSize: 16,
    color: "#7D7D7D",
  },
  repeatContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  repeatText: {
    fontSize: 16,
    color: "#000",
  },
  continueButton: {
    backgroundColor: "#6200EE", // Purple button
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
    marginHorizontal: 20,
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
  },
});

export default IncomeScreen;
