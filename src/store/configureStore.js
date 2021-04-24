import { configureStore, combineReducers, getDefaultMiddleware } from "@reduxjs/toolkit";
import api from "./middleware/api";
import logger from "./middleware/logger";
import toast from "./middleware/toast";
import instance from "./oracle/instance";
import instanceUI from "./ui/instance";
import sidenavUI from "./ui/sidenav";
import space from "./oracle/space";
import spaceUI from "./ui/space";
import user from "./oracle/user";
import userUI from "./ui/user";
import session from "./oracle/session";
import sessionUI from "./ui/session";
import auth from "./auth/auth";

export default function store() {
  return configureStore({
    reducer: combineReducers({
      auth: auth,
      oracle: combineReducers({
        space: space,
        instance: instance,
        user: user,
        session: session,
      }),
      ui: combineReducers({
        sidenav: sidenavUI,
        instance: instanceUI,
        space: spaceUI,
        user: userUI,
        session: sessionUI,
      }),
    }),
    middleware: [...getDefaultMiddleware(), logger({ destination: "console" }), toast, api],
  });
}
