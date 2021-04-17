import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "session",
  initialState: {
    currentTab: 0,
    pageSize: 15,
    currentPage: 0,
  },
  reducers: {
    setCurrentTab: (state, action) => {
      state.currentTab = action.payload.currentTab;
    },
    pageSizeChanged: (state, action) => {
      state.pageSize = action.payload.pageSize;
    },
    pageChanged: (state, action) => {
      state.currentPage = action.payload.currentPage;
    },
  },
});

export const { setCurrentTab, pageSizeChanged, pageChanged } = slice.actions;
export default slice.reducer;
