import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "user",
  initialState: {
    currentTab: 0,
    profiles: {
      selectedProfile: "All",
    },
    users: {
      selectedAccountStatus: "All",
      showAllColumns: false,
    },
    rolePrivileges: {
      selectedRole: "All",
      pageSize: 30,
      currentPage: 0,
    },
    userPrivileges: {
      selectedUserName: "All",
      pageSize: 30,
      currentPage: 0,
    },
  },
  reducers: {
    setCurrentTab: (state, action) => {
      state.currentTab = action.payload.currentTab;
    },
    // Profiles
    profileChanged: (state, action) => {
      state.profiles.selectedProfile = action.payload.selectedProfile;
    },
    // Users
    usersAccountStatusChanged: (state, action) => {
      state.users.selectedAccountStatus = action.payload.selectedAccountStatus;
    },
    usersShowAllColumnsChanged: (state, action) => {
      state.users.showAllColumns = action.payload.showAllColumns;
    },
    // Role Privileges
    rolePrivilegesUserNameChanged: (state, action) => {
      state.rolePrivileges.selectedRole = action.payload.selectedRole;
    },
    rolePrivilegesPageSizeChanged: (state, action) => {
      state.rolePrivileges.pageSize = action.payload.pageSize;
    },
    rolePrivilegesPageChanged: (state, action) => {
      state.rolePrivileges.currentPage = action.payload.currentPage;
    },
    // User Privileges
    userPrivilegesUserNameChanged: (state, action) => {
      state.userPrivileges.selectedUserName = action.payload.selectedUserName;
    },
    userPrivilegesPageSizeChanged: (state, action) => {
      state.userPrivileges.pageSize = action.payload.pageSize;
    },
    userPrivilegesPageChanged: (state, action) => {
      state.userPrivileges.currentPage = action.payload.currentPage;
    },
  },
});

export const {
  setCurrentTab,
  profileChanged,
  usersAccountStatusChanged,
  usersShowAllColumnsChanged,
  rolePrivilegesUserNameChanged,
  rolePrivilegesPageSizeChanged,
  rolePrivilegesPageChanged,
  userPrivilegesUserNameChanged,
  userPrivilegesPageSizeChanged,
  userPrivilegesPageChanged,
} = slice.actions;
export default slice.reducer;
