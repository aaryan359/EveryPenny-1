import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';


const TransactionsList = ({ transactions  }) => {

  return (
    <View>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.transactionItem}>
            <Text style={styles.transactionIcon}>{item.icon}</Text>
            <View style={styles.transactionDetails}>
              <Text style={styles.transactionCategory}>{item.category}</Text>
              <Text style={styles.transactionTime}>{item.time}</Text>
            </View>
            <Text style={styles.transactionAmount}>{item.amount}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default TransactionsList;

const styles = StyleSheet.create({
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  transactionIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionCategory: {
    fontSize: 16,
    fontWeight: '600',
  },
  transactionTime: {
    fontSize: 12,
    color: '#7D7D7D',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
