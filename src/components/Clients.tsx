import Window from "./Window";
import CloseIcon from "../assets/close-icon.svg";
import {
	deletedReportData,
	getClients,
	getFilteredClients,
	getReports,
	getReportData,
	getSearchQuery,
	useAppDispatch,
	useAppSelector,
	type Client,
	type Report
} from "../state";
import styles from "./client.module.scss";
import {
	type ComponentName,
	componentMap,
	getRandomChartComponent
} from "../helpers/getRandomChartComponent";

function Clients() {
	const appDispatch = useAppDispatch();

	const clients = useAppSelector(getClients);
	const filteredClients = useAppSelector(getFilteredClients);
	const reports = useAppSelector(getReports);
	const reportData = useAppSelector(getReportData);
	const searchQuery = useAppSelector(getSearchQuery);

	const clientsToShow = searchQuery ? filteredClients : clients;

	const deleteReportData = (reportId: number, reportDataId: number) => {
		appDispatch(deletedReportData({ reportId, reportDataId }));
		localStorage.removeItem(reportDataId.toString());
	};

	const getChartComponentForReportData = (reportDataId: string) => {
		let ChartComponent;
		const componentName = localStorage.getItem(
			reportDataId
		) as ComponentName | null;

		if (componentName) {
			ChartComponent = componentMap[componentName];
		} else {
			ChartComponent = getRandomChartComponent();
			localStorage.setItem(reportDataId, ChartComponent.name);
		}

		return ChartComponent;
	};

	const renderReportDataForReport = (report: Report) => {
		const reportDataItems = reportData.filter(
			(data) => data.reportId === report.id
		);

		if (reportDataItems.length === 0) {
			return <p>{`${report.reportTitle} has no data!`}</p>;
		}

		return reportDataItems.map((data) => {
			const ChartComponent = getChartComponentForReportData(data.id.toString());

			return (
				<span key={data.id} className={styles.reportDataItem}>
					<ChartComponent chartData={data.values} />
					<img
						src={CloseIcon}
						className={styles.closeIcon}
						onClick={() => deleteReportData(report.id, data.id)}
					/>
				</span>
			);
		});
	};

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
				{renderReportDataForReport(report)}
			</Window>
		));
	};

	return (
		<div className={styles.clientWrapper}>
			{clientsToShow.length === 0 ? (
				<p>There are no clients in the database!</p>
			) : (
				clientsToShow.map((client) => (
					<Window
						clientId={client.id}
						reportId={0}
						key={client.id}
						title={client.title}
					>
						{renderReportsForClient(client)}
					</Window>
				))
			)}
		</div>
	);
}

export default Clients;
