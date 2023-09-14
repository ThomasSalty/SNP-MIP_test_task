import { describe, expect, test } from "vitest";
import { generateRandomReportData } from "./getRandomReportData";

describe("generateRandomReportData helper function", () => {
	test("generateRandomReportData generates an array of 6 random numbers between 0 and 25", () => {
		const result = generateRandomReportData();

		expect(Array.isArray(result)).toBe(true);
		expect(result.length === 6);

		result.forEach((number) => {
			expect(number >= 0 && number <= 25);
		});
	});
});
