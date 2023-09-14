import {
	type TypedUseSelectorHook,
	useSelector,
	useDispatch
} from "react-redux";
import {
	type PayloadAction,
	configureStore,
	createSelector,
	createSlice
} from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { getRandomId } from "./helpers/getRandomId";
import { generateRandomReportData } from "./helpers/getRandomReportData";

// Just a re-export from "react-redux".
export { Provider } from "react-redux";

export const api = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:3000"
	}),
	endpoints: (build) => ({
		db: build.query({
			query: () => "db"
		})
	})
});

export type Client = {
	id: number;
	title: string;
};
export type Report = {
	id: number;
	reportTitle: string;
	clientId: number;
};
type ReportData = {
	id: number;
	values: number[];
	reportId: number;
};
export type DB = {
	clients: Client[];
	filteredClients: Client[]; // for search functionality
	reports: Report[];
	reportData: ReportData[];
};
export const dbInitialState: DB = {
	clients: [],
	filteredClients: [],
	reports: [],
	reportData: []
};

const dbSlice = createSlice({
	name: "db",
	initialState: dbInitialState,
	reducers: {
		receivedDbData(state, action: PayloadAction<DB>) {
			state.clients = action.payload.clients;
			state.filteredClients = action.payload.clients;
			state.reports = action.payload.reports;
			state.reportData = action.payload.reportData;
		},
		deletedClient(state, action: PayloadAction<{ clientId: number }>) {
			state.clients = state.clients.filter(
				(client) => client.id !== action.payload.clientId
			);
			state.filteredClients = state.filteredClients.filter(
				(client) => client.id !== action.payload.clientId
			);
		},
		deletedReport(
			state,
			action: PayloadAction<{ clientId: number; reportId?: number }>
		) {
			state.reports = state.reports.filter(
				(report) =>
					report.clientId !== action.payload.clientId ||
					report.id !== action.payload.reportId
			);
		},
		deletedReportData(
			state,
			action: PayloadAction<{ reportId: number; reportDataId: number }>
		) {
			state.reportData = state.reportData.filter(
				(data) =>
					data.reportId !== action.payload.reportId ||
					data.id !== action.payload.reportDataId
			);
		},
		addedClient(state) {
			const randomId = getRandomId();
			state.clients.push({
				id: randomId,
				title: `Client #${randomId}`
			});
			state.filteredClients = [...state.clients];
		},
		addedReportToClient(state, action: PayloadAction<{ clientId: number }>) {
			const randomId = getRandomId();
			state.reports.push({
				id: randomId,
				reportTitle: `Report #${randomId}`,
				clientId: action.payload.clientId
			});
		},
		addedReportDataToReport(
			state,
			action: PayloadAction<{ reportId: number }>
		) {
			const randomId = getRandomId();
			const randomReportData = generateRandomReportData();
			state.reportData.push({
				id: randomId,
				values: randomReportData,
				reportId: action.payload.reportId
			});
		},
		filteredClients(state, action: PayloadAction<{ searchQuery: string }>) {
			state.filteredClients = state.clients.filter((client) =>
				client.title
					.toLowerCase()
					.includes(action.payload.searchQuery.toLowerCase())
			);
		}
	}
});
export const {
	receivedDbData,
	deletedClient,
	deletedReport,
	deletedReportData,
	addedClient,
	addedReportToClient,
	addedReportDataToReport,
	filteredClients
} = dbSlice.actions;

const searchSlice = createSlice({
	name: "search",
	initialState: { searchQuery: "" },
	reducers: {
		savedSearchQuery(state, action: PayloadAction<{ searchQuery: string }>) {
			state.searchQuery = action.payload.searchQuery;
		}
	}
});
export const { savedSearchQuery } = searchSlice.actions;

export const store = configureStore({
	reducer: {
		[api.reducerPath]: api.reducer,
		db: dbSlice.reducer,
		search: searchSlice.reducer
	},
	middleware: (getDefaultMiddleware) => [
		...getDefaultMiddleware(),
		api.middleware
	]
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const getClients = createSelector(
	(state: RootState) => state.db.clients,
	(clients) => clients
);
export const getFilteredClients = createSelector(
	(state: RootState) => state.db.filteredClients,
	(filteredClients) => filteredClients
);
export const getReports = createSelector(
	(state: RootState) => state.db.reports,
	(reports) => reports
);
export const getReportData = createSelector(
	(state: RootState) => state.db.reportData,
	(reportData) => reportData
);
export const getSearchQuery = createSelector(
	(state: RootState) => state.search.searchQuery,
	(searchQuery) => searchQuery
);
