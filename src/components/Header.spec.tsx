import { describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import Header from "./Header";
import {
	Provider,
	store,
	addedClient,
	filteredClients,
	savedSearchQuery
} from "../state";

describe("Header component", () => {
	test("renders the 'New Client' button and a search input", () => {
		render(
			<Provider store={store}>
				<Header />
			</Provider>
		);

		expect(
			screen.getByRole("button", { name: "New Client" })
		).toBeInTheDocument();

		expect(screen.getByPlaceholderText("Client search")).toBeInTheDocument();
		expect(screen.getByPlaceholderText("Client search")).toHaveValue("");
	});

	test("clicking on the 'New Client' button invokes the appDispatch function", () => {
		const mockAppDispatch = vi.fn();
		store.dispatch = mockAppDispatch;

		render(
			<Provider store={store}>
				<Header />
			</Provider>
		);

		fireEvent.click(screen.getByRole("button", { name: "New Client" }));

		// "addNewClient" fn has 2 appDispatch calls
		// and they get called once on the first render and then when clicking on the "New Client" button.
		expect(mockAppDispatch).toHaveBeenCalledTimes(4);

		expect(mockAppDispatch).toHaveBeenCalledWith(addedClient());
		expect(mockAppDispatch).toHaveBeenCalledWith(
			filteredClients({ searchQuery: "" })
		);
	});

	test("changing searchQuery calls appDispatch", () => {
		const mockAppDispatch = vi.fn();
		store.dispatch = mockAppDispatch;

		render(
			<Provider store={store}>
				<Header />
			</Provider>
		);

		const inputField = screen.getByPlaceholderText("Client search");
		const newSearchQuery = "new search query";
		fireEvent.change(inputField, { target: { value: newSearchQuery } });

		expect(mockAppDispatch).toHaveBeenCalledTimes(4);

		expect(mockAppDispatch).toHaveBeenCalledWith(
			filteredClients({ searchQuery: newSearchQuery })
		);
		expect(mockAppDispatch).toHaveBeenCalledWith(
			savedSearchQuery({ searchQuery: newSearchQuery })
		);
	});
});
