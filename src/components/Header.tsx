import styles from "./header.module.scss";

function Header() {
	return (
		<div className={styles.headerContainer}>
			<button className={styles.newClientButton}>New Client</button>
			<input
				type="search"
				placeholder="Client search"
				className={styles.searchInput}
			/>
		</div>
	);
}

export default Header;
