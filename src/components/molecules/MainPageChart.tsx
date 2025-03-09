import React from "react";
import { BarChart } from "react-native-gifted-charts";
import { View } from "react-native";

const Chart = () => {
	
	const currentDayIndex = new Date().getDay();

	
	const barData = [
		{ value: 250, label: "S" },
		{ value: 500, label: "M" },
		{ value: 745, label: "T" },
		{ value: 320, label: "W" },
		{ value: 600, label: "T" },
		{ value: 256, label: "F" },
		{ value: 300, label: "S" },
	].map((item, index) => ({
		...item,
		frontColor: currentDayIndex === index ? "#177AD5" : "lightgray",
	}));

	return (
		<View>
			<BarChart
				barWidth={30}
                spacing={14}
				noOfSections={3}
				barBorderRadius={3}
				frontColor="lightgray"
				data={barData}
				yAxisThickness={1}
				xAxisThickness={2}
                height={140}
                
               

               
			/>
		</View>
	);
};

export default Chart;
