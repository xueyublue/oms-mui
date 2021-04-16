import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "spaceManager",
  initialState: {
    currentTab: 0,
    topTables: {
      selectedOwner: "",
      selectedDisplayLimit: 50,
      pageSize: 30,
      currentPage: 0,
    },
    topIndexes: {
      selectedOwner: "",
      selectedDisplayLimit: 50,
      pageSize: 30,
      currentPage: 0,
    },
    tableRecords: {
      selectedOwner: "",
      pageSize: 30,
      currentPage: 0,
    },
  },
  reducers: {
    setCurrentTab: (state, action) => {
      state.currentTab = action.payload.currentTab;
    },
    // Top Tables
    topTablesOwnerChanged: (state, action) => {
      state.topTables.selectedOwner = action.payload.selectedOwner;
    },
    topTablesDisplayLimitChanged: (state, action) => {
      state.topTables.selectedDisplayLimit = action.payload.selectedDisplayLimit;
    },
    topTablesPageSizeChanged: (state, action) => {
      state.topTables.pageSize = action.payload.pageSize;
    },
    topTablesPageChanged: (state, action) => {
      state.topTables.currentPage = action.payload.currentPage;
    },
    // Top Indexes
    topIndexesOwnerChanged: (state, action) => {
      state.topIndexes.selectedOwner = action.payload.selectedOwner;
    },
    topIndexesDisplayLimitChanged: (state, action) => {
      state.topIndexes.selectedDisplayLimit = action.payload.selectedDisplayLimit;
    },
    topIndexesPageSizeChanged: (state, action) => {
      state.topIndexes.pageSize = action.payload.pageSize;
    },
    topIndexesPageChanged: (state, action) => {
      state.topIndexes.currentPage = action.payload.currentPage;
    },
    // Table Records
    tableRecordsOwnerChanged: (state, action) => {
      state.tableRecords.selectedOwner = action.payload.selectedOwner;
    },
    tableRecordsPageSizeChanged: (state, action) => {
      state.tableRecords.pageSize = action.payload.pageSize;
    },
    tableRecordsPageChanged: (state, action) => {
      state.tableRecords.currentPage = action.payload.currentPage;
    },
  },
});

export const {
  setCurrentTab,
  topTablesOwnerChanged,
  topTablesDisplayLimitChanged,
  topTablesPageChanged,
  topTablesPageSizeChanged,
  topIndexesOwnerChanged,
  topIndexesDisplayLimitChanged,
  topIndexesPageChanged,
  topIndexesPageSizeChanged,
  tableRecordsOwnerChanged,
  tableRecordsPageChanged,
  tableRecordsPageSizeChanged,
} = slice.actions;
export default slice.reducer;
