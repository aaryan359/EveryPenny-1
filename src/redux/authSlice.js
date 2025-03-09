import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
	token: null, 
	isAuthenticated: false, 
};

const authSlice = createSlice({

	name: "auth",
	initialState,
	reducers: {
		

		setToken: (state, action) => {
			state.token = action.payload; 
			state.isAuthenticated = true; 
			AsyncStorage.setItem("token", action.payload).catch((err) =>
				console.error("Error saving token:", err)
			); 
			
		},


		
		clearToken: (state) => {
			state.token = null
			state.isAuthenticated = false; 

			AsyncStorage.removeItem("token").catch((err) =>
				console.error("Error removing token:", err)
			); 
			
		},

		// Initialize auth state from token in AsyncStorage
		initializeAuth: (state, action) => {
			state.token = action.payload || null; 
			state.isAuthenticated = !!action.payload; 
		},
	},
});




// Export actions
export const { setToken, clearToken, initializeAuth } = authSlice.actions;

export default authSlice.reducer;
