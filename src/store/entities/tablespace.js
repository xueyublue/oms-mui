import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "tablespace",
  initialState: [],
  reducers: {
    loadTablespace: (state, action) => {},
  },
});

export const { loadTablespace } = slice.actions;
export default slice.reducer;
