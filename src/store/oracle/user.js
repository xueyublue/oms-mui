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
    rolePrivileges: {
      list: [],
      loading: false,
      lastFetch: null,
    },
    userPrivileges: {
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
    // Role Privileges
    rolePrivilegesRequested: (state, action) => {
      state.rolePrivileges.loading = true;
    },
    rolePrivilegesReceived: (state, action) => {
      state.rolePrivileges.list = action.payload;
      state.rolePrivileges.loading = false;
      state.rolePrivileges.lastFetch = Date.now();
    },
    rolePrivilegesRequestFailed: (state, action) => {
      state.rolePrivileges.loading = false;
    },
    // User Privileges
    userPrivilegesRequested: (state, action) => {
      state.userPrivileges.loading = true;
    },
    userPrivilegesReceived: (state, action) => {
      state.userPrivileges.list = action.payload;
      state.userPrivileges.loading = false;
      state.userPrivileges.lastFetch = Date.now();
    },
    userPrivilegesRequestFailed: (state, action) => {
      state.userPrivileges.loading = false;
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
  rolePrivilegesRequested,
  rolePrivilegesReceived,
  rolePrivilegesRequestFailed,
  userPrivilegesRequested,
  userPrivilegesReceived,
  userPrivilegesRequestFailed,
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

// Load Role Privileges
export const loadRolePrivileges = () => (dispatch, getState) => {
  const { lastFetch } = getState().oracle.user.rolePrivileges;
  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  if (diffInMinutes < 5) return;
  dispatch(
    apiCallBegan({
      url: url + "/roleprivileges",
      onStart: rolePrivilegesRequested.type,
      onSuccess: rolePrivilegesReceived.type,
      onError: rolePrivilegesRequestFailed.type,
    })
  );
};

// Load User Privileges
export const loadUserPrivileges = () => (dispatch, getState) => {
  const { lastFetch } = getState().oracle.user.userPrivileges;
  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  if (diffInMinutes < 5) return;
  dispatch(
    apiCallBegan({
      url: url + "/userprivileges",
      onStart: userPrivilegesRequested.type,
      onSuccess: userPrivilegesReceived.type,
      onError: userPrivilegesRequestFailed.type,
    })
  );
};

export default slice.reducer;
