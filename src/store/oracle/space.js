import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import { apiCallBegan } from "../api";

const slice = createSlice({
  name: "space",
  initialState: {
    tablespace: {
      list: [],
      loading: false,
      lastFetch: null,
    },
    topTables: {
      list: [],
      loading: false,
      lastFetch: null,
    },
    topIndexes: {
      list: [],
      loading: false,
      lastFetch: null,
    },
  },
  reducers: {
    tablespaceRequested: (state, action) => {
      state.tablespace.loading = true;
    },
    tablespaceReceived: (state, action) => {
      state.tablespace.list = action.payload;
      state.tablespace.loading = false;
      state.tablespace.lastFetch = Date.now();
    },
    tablespaceRequestFailed: (state, action) => {
      state.tablespace.loading = false;
    },
  },
});

const { tablespaceRequested, tablespaceReceived, tablespaceRequestFailed } = slice.actions;

const url = "/oracle/space";
export const loadTablespace = () => (dispatch, getState) => {
  const { lastFetch } = getState().oracle.space.tablespace;
  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  if (diffInMinutes < 1) return;
  dispatch(
    apiCallBegan({
      url: url + "/tablespace",
      onStart: tablespaceRequested.type,
      onSuccess: tablespaceReceived.type,
      onError: tablespaceRequestFailed.type,
    })
  );
};

export default slice.reducer;
