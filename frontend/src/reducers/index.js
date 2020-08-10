import { combineReducers } from "redux";
import expenses from "./expenses";
import errors from "./errors";
import messages from "./messages";
import auth from "./auth";
import incomes from "./incomes";

export default combineReducers({
  expenses,
  errors,
  messages,
  auth,
  incomes,
});
