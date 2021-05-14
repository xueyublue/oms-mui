import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import { apiCallBegan } from "../api";

const slice = createSlice({
  name: "auth",
  initialState: {
    token: {},
    loading: false,
    lastFetch: null,
  },
  reducers: {
    authRequested: (state, action) => {
      state.loading = true;
    },
    authReceived: (state, action) => {
      state.token = action.payload;
      state.loading = false;
      state.lastFetch = Date.now();
    },
    authRequestFailed: (state, action) => {
      state.loading = false;
    },
  },
});

const { authRequested, authReceived, authRequestFailed } = slice.actions;

const url = "/oms/auth";

export const login = () => (dispatch, getState) => {
  const { lastFetch } = getState().auth;
  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  if (diffInMinutes < 5) return;
  dispatch(
    apiCallBegan({
      url: url + "/login",
      onStart: authRequested.type,
      onSuccess: authReceived.type,
      onError: authRequestFailed.type,
    })
  );
};

export default slice.reducer;
