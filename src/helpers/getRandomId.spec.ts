import { expect, test } from "vitest";
import { getRandomId } from "./getRandomId";

test("generates a random ID that is a number", () => {
	const id = getRandomId();
	expect(typeof id).toBe("number");
});

test("generates a random ID that is greater than or equal to 0", () => {
	const id = getRandomId();
	expect(id).toBeGreaterThanOrEqual(0);
});

test("generates a random ID that is less than the current timestamp", () => {
	const id = getRandomId();
	const currentTimestamp = Date.now();
	expect(id).toBeLessThan(currentTimestamp);
});
