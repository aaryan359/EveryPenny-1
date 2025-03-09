import {
	View,
	Text,
	Image,
	TouchableOpacity,
	StyleSheet,
	ImageSourcePropType,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import { router } from "expo-router";



interface AccountOptionProps {
	iconSource: ImageSourcePropType;
	label: string;
	onPress: () => void; 
}

const AccountOption: React.FC<AccountOptionProps> = ({ iconSource,label,onPress }) => (

	  <TouchableOpacity
		      style={styles.accountOptionContainer}
		      onPress={onPress}>
	    	<View style={styles.iconContainer}>
			      <Image source={iconSource} style={styles.icon}		/>
	  	 </View>
	        	<Text style={styles.accountOptionText}>{label}</Text>
	</TouchableOpacity> 
);




const Profile = () => {
	return (

		<SafeAreaView style={styles.mainContainer}>

			  <View style={styles.headerContainer}>
				        <View style={styles.profileContainer}>
					                   <Image source={require("../../../assets/images/icon-removebg-preview.png")} style={styles.profileImage} />
			          </View>

			        	<View style={styles.textContainer}>
					                 <Text style={styles.username}> 		Username 			</Text>
					                 <Text style={styles.name}>    		Aryan Meena 		</Text>
				       </View>

				      <TouchableOpacity>
					              <Feather name="edit-2" size={30} color="black" style={styles.editIcon} />
			        </TouchableOpacity>
			  </View>

		

		 	<View style={styles.accountOptionsWrapper}>

				  <AccountOption	onPress={() => {
                                      
                                       router.push('/(main)/profile/account')

                                   }}

				                	iconSource={require("../../../assets/images/Wallet.png")}
					                label="Account"
				  />

			  	<AccountOption onPress={() => {                              
					    router.push('/(main)/profile/setting')
                             }}

				              	iconSource={require("../../../assets/images/settings.png")}
					              label="Settings"
				  />

				  <AccountOption onPress={() => {router.push("../../components/ProfilePageComponents/Setting.tsx");}}

					               iconSource={require("../../../assets/images/logout.png")}
				                	label="Logout"
			  	/>

			</View>

		</SafeAreaView>
	);
};

export default Profile;

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		backgroundColor: "#FFFFFF",
		padding: 20,
	},
	headerContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 30,
	},
	profileContainer: {
		width: 80,
		height: 80,
		borderRadius: 40,
		borderColor: "#3200E6",
		borderWidth: 2,
		overflow: "hidden",
	},
	profileImage: {
		width: "100%",
		height: "100%",
	},
	textContainer: {
		flex: 1,
		marginLeft: 15,
	},
	username: {
		fontSize: 14,
		fontWeight: "500",
		color: "#91919F",
	},
	name: {
		fontSize: 24,
		fontWeight: "600",
		color: "#161719",
	},
	editIcon: {
		marginLeft: 15,
	},
	accountOptionsWrapper: {
		flex: 1,
		justifyContent: "center",
		gap: 15,
		paddingHorizontal: 20,
		backgroundColor: "#FFFFFF",
		borderRadius: 15,
	},
	accountOptionContainer: {
		flexDirection: "row",
		alignItems: "center",
		padding: 15,
		backgroundColor: "#F7F7F7",
		borderRadius: 10,
		elevation: 2,
	},
	iconContainer: {
		width: 72,
		height: 72,
		backgroundColor: "#EEE5FF",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 20,
		marginRight: 15,
	},
	icon: {
		width: 50,
		height: 50,
	},
	accountOptionText: {
		fontSize: 18,
		fontWeight: "500",
		color: "#161719",
	},
});
