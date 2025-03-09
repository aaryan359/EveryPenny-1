import * as React from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	TextInput,
	Image,
	Button
} from "react-native";
import  { useCallback, useEffect,useState } from 'react'
import Checkbox from "expo-checkbox";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import imagePath from "@/src/constants/imagePath";
import { useRouter } from "expo-router";
import { useSignUp } from "@clerk/clerk-expo";
import * as WebBrowser from 'expo-web-browser'
import * as AuthSession from 'expo-auth-session'
import { useSSO } from '@clerk/clerk-expo'
import AsyncStorage from '@react-native-async-storage/async-storage';


import { useAuth,useUser } from "@clerk/clerk-expo";


export const useWarmUpBrowser = () => {
	useEffect(() => {
	
	  void WebBrowser.warmUpAsync()
	  return () => {
		void WebBrowser.coolDownAsync()
	  }
	}, [])
  }
  


  // Handle any pending authentication sessions
  WebBrowser.maybeCompleteAuthSession()

  const storeToken = async (token:any) => {
    try {
        await AsyncStorage.setItem("jwt", token);
        console.log("Token stored successfully!");
    } catch (error) {
        console.error("Error storing token:", error);
    }
    };


const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem("jwt");
        return token; // Return token if found
    } catch (error) {
        console.error("Error retrieving token:", error);
        return null;
    }
};

const clearToken = async () => {
    try {
        await AsyncStorage.removeItem("jwt");
        console.log("Token removed successfully!");
    } catch (error) {
        console.error("Error removing token:", error);
    }
};





const Register = () => {

	
	useWarmUpBrowser()


	const [isChecked, setChecked] = useState(false);
	const [isPasswordVisible, setPasswordVisible] = useState(false);
	const { isLoaded, signUp, setActive } = useSignUp();
	const router = useRouter();

	const [emailAddress, setEmailAddress] = useState('');
	const [password, setPassword] = useState('');
	const [code, setCode] = useState('');
	const [pendingVerification, setPendingVerification] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');



	const { isSignedIn,getToken } = useAuth(); 
	const { startSSOFlow } = useSSO();
	const { user } = useUser();


	
	// Function to handle user logout
	const handleLogout = async () => {
	  try {
		const { signOut } = useAuth();
		if (isSignedIn && signOut) {
		  await signOut();
		  await clearToken();
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

		  try {
			const clerkToken = await getToken();
			console.log(clerkToken);
	  
			const response = await fetch("localhost:8888/api/auth/register", {
			  method: "POST",
			  headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${clerkToken}`, 
			  },
			  body: JSON.stringify({
				
				email: user?.primaryEmailAddress?.emailAddress,
				name: `${user?.firstName}`,
			  }),
			});
	  
			const data = await response.json();

			if (response.ok) {
			  await storeToken(data.token); 
			  router.replace("/(main)"); 
			} 
			else {
			  console.error("Error syncing user:", data.error);
			}
		  } catch (err) {
			console.error("Sync error:", err);
		  }
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
		  try {
			const clerkToken = await getToken();
			console.log(clerkToken);
	  
			const response = await fetch("localhost:8888/api/auth/register", {
			  method: "POST",
			  headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${clerkToken}`, 
			  },
			  body: JSON.stringify({
				
				email: user?.primaryEmailAddress?.emailAddress,
				name: `${user?.firstName}`,
			  }),
			});
	  
			const data = await response.json();

			if (response.ok) {
			  await storeToken(data.token); 
			  router.replace("/(main)"); 
			} 
			else {
			  console.error("Error syncing user:", data.error);
			}
		  } catch (err) {
			console.error("Sync error:", err);
		  }
		  router.replace("/(main)");
		}
	  } catch (err) {
		console.error("Apple OAuth error", JSON.stringify(err, null, 2));
	  }
	};
	
	const onSignUpPress = async () => {
		if (!isLoaded) return;

		setErrorMessage('');

		if (!emailAddress || !password) {
			setErrorMessage('Email and password are required.');
			return;
		}

		try {
			await signUp.create({
				emailAddress,
				password,
			});

			// Send user an email with verification code
           await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
		   setPendingVerification(true)

		} catch (err:any) {
			console.error(err);
			setErrorMessage(err.errors?.[0]?.message || 'Sign-up failed. Please try again.');
		}
	};

	const onVerifyPress = async () => {
		if (!isLoaded) return;
		setErrorMessage('');

		if (!code) {
			setErrorMessage('Verification code is required.');
			return;
		}
		try {
			const signUpAttempt = await signUp.attemptEmailAddressVerification({ code });

			if (signUpAttempt.status === 'complete') {
				await setActive({ session: signUpAttempt.createdSessionId });
				try {
					const clerkToken = await getToken();
					console.log(clerkToken);
			  
					const response = await fetch("localhost:8888/api/auth/register", {
					  method: "POST",
					  headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${clerkToken}`, 
					  },
					  body: JSON.stringify({
						
						email: user?.primaryEmailAddress?.emailAddress,
						name: `${user?.firstName}`,
					  }),
					});
			  
					const data = await response.json();
		
					if (response.ok) {
					  await storeToken(data.token); 
					  router.replace("/(main)"); 
					} 
					else {
					  console.error("Error syncing user:", data.error);
					}
				  } catch (err) {
					console.error("Sync error:", err);
				  }
				router.push('/(main)');
			} else {
				setErrorMessage('Verification failed. Please check the code and try again.');
			}
		} catch (err:any) {
			console.error(err);
			setErrorMessage(err.errors?.[0]?.message || 'Verification failed. Please try again.');
		}
	};


	if (pendingVerification) {
		return (
		  <>
			<Text>Verify your email</Text>
			<TextInput
			
			  style={styles.Verifyinput}

			  value={code}
			  placeholder="Enter your verification code"
			  onChangeText={(code) => setCode(code)}
			/>
			<Button title="Verify" onPress={onVerifyPress} />
		  </>
		)
	  }

	const backtohome = () => {
		router.back();
	};

	const togglePasswordVisibility = () => {
		setPasswordVisible(!isPasswordVisible);
	};

	return (
		<SafeAreaView style={styles.safeArea}>
			<View style={styles.headerContainermain}>
				<View style={styles.headerContainer}>
					<TouchableOpacity onPress={backtohome}>
						<MaterialIcons style={styles.headerIcon} name="arrow-back-ios" size={24} color="black" />
					</TouchableOpacity>
					<Text style={styles.headerText}>Sign Up</Text>
				</View>
			</View>

			<View style={styles.inputContainermain}>
				<View style={styles.inputContainer}>
					<TextInput placeholder="Email" placeholderTextColor="#91919F" style={styles.input} value={emailAddress} onChangeText={setEmailAddress} />
					<View style={styles.passwordContainer}>
						<TextInput placeholder="Password" placeholderTextColor="#91919F" style={styles.passwordInput} secureTextEntry={!isPasswordVisible} value={password} onChangeText={setPassword} />
						<TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
							<MaterialIcons name={isPasswordVisible ? "visibility" : "visibility-off"} size={24} color="#91919F" />
						</TouchableOpacity>
					</View>
				</View>
			</View>




			<View style={styles.agreementContainer}>
				<Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} />
				<Text style={styles.agreementText}>By signing up, you agree to the Terms of Service and Privacy Policy</Text>
			</View>

			<View style={styles.buttonContainer}>
				<TouchableOpacity style={styles.signUpButton} activeOpacity={0.8} onPress={onSignUpPress}>
					<Text style={styles.signUpText}>Sign Up</Text>
				</TouchableOpacity>
			</View>
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
		</SafeAreaView>
	);
};





const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: "#FFFFFF",
    marginTop:15
	},

	headerContainermain: {
		
		paddingHorizontal: 16,
    paddingVertical:10,
    backgroundColor: "#FFFFFF",

	},

	headerContainer: {

		flexDirection: "row",
		alignItems: "center",
	},

	headerText: {
		flex: 1,
		textAlign: "center",
		fontSize: 25,
		fontWeight: "bold",
	},

	headerIcon: {
		alignSelf: "flex-start",
	},

	inputContainermain: {
		marginTop: 70,
		paddingHorizontal: 16,
	},

	inputContainer: {
		gap: 20,
	},

	input: {
		padding: 16,
		borderRadius: 17,
		fontSize: 18,
        borderWidth: 1,
		borderColor: "#E5E5E5",
	},

	Verifyinput:{
		marginTop:40,
		padding: 16,
		borderRadius: 17,
		fontSize: 18,
        borderWidth: 1,
		borderColor: "#E5E5E5",
	},

  passwordContainer: {
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 1,
		borderColor: "#E5E5E5",
		borderRadius: 17,
		backgroundColor: "#FFF",
   
	},
	passwordInput: {
		flex: 1,
		fontSize: 18,
		paddingVertical:20,
    borderRadius:17,
    paddingHorizontal:10,
  
		color: "#000",
	},
	eyeIcon: {
		paddingHorizontal: 10,
	},

	agreementContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 20,
		paddingHorizontal: 16,
	},

	checkbox: {
		marginRight: 10,
	},

	agreementText: {
		color: "#000000",
		flexShrink: 1,
	},

	buttonContainer: {
		marginTop: 20,
		paddingHorizontal: 16,
	},

	signUpButton: {
		backgroundColor: "#7F3DFF",
		paddingVertical: 15,
		borderRadius: 16,
		alignItems: "center",
	},

	signUpText: {
		color: "#FCFCFC",
		fontSize: 20,
		fontWeight: "bold",
	},

	orText: {
		color: "#91919F",
		textAlign: "center",
		marginTop: 20,
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

	footerText: {
		fontSize: 18,
		marginTop: 20,
		textAlign: "center",
		color: "#91919F",
	},

	linkText: {
    marginTop:20,
		color: "#7F3DFF",
    fontSize:21,
    textAlign:'center',
    fontWeight:'bold'
	},
});

export default Register;
