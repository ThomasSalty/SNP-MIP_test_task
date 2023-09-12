import { useEffect, useState } from "react";

import Window from "./Window";
import styles from "./client.module.scss";

type Client = {
	id: number;
	title: string;
};
type Report = {
	id: number;
	reportTitle: string;
	clientId: number;
};
type ReportData = {
	id: number;
	value: number;
	reportId: number;
};
type DB = {
	clients: Client[];
	reports: Report[];
	reportData: ReportData[];
};

function Clients() {
	const [data, setData] = useState<DB>({
		clients: [],
		reports: [],
		reportData: []
	});

	useEffect(() => {
		(async () => {
			const response = await fetch("http://localhost:3000/db");
			const data = await response.json();
			setData(data);
		})();
	}, []);

	return (
		<div className={styles.clientWrapper}>
			{data.clients.map((client) => (
				<Window key={client.id} title={client.title}>
					{data.reports
						.filter((clientReport) => clientReport.clientId === client.id)
						.map((report) => (
							<Window key={report.id} title={report.reportTitle} isReport>
								{data.reportData
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
