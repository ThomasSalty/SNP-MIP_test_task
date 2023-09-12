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
		receivedDb(state, action: PayloadAction<DB>) {
			state.clients = action.payload.clients;
			state.reports = action.payload.reports;
			state.reportData = action.payload.reportData;
		}
	}
});
export const { receivedDb } = dbSlice.actions;

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
/* export const getTotalPages = createSelector(
	(state: RootState) => state.movieList.totalAmount,
	(state: RootState) => state.movieList.limit,
	(totalAmount, limit) => Math.ceil(totalAmount / limit)
); */
