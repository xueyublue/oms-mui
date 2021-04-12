import { configureStore, combineReducers, getDefaultMiddleware } from "@reduxjs/toolkit";
import instance from "./oracle/instance";
import tablespace from "./oracle/tablespace";
import api from "./middleware/api";
import logger from "./middleware/logger";
import toast from "./middleware/toast";
import instanceDetail from "./ui/instanceDetail";
import sidenav from "./ui/sidenav";

export default function store() {
  return configureStore({
    reducer: combineReducers({
      oracle: combineReducers({
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
