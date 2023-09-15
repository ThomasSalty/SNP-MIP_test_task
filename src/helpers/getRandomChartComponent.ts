import {
	AreaChart,
	BarChart,
	DoughnutChart,
	LineChart,
	PieChart
} from "../components/charts";

export const componentMap = {
	PieChart,
	LineChart,
	DoughnutChart,
	BarChart,
	AreaChart
};
export type ComponentName = keyof typeof componentMap;

export function getRandomChartComponent() {
	const componentNames = Object.keys(componentMap);

	const randomComponentName = componentNames[
		Math.floor(Math.random() * componentNames.length)
	] as ComponentName;

	return componentMap[randomComponentName];
}
