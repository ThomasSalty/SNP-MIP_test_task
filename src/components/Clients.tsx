import Window from "./Window";
import {
	getClients,
	getReports,
	getReportData,
	useAppSelector,
	type Client
} from "../state";
import styles from "./client.module.scss";

function Clients() {
	const clients = useAppSelector(getClients);
	const reports = useAppSelector(getReports);
	const reportData = useAppSelector(getReportData);

	const renderReportsForClient = (client: Client) => {
		const clientReports = reports.filter(
			(clientReport) => clientReport.clientId === client.id
		);

		if (clientReports.length === 0) {
			return <p>{`${client.title} has no reports!`}</p>;
		}

		return clientReports.map((report) => (
			<Window
				clientId={client.id}
				reportId={report.id}
				key={report.id}
				title={report.reportTitle}
				isReport
			>
				{reportData
					.filter((data) => data.reportId === report.id)
					.map((data) => (
						<span key={data.id}>{data.value.toString()}</span>
					))}
			</Window>
		));
	};

	return (
		<div className={styles.clientWrapper}>
			{clients.length === 0 ? (
				<p>There are no clients in the database!</p>
			) : (
				clients.map((client) => (
					<Window clientId={client.id} key={client.id} title={client.title}>
						{renderReportsForClient(client)}
					</Window>
				))
			)}
		</div>
	);
}

export default Clients;
