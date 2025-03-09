import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, SafeAreaView } from 'react-native';





const Add: React.FC = () => {
  const [title, setTitle] = useState<string>(''); 
  const [amount, setAmount] = useState<string>(''); 

  return (
    <SafeAreaView style={styles.mainContainer}>
      

                    {/* Header */}
           <View style={styles.header}>
                            <Text style={styles.headerText}>Add Transaction</Text>
            </View>

                          {/* Input Fields */}
            <View style={styles.inputContainer}>
                                <TextInput style={styles.input} 
                                           placeholder="Enter title" 
                                           value={title}
                                           onChangeText={setTitle}
                                  />
                                  <TextInput
                                                style={styles.input}
                                                placeholder="Enter amount"
                                                value={amount}
                                                onChangeText={setAmount}
                                                keyboardType="numeric"
                                      />
               </View>

      

                                    {/* Buttons */}
                                   <View style={styles.buttonContainer}>
                                                <TouchableOpacity style={styles.addButton}>
                                                                             <Text style={styles.buttonText}>Add Income</Text>
                                                </TouchableOpacity>
                                               <TouchableOpacity style={styles.expenseButton}>
                                                                  <Text style={styles.buttonText}>Add Expense</Text>
                                                </TouchableOpacity>
                                    </View>
       </SafeAreaView>
  );
};

export default Add;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  addButton: {
    padding: 15,
    borderRadius: 12,
    backgroundColor: '#28a745',
    width: '40%',
    alignItems: 'center',
    opacity:0.7
  },
  expenseButton: {
    padding: 15,
    borderRadius: 12,
    backgroundColor: '#dc3545',
    width: '40%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
