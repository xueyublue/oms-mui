import { configureStore, combineReducers, getDefaultMiddleware } from "@reduxjs/toolkit";
import instance from "./oracle/instance";
import space from "./oracle/space";
import api from "./middleware/api";
import logger from "./middleware/logger";
import toast from "./middleware/toast";
import instanceUI from "./ui/instance";
import sidenavUI from "./ui/sidenav";
import spaceUI from "./ui/space";
import userUI from "./ui/user";
import user from "./oracle/user";

export default function store() {
  return configureStore({
    reducer: combineReducers({
      oracle: combineReducers({
        space: space,
        instance: instance,
        user: user,
      }),
      ui: combineReducers({
        sidenav: sidenavUI,
        instance: instanceUI,
        space: spaceUI,
        user: userUI,
      }),
    }),
    middleware: [...getDefaultMiddleware(), logger({ destination: "console" }), toast, api],
  });
}
