import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "instanceDetail",
  initialState: {
    currentTab: 0,
    resourceLimit: {
      pageSize: 30,
      currentPage: 0,
    },
    parameters: {
      pageSize: 30,
      currentPage: 0,
    },
  },
  reducers: {
    setCurrentTab: (state, action) => {
      state.currentTab = action.payload.currentTab;
    },
    resourceLimitPageSizeChanged: (state, action) => {
      state.resourceLimit.pageSize = action.payload.pageSize;
    },
    resourceLimitPageChanged: (state, action) => {
      state.resourceLimit.currentPage = action.payload.currentPage;
    },
    parameterPageSizeChanged: (state, action) => {
      state.parameters.pageSize = action.payload.pageSize;
    },
    parameterPageChanged: (state, action) => {
      state.parameters.currentPage = action.payload.currentPage;
    },
  },
});

export const {
  setCurrentTab,
  resourceLimitPageChanged,
  resourceLimitPageSizeChanged,
  parameterPageChanged,
  parameterPageSizeChanged,
} = slice.actions;
export default slice.reducer;
