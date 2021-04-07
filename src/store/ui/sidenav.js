import { createSlice } from "@reduxjs/toolkit";

let lastId = 0;

const slice = createSlice({
  name: "sidenav",
  initialState: { selectedMenuIndex: 1 },
  reducers: {
    sidenavSelected: (state, action) => {
      state.selectedMenuIndex = action.payload.selectedMenuIndex;
    },
  },
});

export const { sidenavSelected } = slice.actions;
export default slice.reducer;
