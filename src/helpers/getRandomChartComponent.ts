import { AreaChart } from "../components/charts/AreaChart";
import { BarChart } from "../components/charts/BarChart";
import { DoughnutChart } from "../components/charts/DoughnutChart";
import { LineChart } from "../components/charts/LineChart";
import { PieChart } from "../components/charts/PieChart";

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
