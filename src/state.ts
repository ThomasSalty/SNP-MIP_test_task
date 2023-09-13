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
		/* movieList: build.query({
			query: ({ sortBy, search, filter, offset }) =>
				`${sortBy}${search}${filter}${offset}`
		}),
		movieDetails: build.query({
			query: ({ movieId }) => `${movieId}`
		}) */
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
	value: number;
	reportId: number;
};
export type DB = {
	clients: Client[];
	reports: Report[];
	reportData: ReportData[];
};
export const dbInitialState: DB = {
	clients: [],
	reports: [],
	reportData: []
};
const dbSlice = createSlice({
	name: "db",
	initialState: dbInitialState,
	reducers: {
		receivedDbData(state, action: PayloadAction<DB>) {
			state.clients = action.payload.clients;
			state.reports = action.payload.reports;
			state.reportData = action.payload.reportData;
		},
		deletedClient(state, action: PayloadAction<{ clientId: number }>) {
			state.clients = state.clients.filter(
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
		addedClient(state) {
			const randomId = getRandomId();
			state.clients.push({
				id: randomId,
				title: `Client #${randomId}`
			});
		},
		addedReportToClient(state, action: PayloadAction<{ clientId: number }>) {
			const randomId = getRandomId();
			state.reports.push({
				id: randomId,
				reportTitle: `Report #${randomId}`,
				clientId: action.payload.clientId
			});
		}
	}
});
export const {
	receivedDbData,
	deletedClient,
	deletedReport,
	addedClient,
	addedReportToClient
} = dbSlice.actions;

export const store = configureStore({
	reducer: {
		[api.reducerPath]: api.reducer,
		db: dbSlice.reducer
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
export const getReports = createSelector(
	(state: RootState) => state.db.reports,
	(reports) => reports
);
export const getReportData = createSelector(
	(state: RootState) => state.db.reportData,
	(reportData) => reportData
);
