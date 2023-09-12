import Window from "./Window";
import {
	getClients,
	getReports,
	getReportData,
	useAppSelector
} from "../state";
import styles from "./client.module.scss";

function Clients() {
	const clients = useAppSelector(getClients);
	const reports = useAppSelector(getReports);
	const reportData = useAppSelector(getReportData);

	return (
		<div className={styles.clientWrapper}>
			{clients.map((client) => (
				<Window key={client.id} title={client.title}>
					{reports
						.filter((clientReport) => clientReport.clientId === client.id)
						.map((report) => (
							<Window key={report.id} title={report.reportTitle} isReport>
								{reportData
									.filter((reportData) => reportData.reportId === report.id)
									.map((data) => (
										<span key={data.id}>{data.value.toString()}</span>
									))}
							</Window>
						))}
				</Window>
			))}
		</div>
	);
}

export default Clients;
