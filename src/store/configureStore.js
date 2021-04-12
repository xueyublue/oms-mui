import { configureStore, combineReducers, getDefaultMiddleware } from "@reduxjs/toolkit";
import bugs from "./bugs";
import instance from "./entities/instance";
import tablespace from "./entities/tablespace";
import api from "./middleware/api";
import logger from "./middleware/logger";
import toast from "./middleware/toast";
import projects from "./projects";
import instanceDetail from "./ui/instanceDetail";
import sidenav from "./ui/sidenav";
import users from "./users";

export default function store() {
  return configureStore({
    reducer: combineReducers({
      entities: combineReducers({
        bugs: bugs,
        projects: projects,
        users: users,
        tablespace: tablespace,
        instance: instance,
      }),
      ui: combineReducers({
        sidenav: sidenav,
        instanceDetail: instanceDetail,
      }),
    }),
    middleware: [...getDefaultMiddleware(), logger({ destination: "console" }), toast, api],
  });
}
