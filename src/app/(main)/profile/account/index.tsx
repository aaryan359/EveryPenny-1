import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const AccountScreen = () => {
  const wallets = [
    { id: "1", label: "Wallet", value: "$400", icon: "wallet" },
    { id: "2", label: "Chase", value: "$1000", icon: "card-outline" },
    { id: "3", label: "Citi", value: "$6000", icon: "business-outline" },
    { id: "4", label: "Paypal", value: "$2000", icon: "logo-paypal" },
  ];

  const renderWalletItem = ({ item }: any) => (
    <View style={styles.walletRow}>
      <View style={styles.walletInfo}>
        <Ionicons
          name={item.icon}
          size={30}
          color="#8E44AD"
          style={styles.walletIcon}
        />
        <Text style={styles.walletLabel}>{item.label}</Text>
      </View>
      <Text style={styles.walletValue}>{item.value}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={()=>{
             router.back();
        }}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Account</Text>
      </View>

      {/* Account Balance */}
      <View style={{
        flex:1,
        flexDirection:"row",
        justifyContent:'center',
        gap:30
      }}>
      <View style={styles.balanceSection}>
        <Text style={styles.balanceTitle}>Account Balance</Text>
        <Text style={styles.balanceAmount}>$9400</Text>
      </View>

      <View style={styles.balanceSection}>
        <Text style={styles.balanceTitle}>Total Spend</Text>
        <Text style={styles.balanceAmount}>$1000</Text>
      </View>
      </View>

      {/* Wallet List */}
      <FlatList
        data={wallets}
        keyExtractor={(item) => item.id}
        renderItem={renderWalletItem}
        style={styles.walletList}
      />

      {/* Add Wallet Button */}
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+ Add new wallet</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 50,
    marginBottom: 20,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  balanceSection: {
    alignItems: "center",
    marginVertical: 20,
  },
  balanceTitle: {
    fontSize: 16,
    color: "#8E8E8E",
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#000000",
  },
  walletList: {
    flex: 1,
    
  },
  walletRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#EAEAEA",
  },
  walletInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  walletIcon: {
    marginRight: 12,
  },
  walletLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  walletValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
  },
  addButton: {
    backgroundColor: "#8E44AD",
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 8,
    marginVertical: 20,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AccountScreen;
