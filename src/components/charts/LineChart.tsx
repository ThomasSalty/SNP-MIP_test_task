import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	type ChartOptions,
	type ChartData
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

interface LineChartProps {
	chartData: number[];
}

export function LineChart({ chartData }: LineChartProps) {
	const options: ChartOptions<"line"> = {
		maintainAspectRatio: false
	};

	const data: ChartData<"line", number[], unknown> = {
		labels: chartData.map((_, index) => `${index + 1}`),
		datasets: [
			{
				label: "",
				data: chartData,
				borderColor: "rgb(255, 99, 132)",
				backgroundColor: "rgba(255, 99, 132, 0.5)"
			}
		]
	};

	return <Line data={data} options={options} />;
}
