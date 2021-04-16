import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import { apiCallBegan } from "../api";

const slice = createSlice({
  name: "user",
  initialState: {
    profiles: {
      list: [],
      loading: false,
      lastFetch: null,
    },
    roles: {
      list: [],
      loading: false,
      lastFetch: null,
    },
    users: {
      list: [],
      loading: false,
      lastFetch: null,
    },
  },
  reducers: {
    // Profiles
    profilesRequested: (state, action) => {
      state.profiles.loading = true;
    },
    profilesReceived: (state, action) => {
      state.profiles.list = action.payload;
      state.profiles.loading = false;
      state.profiles.lastFetch = Date.now();
    },
    profilesRequestFailed: (state, action) => {
      state.profiles.loading = false;
    },
    // Roles
    rolesRequested: (state, action) => {
      state.roles.loading = true;
    },
    rolesReceived: (state, action) => {
      state.roles.list = action.payload;
      state.roles.loading = false;
      state.roles.lastFetch = Date.now();
    },
    rolesRequestFailed: (state, action) => {
      state.roles.loading = false;
    },
    // Users
    usersRequested: (state, action) => {
      state.users.loading = true;
    },
    usersReceived: (state, action) => {
      state.users.list = action.payload;
      state.users.loading = false;
      state.users.lastFetch = Date.now();
    },
    usersRequestFailed: (state, action) => {
      state.users.loading = false;
    },
  },
});

const {
  profilesRequested,
  profilesReceived,
  profilesRequestFailed,
  rolesRequested,
  rolesReceived,
  rolesRequestFailed,
  usersRequested,
  usersReceived,
  usersRequestFailed,
} = slice.actions;

const url = "/oracle/user";

// Load Profiles
export const loadProfiles = () => (dispatch, getState) => {
  const { lastFetch } = getState().oracle.user.profiles;
  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  if (diffInMinutes < 5) return;
  dispatch(
    apiCallBegan({
      url: url + "/profiles",
      onStart: profilesRequested.type,
      onSuccess: profilesReceived.type,
      onError: profilesRequestFailed.type,
    })
  );
};

// Load Roles
export const loadRoles = () => (dispatch, getState) => {
  const { lastFetch } = getState().oracle.user.roles;
  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  if (diffInMinutes < 5) return;
  dispatch(
    apiCallBegan({
      url: url + "/roles",
      onStart: rolesRequested.type,
      onSuccess: rolesReceived.type,
      onError: rolesRequestFailed.type,
    })
  );
};

// Load Users
export const loadUsers = () => (dispatch, getState) => {
  const { lastFetch } = getState().oracle.user.users;
  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  if (diffInMinutes < 5) return;
  dispatch(
    apiCallBegan({
      url: url + "/users",
      onStart: usersRequested.type,
      onSuccess: usersReceived.type,
      onError: usersRequestFailed.type,
    })
  );
};

export default slice.reducer;
