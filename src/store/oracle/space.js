import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import { apiCallBegan } from "../api";

const slice = createSlice({
  name: "space",
  initialState: {
    tablespace: {
      list: [],
      loading: false,
      lastFetch: null,
    },
    owners: {
      list: [],
      loading: false,
      lastFetch: null,
    },
    topTables: {
      list: [],
      loading: false,
      lastFetch: null,
    },
    topIndexes: {
      list: [],
      loading: false,
      lastFetch: null,
    },
    tableRecords: {
      list: [],
      loading: false,
      lastFetch: null,
    },
  },
  reducers: {
    // Tablespace
    tablespaceRequested: (state, action) => {
      state.tablespace.loading = true;
    },
    tablespaceReceived: (state, action) => {
      state.tablespace.list = action.payload;
      state.tablespace.loading = false;
      state.tablespace.lastFetch = Date.now();
    },
    tablespaceRequestFailed: (state, action) => {
      state.tablespace.loading = false;
    },
    // Owners
    ownersRequested: (state, action) => {
      state.owners.loading = true;
    },
    ownersReceived: (state, action) => {
      state.owners.list = action.payload;
      state.owners.loading = false;
      state.owners.lastFetch = Date.now();
    },
    ownersRequestFailed: (state, action) => {
      state.owners.loading = false;
    },
    // Top Tables
    topTablesRequested: (state, action) => {
      state.topTables.loading = true;
    },
    topTablesReceived: (state, action) => {
      state.topTables.list = action.payload;
      state.topTables.loading = false;
      state.topTables.lastFetch = Date.now();
    },
    topTablesRequestFailed: (state, action) => {
      state.topTables.loading = false;
    },
    // Top Indexes
    topIndexesRequested: (state, action) => {
      state.topIndexes.loading = true;
    },
    topIndexesReceived: (state, action) => {
      state.topIndexes.list = action.payload;
      state.topIndexes.loading = false;
      state.topIndexes.lastFetch = Date.now();
    },
    topIndexesRequestFailed: (state, action) => {
      state.topIndexes.loading = false;
    },
    // Table Records
    tableRecordsRequested: (state, action) => {
      state.tableRecords.loading = true;
    },
    tableRecordsReceived: (state, action) => {
      state.tableRecords.list = action.payload;
      state.tableRecords.loading = false;
      state.tableRecords.lastFetch = Date.now();
    },
    tableRecordsRequestFailed: (state, action) => {
      state.tableRecords.loading = false;
    },
  },
});

const {
  tablespaceRequested,
  tablespaceReceived,
  tablespaceRequestFailed,
  ownersRequested,
  ownersReceived,
  ownersRequestFailed,
  topTablesRequested,
  topTablesReceived,
  topTablesRequestFailed,
  topIndexesRequested,
  topIndexesReceived,
  topIndexesRequestFailed,
  tableRecordsRequested,
  tableRecordsReceived,
  tableRecordsRequestFailed,
} = slice.actions;

const url = "/oracle/space";

// Load All Tablespace Information
export const loadTablespace = () => (dispatch, getState) => {
  const { lastFetch } = getState().oracle.space.tablespace;
  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  if (diffInMinutes < 1) return;
  dispatch(
    apiCallBegan({
      url: url + "/tablespace",
      onStart: tablespaceRequested.type,
      onSuccess: tablespaceReceived.type,
      onError: tablespaceRequestFailed.type,
    })
  );
};

export const loadOwners = () => (dispatch, getState) => {
  const { lastFetch } = getState().oracle.space.owners;
  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  if (diffInMinutes < 1) return;
  dispatch(
    apiCallBegan({
      url: url + "/segowners",
      onStart: ownersRequested.type,
      onSuccess: ownersReceived.type,
      onError: ownersRequestFailed.type,
    })
  );
};

// Load Top X Tables
export const loadTopTables = () => (dispatch, getState) => {
  const { lastFetch } = getState().oracle.space.topTables;
  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  if (diffInMinutes < 1) return;
  dispatch(
    apiCallBegan({
      url: url + "/toptables",
      onStart: topTablesRequested.type,
      onSuccess: topTablesReceived.type,
      onError: topTablesRequestFailed.type,
    })
  );
};

// Load Top X Indexes
export const loadTopIndexes = () => (dispatch, getState) => {
  const { lastFetch } = getState().oracle.space.topIndexes;
  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  if (diffInMinutes < 1) return;
  dispatch(
    apiCallBegan({
      url: url + "/topindexes",
      onStart: topIndexesRequested.type,
      onSuccess: topIndexesReceived.type,
      onError: topIndexesRequestFailed.type,
    })
  );
};

// Load Table Records
export const loadTableRecords = () => (dispatch, getState) => {
  const { lastFetch } = getState().oracle.space.tableRecords;
  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  if (diffInMinutes < 1) return;
  dispatch(
    apiCallBegan({
      url: url + "/tablerecords",
      onStart: tableRecordsRequested.type,
      onSuccess: tableRecordsReceived.type,
      onError: tableRecordsRequestFailed.type,
    })
  );
};

export default slice.reducer;
