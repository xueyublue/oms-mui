import { act } from "react-dom/test-utils";

const toast = (store) => (next) => (action) => {
  if (action.type === "error") console.log("error", action.payload.message);
  next(action);
};

export default toast;
