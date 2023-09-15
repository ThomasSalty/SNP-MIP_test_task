import { describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import {
	Provider,
	addedReportDataToReport,
	addedReportToClient,
	deletedClient,
	deletedReport,
	store
} from "../state";
import Window from "./Window";

describe("Window component", () => {
	test('clicking on the "Add report" button calls appDispatch with addedReportToClient action', () => {
		const mockAppDispatch = vi.fn();
		store.dispatch = mockAppDispatch;

		const clientId = 0;

		render(
			<Provider store={store}>
				<Window
					clientId={clientId}
					reportId={0}
					title="Test Window"
					isReport={false}
				/>
			</Provider>
		);

		fireEvent.click(screen.getByRole("button", { name: "Add report" }));

		expect(mockAppDispatch).toHaveBeenCalledOnce();

		expect(mockAppDispatch).toHaveBeenCalledWith(
			addedReportToClient({ clientId })
		);
	});

	test('clicking on the "Add data" button calls appDispatch with addedReportDataToReport action', () => {
		const mockAppDispatch = vi.fn();
		store.dispatch = mockAppDispatch;

		const reportId = 0;

		render(
			<Provider store={store}>
				<Window
					clientId={0}
					reportId={reportId}
					title="Test Window"
					isReport={true}
				/>
			</Provider>
		);

		fireEvent.click(screen.getByRole("button", { name: "Add data" }));

		expect(mockAppDispatch).toHaveBeenCalledOnce();

		expect(mockAppDispatch).toHaveBeenCalledWith(
			addedReportDataToReport({ reportId })
		);
	});

	test("clicking on the X button calls appDispatch with deletedReport action when it's a report", () => {
		const mockAppDispatch = vi.fn();
		store.dispatch = mockAppDispatch;

		const clientId = 0;
		const reportId = 0;

		render(
			<Provider store={store}>
				<Window
					clientId={clientId}
					reportId={reportId}
					title="Test Window"
					isReport={true}
				/>
			</Provider>
		);

		fireEvent.click(screen.getByRole("img"));

		expect(mockAppDispatch).toHaveBeenNthCalledWith(
			1,
			deletedReport({ clientId, reportId })
		);
	});

	test("clicking on the X button calls appDispatch with deletedClient action when it's a client", () => {
		const mockAppDispatch = vi.fn();
		store.dispatch = mockAppDispatch;

		const clientId = 0;

		render(
			<Provider store={store}>
				<Window
					clientId={clientId}
					reportId={0}
					title="Test Window"
					isReport={false}
				/>
			</Provider>
		);

		fireEvent.click(screen.getByRole("img"));

		expect(mockAppDispatch).toHaveBeenNthCalledWith(
			1,
			deletedClient({ clientId })
		);
	});
});
