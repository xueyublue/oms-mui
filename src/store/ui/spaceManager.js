import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "spaceManager",
  initialState: {
    currentTab: 0,
    topTables: {
      pageSize: 30,
      currentPage: 0,
    },
    topIndexes: {
      pageSize: 30,
      currentPage: 0,
    },
    tableRecords: {
      pageSize: 30,
      currentPage: 0,
    },
  },
  reducers: {
    setCurrentTab: (state, action) => {
      state.currentTab = action.payload.currentTab;
    },
    topTablesPageSizeChanged: (state, action) => {
      state.topTables.pageSize = action.payload.pageSize;
    },
    topTablesPageChanged: (state, action) => {
      state.topTables.currentPage = action.payload.currentPage;
    },
    topIndexesPageSizeChanged: (state, action) => {
      state.topIndexes.pageSize = action.payload.pageSize;
    },
    topIndexesPageChanged: (state, action) => {
      state.topIndexes.currentPage = action.payload.currentPage;
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
  topTablesPageChanged,
  topTablesPageSizeChanged,
  topIndexesPageChanged,
  topIndexesPageSizeChanged,
  tableRecordsPageChanged,
  tableRecordsPageSizeChanged,
} = slice.actions;
export default slice.reducer;
