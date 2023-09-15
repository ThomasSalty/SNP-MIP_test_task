import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
	type ChartOptions,
	type ChartData
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

interface BarChartProps {
	chartData: number[];
}

export function BarChart({ chartData }: BarChartProps) {
	const options: ChartOptions<"bar"> = {
		maintainAspectRatio: false
	};

	const data: ChartData<"bar", number[], unknown> = {
		labels: chartData.map((_, index) => `${index + 1}`),
		datasets: [
			{
				label: "",
				data: chartData,
				backgroundColor: "rgba(255, 159, 64, 0.5)"
			}
		]
	};

	return <Bar data={data} options={options} />;
}
