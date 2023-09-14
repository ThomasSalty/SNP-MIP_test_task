import Window from "./Window";
import CloseIcon from "../assets/close-icon.svg";
import {
	getClients,
	getFilteredClients,
	getReports,
	getReportData,
	getSearchQuery,
	useAppSelector,
	type Client
} from "../state";
import styles from "./client.module.scss";
import { getRandomChartComponent } from "../helpers/getRandomChartComponent";

function Clients() {
	const clients = useAppSelector(getClients);
	const filteredClients = useAppSelector(getFilteredClients);
	const reports = useAppSelector(getReports);
	const reportData = useAppSelector(getReportData);
	const searchQuery = useAppSelector(getSearchQuery);

	const clientsToShow = searchQuery ? filteredClients : clients;

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
					.map((data) => {
						const ChartComponent = getRandomChartComponent();

						return (
							<span key={data.id} className={styles.reportDataItem}>
								<ChartComponent chartData={data.values} />
								<img
									src={CloseIcon}
									className={styles.closeIcon}
									// onClick={deleteReportOrClient}
								/>
							</span>
						);
					})}
			</Window>
		));
	};

	return (
		<div className={styles.clientWrapper}>
			{clientsToShow.length === 0 ? (
				<p>There are no clients in the database!</p>
			) : (
				clientsToShow.map((client) => (
					<Window clientId={client.id} key={client.id} title={client.title}>
						{renderReportsForClient(client)}
					</Window>
				))
			)}
		</div>
	);
}

export default Clients;
