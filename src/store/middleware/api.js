import axios from "axios";
import { apiCallBegan, apiCallFailed, apiCallSuccess } from "../api";

const api = ({ dispatch }) => (next) => async (action) => {
  if (action.type !== apiCallBegan.type) return next(action);
  const { url, method, data, onStart, onSuccess, onError } = action.payload;
  if (onStart) dispatch({ type: onStart });
  next(action);
  try {
    const response = await axios.request({
      baseURL: "http://127.0.0.1:8099/wse/restapi",
      url,
      method,
      data,
    });
    // General success action - to display a toast
    dispatch(apiCallSuccess(response.data));
    // Specific success action - to add data into store
    if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
  } catch (error) {
    // General error action - to display a toast
    dispatch(apiCallFailed(error.message));
    // Specific error action - to log erros maybe
    if (onError) dispatch({ type: onError, payload: error.message });
  }
};

export default api;
