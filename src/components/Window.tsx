import styles from "./window.module.scss";
import CloseIcon from "../../public/close-icon.svg";

interface WindowProps {
	title: string;
	isReport?: boolean;
	children?: React.ReactNode[];
}

function Window({ title, isReport, children }: WindowProps) {
	return (
		<details className={styles.details}>
			<summary className={styles.summary}>
				{title}
				<img
					src={CloseIcon}
					className={styles.closeIcon}
					onClick={() => {
						alert("remove element");
					}}
				/>
			</summary>

			<div className={styles.options}>
				<div className={styles.windowHeader}>
					<span>{`${title} ${isReport ? "data" : "reports"}`}</span>
					<button>{`Add ${isReport ? "report" : "data"}`}</button>
				</div>
				<div className={isReport ? styles.reportDataItems : ""}>{children}</div>
			</div>
		</details>
	);
}

export default Window;
