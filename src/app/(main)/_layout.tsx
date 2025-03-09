import React from "react";
import { Text, StyleSheet } from "react-native";
import { Tabs } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";


const MainLayout = () => {
  
  console.log(Tabs.Screen);

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          paddingHorizontal: 10,
          paddingVertical: 5,
          height: 60,
        },
        tabBarLabelStyle: styles.label,
      }}
    >
      
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={28} color={color} />
          ),
          tabBarLabel: "Home",
        }} 
        
        />

      {/* Transactions Tab */}
      <Tabs.Screen
        name="transactions"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome name="exchange" size={24} color={color} />
          ),
          tabBarLabel: "Transactions",
        }}
      />


            <Tabs.Screen
                  name="add"
                     options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Entypo name="plus" size={28} color="black" />
          ),
          tabBarLabel: "add",
        }}

            /> 

      <Tabs.Screen
        name="analytics"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="google-analytics"
              size={24}
              color={color}
            />
          ),
          tabBarLabel: "analytics",
        }}
      />


     
     

      
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" size={24} color={color} />
          ),
          tabBarLabel: "Profile",
        }}
      /> 

          


    </Tabs>

    
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default MainLayout;
