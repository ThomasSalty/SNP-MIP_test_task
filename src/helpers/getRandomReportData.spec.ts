import { describe, expect, test } from "vitest";

import { getRandomReportData } from "./getRandomReportData";

describe("getRandomReportData helper function", () => {
	test("it generates an array of 6 random numbers between 0 and 25", () => {
		const result = getRandomReportData();

		expect(Array.isArray(result)).toBe(true);
		expect(result.length).toBe(6);

		result.forEach((number) => {
			expect(number).toBeGreaterThanOrEqual(0);
			expect(number).toBeLessThanOrEqual(25);
		});
	});
});
