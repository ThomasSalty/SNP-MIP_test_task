/* eslint-disable no-console */
import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import ErrorBoundary from "./ErrorBoundary";

describe("ErrorBoundary component", () => {
	test("ErrorBoundary renders children when no error occurs", () => {
		render(
			<ErrorBoundary>
				<div>Child Component</div>
			</ErrorBoundary>
		);

		expect(screen.getByText("Child Component")).toBeInTheDocument();
	});

	test("ErrorBoundary handles errors and shows an error message", () => {
		const originalConsoleError = console.error;
		console.error = vi.fn();

		const TestComponent: React.FC = () => {
			throw new Error("Test Error");
		};

		render(
			<ErrorBoundary>
				<TestComponent />
			</ErrorBoundary>
		);

		expect(
			screen.getByText("Something went wrong. Check the console for errors!")
		).toBeInTheDocument();

		expect(console.error).toHaveBeenCalled();

		console.error = originalConsoleError;
	});
});
