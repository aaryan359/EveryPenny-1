import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const Settings = () => {
  const settingsOptions = [
    { id: 1, label: "Currency", value: "USD" },
    { id: 2, label: "Language", value: "English" },
    { id: 3, label: "Theme", value: "Dark" },
    { id: 4, label: "Security", value: "Fingerprint" },
    { id: 5, label: "Notification", value: "1" },
    { id: 6, label: "About", value: "about" },
    { id: 7, label: "Help", value: "help" },
  ];

  const handleValuePress = (value: string) => {
   


  };

  const renderItem = ({ item }: any) => (

    <View style={styles.row}>

              <Text style={styles.label}>{item.label}</Text>

      <View style={styles.rightSection}>
                  {item.value ? (
          <TouchableOpacity onPress={() => handleValuePress(item.value)}>
            <Text style={styles.value}>{item.value}</Text>
          </TouchableOpacity>
        ) : null}
        <Ionicons name="chevron-forward" size={20} color="#8E44AD" />
      </View>
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
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      {/* Settings List */}

      <FlatList
        data={settingsOptions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 25,
    marginBottom:5,
    borderBottomWidth: 1,
    borderBottomColor: "#EAEAEA",

    
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EAEAEA",
  },
  label: {
    fontSize: 16,
    color: "#000",
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  value: {
    fontSize: 16,
    color: "#91919F",
    marginRight: 8,
  },
});

export default Settings;
