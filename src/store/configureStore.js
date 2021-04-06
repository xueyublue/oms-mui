import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import bugs from "./bugs";
import api from "./middleware/api";
import logger from "./middleware/logger";
import toast from "./middleware/toast";
import projects from "./projects";
import users from "./users";

export default function store() {
  return configureStore({
    reducer: combineReducers({
      entities: combineReducers({
        bugs: bugs,
        projects: projects,
        users: users,
      }),
    }),
    middleware: [
      ...getDefaultMiddleware(),
      logger({ destination: "console" }),
      toast,
      api,
    ],
  });
}
