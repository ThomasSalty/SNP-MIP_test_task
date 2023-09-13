import styles from "./window.module.scss";
import CloseIcon from "../../public/close-icon.svg";
import { deletedClient, deletedReport, useAppDispatch } from "../state";

interface WindowProps {
	id: number;
	title: string;
	isReport?: boolean;
	children?: React.ReactNode[];
}

function Window({ id, title, isReport, children }: WindowProps) {
	const appDispatch = useAppDispatch();

	return (
		<details className={styles.details}>
			<summary className={styles.summary}>
				{title}
				<img
					src={CloseIcon}
					className={styles.closeIcon}
					onClick={() =>
						isReport
							? appDispatch(deletedReport({ reportId: id }))
							: appDispatch(deletedClient({ clientId: id }))
					}
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
