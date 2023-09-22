import { Component, ErrorInfo, ReactNode } from "react";

type ErrorBoundaryProps = {
	children: ReactNode;
};

type ErrorBoundaryState = {
	hasError: boolean;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(/* error: Error */) {
		return { hasError: true };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		// eslint-disable-next-line no-console
		console.error(error, errorInfo);

		/* "In the past, it was common to call setState inside componentDidCatch in order to update the UI
		and display the fallback error message. This is deprecated in favor of defining static getDerivedStateFromError."
		https://react.dev/reference/react/Component#componentdidcatch-caveats */
		// this.setState({ hasError: true });
	}

	render() {
		if (this.state.hasError) {
			return <div>Something went wrong. Check the console for errors!</div>;
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
