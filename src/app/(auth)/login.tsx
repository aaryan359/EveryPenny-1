import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Button,Image } from 'react-native';
import { useRouter, Link } from 'expo-router';
import { useSignIn } from '@clerk/clerk-expo'
import imagePath from "@/src/constants/imagePath";
import { useSSO } from '@clerk/clerk-expo'


import { useAuth } from "@clerk/clerk-expo";
// import { useDispatch } from 'react-redux';
// import { setToken, clearToken } from "../../redux/authSlice";

const LoginScreen = () => {

  const router = useRouter()

  const [password, setPassword] = useState('');
  const [emailAddress, setEmailAddress] = useState('')

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);



  const { signIn, setActive, isLoaded } = useSignIn()


  // const dispatch =  useDispatch();


// Check if user is signed in
	const { isSignedIn } = useAuth();
  
   // Start OAuth authentication
	const { startSSOFlow } = useSSO();
	
	// Function to handle user logout
	const handleLogout = async () => {
	  try {
		const { signOut } = useAuth();

		if (isSignedIn && signOut) {
		  await signOut();
		  router.replace("/(auth)/register"); 
		}
	  } catch (err) {
		console.error("Logout error:", JSON.stringify(err, null, 2));
	  }
	};
	
	// Function for Google Login
	const GooglePress = async () => {
	  try {
		// Logout before signing in (to prevent session conflicts)
		if (isSignedIn) {
		  await handleLogout();
		}
	
		// Start Google OAuth
		const { createdSessionId, setActive } = await startSSOFlow({
		  strategy: "oauth_google",
		});
	
		if (createdSessionId && setActive) {
		  await setActive({ session: createdSessionId });
		  router.replace("/(main)");
		}
	  } catch (err) {
		console.error("Google OAuth error", JSON.stringify(err, null, 2));
	  }
	};
	
	// Function for Apple Login
	const ApplePress = async () => {
	  try {
		// Logout before signing in
		if (isSignedIn) {
		  await handleLogout();
		}
	
		// Start Apple OAuth
		const { createdSessionId, setActive } = await startSSOFlow({
		  strategy: "oauth_apple",
		});
	
		if (createdSessionId && setActive) {
		  await setActive({ session: createdSessionId });
		  router.replace("/(main)");
		}
	  } catch (err) {
		console.error("Apple OAuth error", JSON.stringify(err, null, 2));
	  }
	};
	
  async function handlelogin() {

    // dispatch(setToken("token_example"));

    // console.log("Dispatch in login page:", dispatch); 

    if (!isLoaded) return

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        

        router.replace('/(main)')
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2))
      }

    } catch (err:any) {
      console.error(JSON.stringify(err, null, 2))
      if (err.errors) {
        const errorCode = err.errors[0]?.code;

    
        switch (errorCode) {
          case "form_identifier_not_found":
            alert("This email is not registered.");
            break;
          case "incorrect_password":
            alert( "The password is incorrect.");
            break;
          case "network_error":
          alert("Please check your internet connection.");
            break;
          default:
            alert("Something went wrong. Please try again.");
        }
      } else {
        alert( "An unexpected error occurred.");
      }
    }

  }

  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>←</Text>

      </TouchableOpacity>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Enter email"
        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
      />



      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.inputPassword}
          value={password}
          placeholder="Enter password"
          onChangeText={(password) => setPassword(password)}
          secureTextEntry={!isPasswordVisible}
        />

        <TouchableOpacity
          style={styles.eyeButton}
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          <Text style={styles.eyeIcon}>{isPasswordVisible ? '🙈' : '👁️'}</Text>
        </TouchableOpacity>
      </View>



      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText} onPress={handlelogin}>Login</Text>
      </TouchableOpacity>


      <TouchableOpacity onPress={() => {
        router.push('./forgotpass')
      }}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      <View style={styles.googlebuttonContainer}>
        <TouchableOpacity style={styles.googlebtn}>
          <Image
            source={imagePath.googlelogo}
            style={styles.image}
            resizeMode="contain"
          />
          <Text
            style={styles.googlebtntext}
            onPress={GooglePress}>
            Sign Up with Google
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.googlebuttonContainer}>
        <TouchableOpacity style={styles.googlebtn}>
          <Image
            source={imagePath.applelogo}
            style={styles.image}
            resizeMode="contain"
          />
          <Text
            style={styles.googlebtntext}
            onPress={ApplePress}>
            Sign Up with Apple
          </Text>
        </TouchableOpacity>
      </View>



      {/* Signup Link */}
      <Text style={styles.signupText}>
        Don't have an account yet?{' '}
        <Text style={styles.signupLink} onPress={() => router.push('./register')}>
          Sign Up
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,


  },
  backText: {

    fontSize: 50,
    color: '#333',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 100,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 18,
    marginBottom: 15,
    fontSize: 16,
  },
  passwordContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  inputPassword: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 18,
    paddingRight: 56,
    fontSize: 16,
  },
  eyeButton: {
    position: 'absolute',
    right: 13,
    top: 17,
  },

  eyeIcon: {
    fontSize: 18,
    color: '#333',
  },


  loginButton: {


    backgroundColor: '#7F3DFF',
    borderRadius: 8,
    padding: 18,
    alignItems: 'center',
    marginBottom: 20,
  },

  loginButtonText: {
    color: '#fff',
    fontSize: 23,
    fontWeight: 'bold',
  },

  forgotPassword: {
    color: '#7F3DFF',
    textAlign: 'center',
    marginBottom: 15,
  },

  signupText: {
    textAlign: 'center',
    color: '#666',
  },

  signupLink: {
    color: '#7F3DFF',
    fontWeight: 'bold',
  },

  googlebuttonContainer: {
    paddingHorizontal: 16,
    marginTop: 10,
  },

  googlebtn: {
    flexDirection: "row",
    backgroundColor: "#EEE5FF",
    paddingVertical: 15,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  googlebtntext: {
    color: "#7F3DFF",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },

  image: {
    width: 30,
    height: 30,
  },
});

export default LoginScreen;

