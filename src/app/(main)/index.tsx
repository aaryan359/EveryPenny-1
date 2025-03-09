import React from "react";
import {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,

} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Chart from "@/src/components/molecules/MainPageChart";
import TransactionsList from "@/src/components/molecules/TransactionsList";
import imagePath from "@/src/constants/imagePath";
import { Link, Redirect, router } from 'expo-router'
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { useAuth } from '@clerk/clerk-expo'
import AsyncStorage from '@react-native-async-storage/async-storage';



const Main = () => {




	const { isSignedIn, signOut } = useAuth();

	const transactions = [
		{
			id: "1",
			category: "Shopping",
			amount: "-120",
			time: "10:00 AM",
			icon: "🛍️",
		},
		{
			id: "2",
			category: "Subscription",
			amount: "-80",
			time: "03:30 PM",
			icon: "📺",
		},
		{
			id: "3",
			category: "Food",
			amount: "-32",
			time: "07:30 PM",
			icon: "🍜",
		},
		{
			id: "4",
			category: "Shopping",
			amount: "-120",
			time: "10:00 AM",
			icon: "🛍️",
		},
		{
			id: "5",
			category: "Subscription",
			amount: "-80",
			time: "03:30 PM",
			icon: "📺",
		},
	];




	const clearToken = async () => {
		try {
			await AsyncStorage.removeItem("jwt");
			console.log("Token removed successfully!");
		} catch (error) {
			console.error("Error removing token:", error);
		}
	};


	const handleLogout = async () => {
		try {
			await signOut(); // Logs the user out
			await clearToken();
			router.replace("/(auth)/login"); // Redirect to register screen
		} catch (error) {
			console.error("Logout Error:", error);
		}
	};


	return (
		<SafeAreaView style={styles.mainContainer}>


			{/* Header */}
			<View style={styles.headerContainer}>

				<View style={styles.profileContainer}>

					<Image source={require("../../assets/images/icon-removebg-preview.png")} style={styles.profileImage} />

				</View>

				<Text style={styles.monthText}>October</Text>

				{/* <TouchableOpacity>
					             <Text style={styles.notificationIcon}>	🔔 </Text>
				      </TouchableOpacity> */}
				{isSignedIn ? (
					<TouchableOpacity onPress={handleLogout}>
						<Text style={styles.notificationIcon}>Logout</Text>
					</TouchableOpacity>
				) : (
					<TouchableOpacity onPress={() => router.replace("/(auth)/login")}>
						<Text style={styles.notificationIcon}>Login</Text>
					</TouchableOpacity>
				)}

			</View>



			{/* Account Balance */}
			{/* <View style={styles.balanceContainer}>
			   	     <Text style={styles.balanceText}>
				             	Account Balance
				       </Text>
				       <Text style={styles.balanceAmount}>
                      $9400
               </Text>  
             </View> */}




			<View style={styles.incomeExpenseContainer}>
				{/* income box */}

				<View style={styles.incomeMainCard}>
					<Image source={imagePath.incomepng} width={48} height={48} />

					<View>
						<Text style={styles.cardText}>
							Income
						</Text>
						<Text style={styles.cardAmount}>
							$5000
						</Text>
					</View>
				</View>



				{/* expense box */}
				<View style={styles.expenseMainCard}>
					<Image source={imagePath.expensepng} width={48} height={48} />

					<View>
						<Text style={styles.cardText}>
							Expenses
						</Text>
						<Text style={styles.cardAmount}>
							$1200
						</Text>
					</View>
				</View>


			</View>


			{/* Spend Frequency Chart */}
			<View style={styles.chartContainer}>
				<Chart />
			</View>


			{/* Recent Transactions */}
			<View style={styles.transactionsContainer}>

				<View style={styles.transactionsHeader}>
					<Text style={styles.sectionTitle}>
						Recent Transactions
					</Text>

					<TouchableOpacity>
						<Text style={styles.seeAllText}>
							See All
						</Text>
					</TouchableOpacity>

				</View>
				<TransactionsList transactions={transactions} />
			</View>

		</SafeAreaView>
	);
};

export default Main;

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		backgroundColor: "#F5F5F5",
		paddingHorizontal: 15,
	},

	headerContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginVertical: 15,
	},

	profileContainer: {
		width: 40,
		height: 40,
		borderRadius: 20,
		overflow: "hidden",
	},
	profileImage: {
		width: "100%",
		height: "100%",
	},
	monthText: {
		fontSize: 18,
		fontWeight: "600",
	},
	notificationIcon: {
		fontSize: 15,
	},
	balanceContainer: {
		alignItems: "center",
		marginBottom: 8,
	},

	balanceText: {
		fontSize: 16,
		color: "#7D7D7D",
	},
	balanceAmount: {
		fontSize: 32,
		fontWeight: "bold",
		color: "#000",
	},
	incomeExpenseContainer: {
		flexDirection: "row",
		alignItems: 'center',
		width: "100%",
		gap: 5,
		marginTop: 8,
		marginBottom: 8,
	},

	incomeMainCard: {
		flex: 1,
		flexDirection: 'row',
		borderRadius: 20,
		padding: 12,
		alignItems: "center",
		justifyContent: 'center',
		alignSelf: 'center',
		marginHorizontal: 10,
		gap: 8,
		backgroundColor: "#00A86B",
	},


	expenseMainCard: {
		flex: 1,
		flexDirection: 'row',
		borderRadius: 20,
		padding: 15,
		alignItems: "center",
		justifyContent: 'center',
		alignSelf: 'center',
		marginHorizontal: 10,
		gap: 5,
		backgroundColor: "#FD3C4A",
	},

	cardText: {
		fontSize: 16,
		fontWeight: "400",
		color: '#FCFCFC'
	},
	cardAmount: {
		fontSize: 20,
		fontWeight: "bold",
		color: '#FCFCFC'
	},


	chartContainer: {
		marginVertical: 10,
	},

	transactionsContainer: {
		flex: 1,
		marginVertical: 10,
	},

	transactionsHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 7,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: "600",
	},
	seeAllText: {
		color: "#007BFF",
	},
	transactionItem: {
		flexDirection: "row",
		alignItems: "center",
		padding: 15,
		backgroundColor: "#FFF",
		borderRadius: 12,
		marginBottom: 10,
		shadowColor: "#000",
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
		fontWeight: "600",
	},

	transactionTime: {
		fontSize: 12,
		color: "#7D7D7D",
	},

	transactionAmount: {
		fontSize: 16,
		fontWeight: "bold",
	},
	authContainer: {
		alignItems: "center",
		marginVertical: 10,
	},
	welcomeText: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#333",
	},
	authLink: {
		fontSize: 14,
		color: "#007BFF",
		marginTop: 5,
		textDecorationLine: "underline",
	},

});
