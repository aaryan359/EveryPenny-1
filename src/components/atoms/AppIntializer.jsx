import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadAuthFromStorage } from "../../redux/authSlice";

const AppInitializer = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		// Load token from AsyncStorage and initialize auth state
		dispatch(loadAuthFromStorage());
	}, [dispatch]);

	return null; // This component doesn't render anything
};

export default AppInitializer;
