import { useEffect, useState } from "react";

import styles from "./header.module.scss";
import {
	addedClient,
	filteredClients,
	savedSearchQuery,
	useAppDispatch
} from "../state";

function Header() {
	const [searchQuery, setSearchQuery] = useState("");
	const appDispatch = useAppDispatch();

	const addNewClient = () => {
		appDispatch(addedClient());
		appDispatch(filteredClients({ searchQuery }));
	};

	const handleSearchInputChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setSearchQuery(event.target.value);
	};

	useEffect(() => {
		appDispatch(filteredClients({ searchQuery }));
		appDispatch(savedSearchQuery({ searchQuery }));
	}, [appDispatch, searchQuery]);

	return (
		<div className={styles.headerContainer}>
			<button className={styles.newClientButton} onClick={addNewClient}>
				New Client
			</button>
			<input
				type="search"
				placeholder="Client search"
				className={styles.searchInput}
				value={searchQuery}
				onChange={handleSearchInputChange}
			/>
		</div>
	);
}

export default Header;
