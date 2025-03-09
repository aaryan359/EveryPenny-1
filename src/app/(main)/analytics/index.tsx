import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Analytics = () => {
  return (
    <View style={styles.container}>
      
      <Text style={styles.text}>Comming Soon..</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Analytics;
