import styles from "./loading.module.scss";

function Loading() {
	return <div className={styles.spinner} data-testid="spinner" />;
}

export default Loading;
