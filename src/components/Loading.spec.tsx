import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

import Loading from "./Loading";

describe("Loading component", () => {
	test("it renders a spinner", () => {
		render(<Loading />);

		expect(screen.getByTestId("spinner")).toBeInTheDocument();
	});
});
