import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'

const Buttons = ( {title,onPress}:any ) => {
  return (
    <View>
        <TouchableOpacity style={styles.signUpButton} activeOpacity={0.8}>

            <Text style={styles.signUpText} onPress={onPress}  >{title} </Text>

        </TouchableOpacity>
        
        
      
    </View>
  )
}


const styles = StyleSheet.create({



    signUpButton: {
        backgroundColor: '#7F3DFF',
        paddingVertical: 15,
        borderRadius: 16,
        alignItems: 'center',
        marginBottom: 10,
      },
      signUpText: {
        color: '#FCFCFC',
        fontSize: 16,
        fontWeight: 'bold',
      },
      loginButton: {
        backgroundColor: '#EEE5FF',
        paddingVertical: 15,
        borderRadius: 16,
        alignItems: 'center',
      },
      loginText: {
        color: '#7F3DFF',
        fontSize: 16,
        fontWeight: 'bold',
      },

})



export default Buttons
