import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import { apiCallBegan } from "../api";

const slice = createSlice({
  name: "session",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    sessionsRequested: (state, action) => {
      state.loading = true;
    },
    sessionsReceived: (state, action) => {
      state.list = action.payload;
      state.loading = false;
      state.lastFetch = Date.now();
    },
    sessionsRequestFailed: (state, action) => {
      state.loading = false;
    },
  },
});

const { sessionsRequested, sessionsReceived, sessionsRequestFailed } = slice.actions;

const url = "/oracle/sessions";

// Load Sessions
export const loadSessions = () => (dispatch, getState) => {
  const { lastFetch } = getState().oracle.session;
  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  if (diffInMinutes < 5) return;
  dispatch(
    apiCallBegan({
      url: url,
      onStart: sessionsRequested.type,
      onSuccess: sessionsReceived.type,
      onError: sessionsRequestFailed.type,
    })
  );
};

export default slice.reducer;
