import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import { apiCallBegan } from "../api";

const slice = createSlice({
  name: "instance",
  initialState: {
    details: {
      list: [],
      loading: false,
      lastFetch: null,
    },
    banners: {
      list: [],
      loading: false,
      lastFetch: null,
    },
    resourceLimit: {
      list: [],
      loading: false,
      lastFetch: null,
    },
    parameters: {
      list: [],
      loading: false,
      lastFetch: null,
    },
  },
  reducers: {
    // Details
    detailsRequested: (state, action) => {
      state.details.loading = true;
    },
    detailsReceived: (state, action) => {
      state.details.list = action.payload;
      state.details.loading = false;
      state.details.lastFetch = Date.now();
    },
    detailsRequestFailed: (state, action) => {
      state.details.loading = false;
    },
    // Banners
    bannersRequested: (state, action) => {
      state.banners.loading = true;
    },
    bannersReceived: (state, action) => {
      state.banners.list = action.payload;
      state.banners.loading = false;
      state.banners.lastFetch = Date.now();
    },
    bannersRequestFailed: (state, action) => {
      state.banners.loading = false;
    },
    // Resource Limit
    resourceLimitRequested: (state, action) => {
      state.resourceLimit.loading = true;
    },
    resourceLimitReceived: (state, action) => {
      state.resourceLimit.list = action.payload;
      state.resourceLimit.loading = false;
      state.resourceLimit.lastFetch = Date.now();
    },
    resourceLimitRequestFailed: (state, action) => {
      state.resourceLimit.loading = false;
    },
    // Oracle Parameters
    parametersRequested: (state, action) => {
      state.parameters.loading = true;
    },
    parametersReceived: (state, action) => {
      state.parameters.list = action.payload;
      state.parameters.loading = false;
      state.parameters.lastFetch = Date.now();
    },
    parametersRequestFailed: (state, action) => {
      state.parameters.loading = false;
    },
  },
});

const {
  detailsRequested,
  detailsReceived,
  detailsRequestFailed,
  bannersRequested,
  bannersReceived,
  bannersRequestFailed,
  resourceLimitRequested,
  resourceLimitReceived,
  resourceLimitRequestFailed,
  parametersRequested,
  parametersReceived,
  parametersRequestFailed,
} = slice.actions;

const url = "/oracle/instance";
export const loadDetails = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.instance.details;
  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  if (diffInMinutes < 1) return;
  dispatch(
    apiCallBegan({
      url: url + "/details",
      onStart: detailsRequested.type,
      onSuccess: detailsReceived.type,
      onError: detailsRequestFailed.type,
    })
  );
};

export const loadBanners = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.instance.banners;
  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  if (diffInMinutes < 1) return;
  dispatch(
    apiCallBegan({
      url: url + "/banners",
      onStart: bannersRequested.type,
      onSuccess: bannersReceived.type,
      onError: bannersRequestFailed.type,
    })
  );
};

export const loadResourceLimit = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.instance.resourceLimit;
  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  if (diffInMinutes < 1) return;
  dispatch(
    apiCallBegan({
      url: url + "/resourcelimit",
      onStart: resourceLimitRequested.type,
      onSuccess: resourceLimitReceived.type,
      onError: resourceLimitRequestFailed.type,
    })
  );
};

export const loadParameters = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.instance.parameters;
  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  if (diffInMinutes < 1) return;
  dispatch(
    apiCallBegan({
      url: url + "/parameters",
      onStart: parametersRequested.type,
      onSuccess: parametersReceived.type,
      onError: parametersRequestFailed.type,
    })
  );
};

export default slice.reducer;
