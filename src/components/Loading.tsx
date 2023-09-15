import styles from "../app.module.scss";

function Loading() {
	return <div className={styles.spinner} data-testid="spinner" />;
}

export default Loading;
