import styles from "./window.module.scss";
import CloseIcon from "../assets/close-icon.svg";
import {
	addedReportToClient,
	deletedClient,
	deletedReport,
	useAppDispatch
} from "../state";

interface WindowProps {
	clientId: number;
	reportId?: number;
	title: string;
	isReport?: boolean;
	children?: React.ReactNode;
}

function Window({
	clientId,
	reportId,
	title,
	isReport,
	children
}: WindowProps) {
	const appDispatch = useAppDispatch();

	const deleteReportOrClient = () =>
		isReport
			? appDispatch(deletedReport({ clientId, reportId }))
			: appDispatch(deletedClient({ clientId }));

	const addReportOrData = () =>
		isReport
			? console.log("add data")
			: appDispatch(addedReportToClient({ clientId }));

	return (
		<details className={styles.details}>
			<summary className={styles.summary}>
				{title}
				<img
					src={CloseIcon}
					className={styles.closeIcon}
					onClick={deleteReportOrClient}
				/>
			</summary>

			<div className={styles.options}>
				<div className={styles.windowHeader}>
					<span>{`${title} ${isReport ? "data" : "reports"}`}</span>
					<button onClick={addReportOrData}>
						{`Add ${isReport ? "data" : "report"}`}
					</button>
				</div>
				<div className={isReport ? styles.reportDataItems : ""}>{children}</div>
			</div>
		</details>
	);
}

export default Window;
