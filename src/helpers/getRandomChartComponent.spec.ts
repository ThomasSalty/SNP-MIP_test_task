import { describe, expect, test } from "vitest";
import { getRandomChartComponent } from "./getRandomChartComponent";

describe("getRandomChartComponent helper function", () => {
	test("getRandomChartComponent returns a random chart component", () => {
		const result = getRandomChartComponent();

		const validChartComponents = [
			"PieChart",
			"LineChart",
			"DoughnutChart",
			"BarChart",
			"AreaChart"
		];

		expect(validChartComponents).toContain(result.name);
	});
});
