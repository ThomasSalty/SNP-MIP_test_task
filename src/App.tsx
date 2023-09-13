import { useEffect, useMemo } from "react";

import Header from "./components/Header";
import Clients from "./components/Clients";

import {
	type DB,
	api,
	useAppDispatch,
	receivedDbData,
	dbInitialState
} from "../src/state";

import styles from "./app.module.scss";

function App() {
	const { useDbQuery } = api;
	const { data, isUninitialized, isLoading, isSuccess } = useDbQuery({});

	const db = useMemo<DB>(
		() => (isSuccess ? { ...data } : dbInitialState),
		[isSuccess, data]
	);

	const appDispatch = useAppDispatch();

	useEffect(() => {
		appDispatch(receivedDbData(db));
	}, [appDispatch, db]);

	return (
		<div className={styles.container}>
			<Header />

			{isUninitialized || isLoading ? (
				<div className={styles.spinner} />
			) : (
				<Clients />
			)}
		</div>
	);
}

export default App;
