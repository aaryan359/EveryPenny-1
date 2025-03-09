import { router } from "expo-router";
import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	SafeAreaView,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function VerificationScreen() {
	// States for OTP and timer
	const [otp, setOtp] = useState("");
	const [timer, setTimer] = useState(300);

	// Timer countdown logic
	useEffect(() => {
		if (timer > 0) {
			const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
			return () => clearInterval(interval);
		}
	}, [timer]);

	const  handlesubmit = ()=>{
           
		router.push('/(auth)/login');
	}

	// Format timer to MM:SS
	const formatTime = (time) => {
		const minutes = Math.floor(time / 60);
		const seconds = time % 60;
		return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
	};

	// Navigate back to the previous screen
	const navigateBack = () => router.back();

	return (
		<SafeAreaView style={styles.safeArea}>
			<View style={styles.header}>
				<TouchableOpacity onPress={navigateBack}>
					<MaterialIcons name="arrow-back-ios" size={24} color="black" />
				</TouchableOpacity>
				<Text style={styles.headerText}>Verification</Text>
			</View>

			<View style={styles.container}>
				<Text style={styles.title}>Enter your {"\n"}Verification Code</Text>

				<TextInput
                
					style={styles.otpInput}
					keyboardType="number-pad"
					maxLength={6}
					placeholder="Enter 6-digit code"
					placeholderTextColor="#91919F"
					value={otp}
					onChangeText={setOtp}
				/>

				<Text style={styles.timer}>{formatTime(timer)}</Text>

				<Text style={styles.infoText}>
					We sent a verification code to your email. You can check your inbox.
				</Text>

				<TouchableOpacity>
					<Text style={styles.resendLink}>
						I didn’t receive the code? Send again
					</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.verifyButton} onPress={handlesubmit}>
					<Text style={styles.verifyButtonText}>Verify</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: "#FFFFFF",
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingVertical: 10,
		backgroundColor: "#FFF",
	},
	headerText: {
		flex: 1,
		textAlign: "center",
		fontSize: 24,
		fontWeight: "bold",
	},
	container: {
		flex: 1,
		padding: 20,
		justifyContent: "center",
		backgroundColor: "#FFF",
	},
	title: {
		fontSize: 28,
		fontWeight: "bold",
		textAlign: 'left',
		marginBottom: 20,
	},
	otpInput: {
		width: "100%",
		height: 50,
		borderWidth: 1,
		borderColor: "#E5E5E5",
		borderRadius: 10,
		textAlign: "center",
		fontSize: 18,
		color: "#000",
		backgroundColor: "#F9F9F9",
		marginBottom: 20,
	},
	timer: {
		fontSize: 16,
		color: "#6B38FB",
		textAlign: 'left',
		marginBottom: 10,
	},
	infoText: {
		fontSize: 14,
		color: "#91919F",
		textAlign: "left",
		marginBottom: 10,
	},
	resendLink: {
		fontSize: 14,
		color: "#6B38FB",
		textAlign: "left",
		marginBottom: 20,
	},
	verifyButton: {
		backgroundColor: "#6B38FB",
		paddingVertical: 15,
		borderRadius: 10,
		alignItems: "center",
	},
	verifyButtonText: {
		color: "#FFF",
		fontSize: 16,
		fontWeight: "bold",
	},
});
