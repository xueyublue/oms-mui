import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import { apiCallBegan } from "../api";

const slice = createSlice({
  name: "tablespace",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    tablespaceRequested: (state, action) => {
      state.loading = true;
    },
    tablespaceReceived: (state, action) => {
      state.list = action.payload;
      state.loading = false;
      state.lastFetch = Date.now();
    },
    tablespaceRequestFailed: (state, action) => {
      state.loading = false;
    },
  },
});

const { tablespaceRequested, tablespaceReceived, tablespaceRequestFailed } = slice.actions;

const url = "/oracle/tablespace";
export const loadTablespace = () => (dispatch, getState) => {
  const { lastFetch } = getState().oracle.tablespace;
  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  if (diffInMinutes < 1) return;
  dispatch(
    apiCallBegan({
      url,
      onStart: tablespaceRequested.type,
      onSuccess: tablespaceReceived.type,
      onError: tablespaceRequestFailed.type,
    })
  );
};

export default slice.reducer;
