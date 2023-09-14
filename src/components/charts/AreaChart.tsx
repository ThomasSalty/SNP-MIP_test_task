import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
	Legend
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
	Legend
);

interface AreaChartProps {
	chartData: number[];
}

export function AreaChart({ chartData }: AreaChartProps) {
	const options = {
		maintainAspectRatio: false
	};

	const data = {
		labels: chartData.map((_, index) => `${index + 1}`),
		datasets: [
			{
				fill: true,
				label: "",
				data: chartData,
				borderColor: "rgb(53, 162, 235)",
				backgroundColor: "rgba(53, 162, 235, 0.5)"
			}
		]
	};

	return <Line options={options} data={data} />;
}
