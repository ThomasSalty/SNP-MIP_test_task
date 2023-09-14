import { AreaChart } from "../components/charts/AreaChart";
import { BarChart } from "../components/charts/BarChart";
import { DoughnutChart } from "../components/charts/DoughnutChart";
import { LineChart } from "../components/charts/LineChart";
import { PieChart } from "../components/charts/PieChart";

export function getRandomChartComponent() {
	const chartComponents = [
		PieChart,
		LineChart,
		DoughnutChart,
		BarChart,
		AreaChart
	];
	const randomIndex = Math.floor(Math.random() * chartComponents.length);

	return chartComponents[randomIndex];
}
