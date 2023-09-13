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
			{clients.length > 0 ? (
				clients.map((client) => (
					<Window
						clientId={client.id}
						reportId={0}
						key={client.id}
						title={client.title}
					>
						{reports.filter(
							(clientReport) => clientReport.clientId === client.id
						).length > 0 ? (
							reports
								.filter((clientReport) => clientReport.clientId === client.id)
								.map((report) => (
									<Window
										clientId={client.id}
										reportId={report.id}
										key={report.id}
										title={report.reportTitle}
										isReport
									>
										{reportData
											.filter((reportData) => reportData.reportId === report.id)
											.map((data) => (
												<span key={data.id}>{data.value.toString()}</span>
											))}
									</Window>
								))
						) : (
							<p>{`${client.title} has no reports!`}</p>
						)}
					</Window>
				))
			) : (
				<p>There are no clients in the database!</p>
			)}
		</div>
	);
}

export default Clients;
