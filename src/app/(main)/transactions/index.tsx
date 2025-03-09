import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { Picker } from "@react-native-picker/picker";
import AntDesign from "@expo/vector-icons/AntDesign";
import TransactionsList from "@/src/components/molecules/TransactionsList";

const transactionsToday = [
  {
    id: "1",
    category: "Shopping",
    description: "Buy some grocery",
    amount: "-120",
    time: "10:00 AM",
    icon: "🛍️",
  },
  {
    id: "2",
    category: "Subscription",
    description: "Disney+ Annual",
    amount: "-80",
    time: "03:30 PM",
    icon: "📺",
  },
  {
    id: "3",
    category: "Food",
    description: "Buy a ramen",
    amount: "-32",
    time: "07:30 PM",
    icon: "🍜",
  },
  {
    id: "4",
    category: "Salary",
    description: "Salary for July",
    amount: "+5000",
    time: "04:30 PM",
    icon: "💰",
  },
  {
    id: "5",
    category: "Transportation",
    description: "Charging Tesla",
    amount: "-18",
    time: "08:30 PM",
    icon: "🚗",
  },
];

const transactionsYesterday = [
  {
    id: "1",
    category: "Salary",
    description: "Salary for July",
    amount: "+5000",
    time: "04:30 PM",
    icon: "💰",
  },
  {
    id: "2",
    category: "Transportation",
    description: "Charging Tesla",
    amount: "-18",
    time: "08:30 PM",
    icon: "🚗",
  },
  {
    id: "3",
    category: "Shopping",
    description: "Buy some grocery",
    amount: "-120",
    time: "10:00 AM",
    icon: "🛍️",
  },
  {
    id: "4",
    category: "Subscription",
    description: "Disney+ Annual",
    amount: "-80",
    time: "03:30 PM",
    icon: "📺",
  },
  {
    id: "5",
    category: "Food",
    description: "Buy a ramen",
    amount: "-32",
    time: "07:30 PM",
    icon: "🍜",
  },
];

export default function TransactionScreen() {
  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>

        <View style={styles.headerLeft}>
          <Text style={{ fontSize: 18 }}> Month </Text>
          <Picker style={styles.picker}>
            <Picker.Item label="Month" value="month" />
            <Picker.Item label="Year" value="year" />
            <Picker.Item label="Week" value="week" />
          </Picker>
        </View>
        <Entypo name="menu" size={30} color="black" />
      </View>


      {/* Financial Report Section */}
      <TouchableOpacity style={styles.reportContainer}>
        <Text style={styles.reportText}>See your financial report</Text>
        <AntDesign name="doubleright" size={24} color="#7F3DFF" />
      </TouchableOpacity>


      <View style={{flex:1}}>
        <View style={{ flex:1 , marginBottom:20}}>
           <Text style={styles.sectionTitle}>Today</Text>
             <TransactionsList transactions={transactionsToday} />
        </View>

        <View style={{flex:1 , marginTop:15}}>
           <Text style={styles.sectionTitle}>Yesterday</Text>
               <TransactionsList transactions={transactionsYesterday} />
        </View>
        
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  picker: {
    height: 40,
    width: 35,
  },
  reportContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#EEE5FF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  reportText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#7F3DFF",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#212325",
    marginVertical: 10,
  },
});
