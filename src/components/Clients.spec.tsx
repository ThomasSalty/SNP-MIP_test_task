import { describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import Clients from "./Clients";
import {
	type Client,
	type Report,
	type ReportData,
	Provider,
	store,
	deletedReportData
} from "../state";

type StateMock = {
	db: {
		clients: Client[];
		reports: Report[];
		reportData: ReportData[];
	};
	search: { searchQuery: string };
};

const initialStateMock: StateMock = {
	db: {
		clients: [
			{ id: 1, title: "Client #1" },
			{ id: 2, title: "Client #2" }
		],
		reports: [
			{
				id: 12345,
				reportTitle: "Report #12345",
				clientId: 1
			},
			{
				id: 23456,
				reportTitle: "Report #23456",
				clientId: 2
			}
		],
		reportData: [
			{
				id: 101,
				values: [12, 19, 3, 5, 2, 3],
				reportId: 12345
			},
			{
				id: 105,
				values: [4, 12, 13, 1, 7, 24],
				reportId: 23456
			}
		]
	},
	search: { searchQuery: "" }
};

describe("Clients component", () => {
	afterAll(() => {
		vi.restoreAllMocks();
	});

	window.sessionStorage = {
		...window.sessionStorage,
		setItem: vi.fn(),
		getItem: vi.fn(),
		removeItem: vi.fn()
	};

	const mockAppSelector = vi.fn().mockReturnValue(initialStateMock);
	const mockAppDispatch = vi.fn();
	store.getState = mockAppSelector;
	store.dispatch = mockAppDispatch;

	test("Renders the clients", () => {
		render(
			<Provider store={store}>
				<Clients />
			</Provider>
		);

		const stateMock: StateMock = mockAppSelector();

		stateMock.db.clients.forEach((client) =>
			expect(screen.getByText(client.title)).toBeInTheDocument()
		);
	});

	test("Renders the reports within the clients", () => {
		render(
			<Provider store={store}>
				<Clients />
			</Provider>
		);

		const stateMock: StateMock = mockAppSelector();

		stateMock.db.reports.forEach((report) =>
			expect(screen.getByText(report.reportTitle)).toBeInTheDocument()
		);
	});

	test("Renders the reportData within the reports", () => {
		render(
			<Provider store={store}>
				<Clients />
			</Provider>
		);

		const stateMock: StateMock = mockAppSelector();

		const chartComponentContainers = screen.getAllByTestId(
			"chart-component-container"
		);

		expect(chartComponentContainers).toHaveLength(
			stateMock.db.reportData.length
		);

		// Each of these containers should have 2 children: a ChartComponent and an X button.
		chartComponentContainers.forEach((chartComponentContainer) => {
			expect(chartComponentContainer.childElementCount).toBe(2);
		});
	});

	test("Removes the reportData item when clicking on its remove button", () => {
		render(
			<Provider store={store}>
				<Clients />
			</Provider>
		);

		const stateMock: StateMock = mockAppSelector();

		const firstReportData = stateMock.db.reportData[0];

		const removeButtons = screen.getAllByAltText("RemoveButton");
		fireEvent.click(removeButtons[0]);

		expect(mockAppDispatch).toHaveBeenNthCalledWith(
			1,
			deletedReportData({
				reportId: firstReportData.reportId,
				reportDataId: firstReportData.id
			})
		);
		expect(sessionStorage.removeItem).toHaveBeenNthCalledWith(
			1,
			firstReportData.id.toString()
		);
	});
});
