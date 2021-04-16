import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "user",
  initialState: {
    currentTab: 0,
  },
  reducers: {
    setCurrentTab: (state, action) => {
      state.currentTab = action.payload.currentTab;
    },
  },
});

export const { setCurrentTab } = slice.actions;
export default slice.reducer;
