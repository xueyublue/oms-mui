import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "session",
  initialState: {
    currentTab: 0,
    selectedStatus: "All",
    showAllColumns: false,
    pageSize: 30,
    currentPage: 0,
  },
  reducers: {
    setCurrentTab: (state, action) => {
      state.currentTab = action.payload.currentTab;
    },
    statusChanged: (state, action) => {
      state.selectedStatus = action.payload.selectedStatus;
    },
    showAllColumnsChanged: (state, action) => {
      state.showAllColumns = action.payload.showAllColumns;
    },
    pageSizeChanged: (state, action) => {
      state.pageSize = action.payload.pageSize;
    },
    pageChanged: (state, action) => {
      state.currentPage = action.payload.currentPage;
    },
  },
});

export const { setCurrentTab, statusChanged, showAllColumnsChanged, pageSizeChanged, pageChanged } = slice.actions;
export default slice.reducer;
