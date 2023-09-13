import styles from "./header.module.scss";
import { addedClient, useAppDispatch } from "../state";

function Header() {
	const appDispatch = useAppDispatch();

	const addNewClient = () => appDispatch(addedClient());

	return (
		<div className={styles.headerContainer}>
			<button className={styles.newClientButton} onClick={addNewClient}>
				New Client
			</button>
			<input
				type="search"
				placeholder="Client search"
				className={styles.searchInput}
			/>
		</div>
	);
}

export default Header;
