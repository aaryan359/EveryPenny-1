import React, { useEffect, useState } from 'react';
import {
  
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import {  router } from 'expo-router';
import { Redirect } from "expo-router";
import { useAuth } from '@clerk/clerk-expo'

import imagePath from '@/src/constants/imagePath';

const Auth = () => {

  // const {isSignedIn} = useAuth();
  

  //  if(isSignedIn){
  //   router.replace('/(main)');
  //  }

  const handleSignIn = ()=>{
    router.push('/(auth)/register') 
  }


  const handleLogin = ()=>{
    router.push('/login')

  }
  
  const [splashloading, setSplashloading] = useState(true);


  useEffect(() => {

    const timeout = setTimeout(() => setSplashloading(false), 2000);
    return () => clearTimeout(timeout);

  }, []);




  if (splashloading) {

    return       <SafeAreaView style={styles.splashContainer}>
                              <Text style={styles.splashText}>EveryPenny</Text>
                </SafeAreaView>;
  }



  return (

    <SafeAreaView style={styles.container}>

      <View style={styles.main}>


             {/* Image Section */} 
                <Image source={imagePath.splashlogo}  style={styles.image} resizeMode="contain" />


        
                 <View style={styles.textContainer}>
                                
                             <Text style={styles.textHeading}>Know where your{"\n"}money goes</Text>

                                <Text style={styles.textSubheading}>
                                  Track your transaction easily, with categories and financial report
                               </Text>
               </View>

 

        {/* Buttons Section */}
         <View style={styles.buttonContainer}>

                <TouchableOpacity style={styles.signUpButton} activeOpacity={0.8}>
               
                                   <Text style={styles.signUpText} onPress={handleSignIn}> Sign Up </Text>
               
                       </TouchableOpacity>

                <TouchableOpacity style={styles.loginButton} activeOpacity={0.8}>
                
                                    <Text style={styles.loginText} onPress={handleLogin}> Login </Text>
               
                       </TouchableOpacity>
          

         </View>


      </View>
    </SafeAreaView>



  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', 
  },
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: 312,
    height: 312,
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  textHeading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#212325',
    textAlign: 'center',
  },
  textSubheading: {
    fontSize: 16,
    color: '#91919F',
    textAlign: 'center',
    marginTop: 10,
  },

  buttonContainer: {
    marginTop: 40,
    width: '100%',
  },

  
  signUpButton: {
    backgroundColor: '#7F3DFF',
    paddingVertical: 15,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 10,
  },
  signUpText: {
    color: '#FCFCFC',
    fontSize: 18,
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
    fontSize: 18,
    fontWeight: 'bold',
  },
  splashText: {
  
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color:"#e80606"
  },
});

export default Auth;




