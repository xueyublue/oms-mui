import { createSlice } from "@reduxjs/toolkit";

let lastId = 0;

const slice = createSlice({
  name: "sidenav",
  initialState: { index: 0 },
  reducers: {
    sidenavSelected: (state, action) => {
      state.index = action.payload.index;
    },
  },
});

export const { sidenavSelected } = slice.actions;
export default slice.reducer;
